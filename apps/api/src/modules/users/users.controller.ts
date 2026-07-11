import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('Admin Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @RequirePermissions('users:write')
  @ApiOperation({ summary: 'Create a new administrative user (Super Admin Only)' })
  async create(@Body() body: any) {
    return this.usersService.create(body);
  }

  @Get()
  @RequirePermissions('users:read')
  @ApiOperation({ summary: 'List all administrative users' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @RequirePermissions('users:delete')
  @ApiOperation({ summary: 'Delete an administrative user (Super Admin Only)' })
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
