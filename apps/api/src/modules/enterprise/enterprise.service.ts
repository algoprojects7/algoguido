import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class EnterpriseService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * List all enterprise services
   */
  async findAll(category?: string, activeOnly = true) {
    return this.prisma.enterpriseService.findMany({
      where: {
        ...(category && { category }),
        ...(activeOnly && { isActive: true }),
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  /**
   * Find enterprise service by slug
   */
  async findOneBySlug(slug: string) {
    const service = await this.prisma.enterpriseService.findUnique({
      where: { slug },
    });

    if (!service) {
      throw new NotFoundException(`Enterprise service with slug ${slug} not found`);
    }

    return service;
  }

  /**
   * Find enterprise service by ID
   */
  async findOne(id: string) {
    const service = await this.prisma.enterpriseService.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Enterprise service with ID ${id} not found`);
    }

    return service;
  }

  /**
   * Create a new enterprise service
   */
  async create(data: any) {
    return this.prisma.enterpriseService.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription || '',
        icon: data.icon || '',
        image: data.image || '',
        category: data.category,
        features: data.features || [],
        technologies: data.technologies || [],
        isActive: data.isActive !== undefined ? data.isActive : true,
        sortOrder: data.sortOrder || 0,
      },
    });
  }

  /**
   * Update existing enterprise service
   */
  async update(id: string, data: any) {
    // Check if exists
    await this.findOne(id);

    return this.prisma.enterpriseService.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription,
        icon: data.icon,
        image: data.image,
        category: data.category,
        features: data.features,
        technologies: data.technologies,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
      },
    });
  }

  /**
   * Delete enterprise service
   */
  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.enterpriseService.delete({
      where: { id },
    });
  }
}
