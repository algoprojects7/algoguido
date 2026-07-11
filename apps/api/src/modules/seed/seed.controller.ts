import {
  Controller,
  Post,
  Get,
  Headers,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { SeedService } from './seed.service';

/**
 * Seed Controller
 *
 * Provides two endpoints:
 *   GET  /api/seed/status  — Returns live row counts from all seeded tables.
 *   POST /api/seed/run     — Runs the full seed (upsert-safe, idempotent).
 *
 * Both endpoints require the `x-seed-secret` header to match the
 * SEED_SECRET environment variable.  Set this in your Vercel project
 * environment variables before calling the endpoint.
 *
 * Example (curl):
 *   curl -X POST https://your-api.vercel.app/api/seed/run \
 *        -H "x-seed-secret: YOUR_SECRET"
 */
@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  private readonly logger = new Logger(SeedController.name);

  constructor(private readonly seedService: SeedService) {}

  private guardSecret(secret: string | undefined): void {
    const expected = process.env.SEED_SECRET;
    if (!expected) {
      throw new InternalServerErrorException('SEED_SECRET env var is not configured.');
    }
    if (!secret || secret !== expected) {
      throw new UnauthorizedException('Invalid or missing x-seed-secret header.');
    }
  }

  @Get('status')
  @ApiOperation({ summary: 'Return live row counts for all seeded tables' })
  @ApiHeader({ name: 'x-seed-secret', description: 'Seed secret token', required: true })
  @ApiResponse({ status: 200, description: 'DB row counts' })
  @ApiResponse({ status: 401, description: 'Invalid secret' })
  async status(@Headers('x-seed-secret') secret: string) {
    this.guardSecret(secret);
    return this.seedService.getDbStatus();
  }

  @Post('run')
  @ApiOperation({ summary: 'Run idempotent seed — safe to call multiple times' })
  @ApiHeader({ name: 'x-seed-secret', description: 'Seed secret token', required: true })
  @ApiResponse({ status: 201, description: 'Seed complete — returns final row counts' })
  @ApiResponse({ status: 401, description: 'Invalid secret' })
  async run(@Headers('x-seed-secret') secret: string) {
    this.guardSecret(secret);
    this.logger.log('🌱 Seed triggered via HTTP endpoint');
    const result = await this.seedService.runSeed();
    this.logger.log('✅ Seed complete');
    return result;
  }
}
