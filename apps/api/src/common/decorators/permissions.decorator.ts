import { SetMetadata } from '@nestjs/common';
import { type Permission } from '@algoguido/shared';

/**
 * Decorator to map permissions to REST controllers and routes
 */
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);
