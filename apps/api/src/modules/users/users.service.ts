import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { hashPassword } from '@algoguido/auth';
import { Role } from '@algoguido/types';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new administrative user (Super Admin only)
   */
  async create(data: any) {
    if (!data.email || !data.password || !data.name) {
      throw new BadRequestException('Email, password, and name are required');
    }

    // Check if email already exists
    const existing = await this.prisma.adminUser.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await hashPassword(data.password);

    const newUser = await this.prisma.adminUser.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: (data.role || 'ADMIN') as Role,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });

    // Exclude password from returned user object
    const { password, ...result } = newUser;
    return result;
  }

  /**
   * List all administrative users
   */
  async findAll() {
    return this.prisma.adminUser.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Delete administrative user
   */
  async delete(id: string) {
    const user = await this.prisma.adminUser.findUnique({
      where: { id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Prevent deleting the last superadmin
    if (user.role === 'SUPER_ADMIN') {
      const superAdminCount = await this.prisma.adminUser.count({
        where: { role: 'SUPER_ADMIN' },
      });
      if (superAdminCount <= 1) {
        throw new BadRequestException('Cannot delete the only Super Admin user');
      }
    }

    return this.prisma.adminUser.delete({
      where: { id },
    });
  }
}
