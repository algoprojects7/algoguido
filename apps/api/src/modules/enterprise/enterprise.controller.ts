import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EnterpriseService } from './enterprise.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('Enterprise Services')
@Controller('enterprise-services')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all enterprise services' })
  async findAll(
    @Query('category') category?: string,
    @Query('activeOnly') activeOnly?: string
  ) {
    const active = activeOnly !== 'false';
    return this.enterpriseService.findAll(category, active);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get enterprise service by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.enterpriseService.findOneBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get enterprise service by ID' })
  async findOne(@Param('id') id: string) {
    return this.enterpriseService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('services:write')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new enterprise service (Super Admin Only)' })
  async create(@Body() body: any) {
    return this.enterpriseService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('services:write')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update existing enterprise service (Super Admin Only)' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.enterpriseService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('services:delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete enterprise service (Super Admin Only)' })
  async delete(@Param('id') id: string) {
    return this.enterpriseService.delete(id);
  }
}
