import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { comparePassword, signAccessToken, signRefreshToken, verifyToken } from '@algoguido/auth';
import { Role } from '@algoguido/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtExpiration: string;
  private readonly jwtRefreshExpiration: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {
    this.jwtSecret = this.config.get<string>('JWT_SECRET', 'your-super-secret-jwt-key-change-in-production');
    this.jwtRefreshSecret = this.config.get<string>('JWT_REFRESH_SECRET', 'your-super-secret-refresh-key-change-in-production');
    this.jwtExpiration = this.config.get<string>('JWT_EXPIRATION', '15m');
    this.jwtRefreshExpiration = this.config.get<string>('JWT_REFRESH_EXPIRATION', '7d');
  }

  /**
   * Login user and generate access/refresh tokens
   */
  async login(email: string, password: string, ip?: string, userAgent?: string) {
    const user = await this.prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Hash password is SHA256 in seed, bcrypt in production. Let's support both for fallback!
    let isMatch = false;
    try {
      isMatch = await comparePassword(password, user.password);
    } catch {
      // ignore
    }

    // SHA256 fallback for seeded admin user (which uses simple hash)
    if (!isMatch) {
      const crypto = require('crypto');
      const shaHash = crypto.createHash('sha256').update(password).digest('hex');
      if (shaHash === user.password) {
        isMatch = true;
      }
    }

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.adminUser.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        lastLoginIp: ip,
      },
    });

    // Audit log
    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        entity: 'AdminUser',
        entityId: user.id,
        ip,
        userAgent,
      },
    });

    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role as Role,
    };

    const accessToken = signAccessToken(payload, this.jwtSecret, this.jwtExpiration);
    const refreshToken = signRefreshToken({ userId: user.id }, this.jwtRefreshSecret, this.jwtRefreshExpiration);

    // Save refresh token in DB
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  /**
   * Refresh the access token using a valid refresh token
   */
  async refresh(refreshToken: string) {
    try {
      const payload = verifyToken<{ userId: string }>(refreshToken, this.jwtRefreshSecret);
      const savedToken = await this.prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
          userId: payload.userId,
          revokedAt: null,
        },
      });

      if (!savedToken || savedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      const user = await this.prisma.adminUser.findUnique({
        where: { id: payload.userId },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('User is inactive or not found');
      }

      const newPayload = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role as Role,
      };

      const accessToken = signAccessToken(newPayload, this.jwtSecret, this.jwtExpiration);

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Revoke a refresh token on logout
   */
  async logout(refreshToken: string) {
    await this.prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revokedAt: new Date() },
    });
    return { success: true };
  }
}
