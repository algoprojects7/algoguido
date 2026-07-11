import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('activeOnly') activeOnly?: string
  ) {
    const active = activeOnly !== 'false';
    return this.productsService.findAll(categoryId, active);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all product categories' })
  async findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get product by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findOneBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('products:write')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new product (Admin)' })
  async create(@Body() body: any) {
    return this.productsService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('products:write')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update existing product (Admin)' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RequirePermissions('products:delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product (Admin)' })
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
