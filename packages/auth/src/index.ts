import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Role } from '@algoguido/types';
import { ROLE_PERMISSIONS, type Permission } from '@algoguido/shared';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
}

/**
 * Hash a plain text password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare plain text password with a hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Sign an Access Token (JWT)
 */
export function signAccessToken(payload: TokenPayload, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
}

/**
 * Sign a Refresh Token (JWT)
 */
export function signRefreshToken(payload: { userId: string }, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
}

/**
 * Verify a JWT Token
 */
export function verifyToken<T = any>(token: string, secret: string): T {
  return jwt.verify(token, secret) as T;
}

/**
 * Check if a role has a specific permission
 */
export function checkPermission(role: Role, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  return permissions ? permissions.includes(permission) : false;
}
