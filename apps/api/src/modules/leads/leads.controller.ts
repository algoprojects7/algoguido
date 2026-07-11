import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { LeadStage, type PaginationQuery } from '@algoguido/types';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('leads:read')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all leads with pagination (Admin)' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('stage') stage?: string
  ) {
    const pagination: PaginationQuery = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
      search,
      sortBy,
      sortOrder: sortOrder || 'desc',
    };
    return this.leadsService.findAll(pagination, stage as LeadStage);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('leads:read')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get single lead details (Admin)' })
  async findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create lead from public contact/demo form' })
  async create(@Body() body: any) {
    return this.leadsService.create(body);
  }

  @Put(':id/stage')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('leads:write')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update lead pipeline stage (Admin)' })
  async updateStage(
    @Param('id') id: string,
    @Body('stage') stage: string,
    @Req() req: any
  ) {
    const userId = req.user.userId;
    return this.leadsService.updateStage(id, stage as LeadStage, userId);
  }

  @Post(':id/notes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('leads:write')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add note to a lead (Admin)' })
  async addNote(
    @Param('id') id: string,
    @Body('content') content: string,
    @Req() req: any
  ) {
    const userId = req.user.userId;
    return this.leadsService.addNote(id, content, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('leads:write')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a lead by ID (Admin)' })
  async remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
