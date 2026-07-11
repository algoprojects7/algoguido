import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List all products with optional category filtering
   */
  async findAll(categoryId?: string, activeOnly = true) {
    return this.prisma.product.findMany({
      where: {
        ...(categoryId && { categoryId }),
        ...(activeOnly && { isActive: true }),
      },
      include: {
        category: true,
        features: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  /**
   * Find product by slug
   */
  async findOneBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        features: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug ${slug} not found`);
    }

    return product;
  }

  /**
   * Create a new product
   */
  async create(data: any) {
    return this.prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline,
        description: data.description,
        icon: data.icon,
        image: data.image,
        categoryId: data.categoryId,
        technologies: data.technologies || [],
        isActive: data.isActive !== undefined ? data.isActive : true,
        sortOrder: data.sortOrder || 0,
        features: {
          create: data.features || [],
        },
      },
      include: {
        features: true,
      },
    });
  }

  /**
   * Update existing product
   */
  async update(id: string, data: any) {
    // Delete existing features if we are overwriting them
    if (data.features) {
      await this.prisma.productFeature.deleteMany({
        where: { productId: id },
      });
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline,
        description: data.description,
        icon: data.icon,
        image: data.image,
        categoryId: data.categoryId,
        technologies: data.technologies,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
        ...(data.features && {
          features: {
            create: data.features,
          },
        }),
      },
      include: {
        features: true,
      },
    });
  }

  /**
   * Delete a product
   */
  async delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  /**
   * List all categories
   */
  async findAllCategories() {
    return this.prisma.productCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
