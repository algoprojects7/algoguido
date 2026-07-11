import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AIService } from '@algoguido/ai';
import { LeadStage, type PaginationQuery } from '@algoguido/types';
import { isValidLeadTransition } from '@algoguido/shared';

@Injectable()
export class LeadsService {
  private readonly aiService: AIService;

  constructor(private readonly prisma: PrismaService) {
    this.aiService = new AIService();
  }

  /**
   * List leads with filtering and pagination
   */
  async findAll(query: PaginationQuery, stage?: LeadStage) {
    const skip = (query.page - 1) * query.limit;
    const where = {
      ...(stage && { stage }),
      ...(query.search && {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' as const } },
          { email: { contains: query.search, mode: 'insensitive' as const } },
          { company: { contains: query.search, mode: 'insensitive' as const } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: { [query.sortBy || 'createdAt']: query.sortOrder },
        include: {
          notes: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      }),
      this.prisma.lead.count({ where }),
    ]);

    const totalPages = Math.ceil(total / query.limit);

    return {
      data,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages,
        hasNext: query.page < totalPages,
        hasPrev: query.page > 1,
      },
    };
  }

  /**
   * Find single lead by ID
   */
  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        activities: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return lead;
  }

  /**
   * Create lead from website inquiry forms (Contact / Demo)
   */
  async create(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject?: string;
    message: string;
    source?: string;
    value?: number;
  }) {
    // 1. Run Smart Lead Scoring asynchronously via packages/ai
    let score = 50;
    let explanation = 'Default lead score initialized.';
    try {
      const aiResult = await this.aiService.scoreLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        subject: data.subject,
        message: data.message,
      });
      score = aiResult.score;
      explanation = aiResult.explanation;
    } catch (error) {
      console.error('Lead scoring failed, falling back to default:', error);
    }

    // 2. Save lead in database
    const lead = await this.prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        stage: 'NEW',
        source: data.source || 'WEBSITE',
        score,
        value: data.value,
        notes: {
          create: {
            content: `Initial message: "${data.message}"\n\nAI Lead Score: ${score}/100\nReasoning: ${explanation}`,
            authorId: (await this.getSystemUser()).id,
          },
        },
      },
    });

    // 3. Log AI log entry
    await this.prisma.aILog.create({
      data: {
        module: 'lead-scoring',
        input: { leadId: lead.id, message: data.message },
        output: { score, explanation },
      },
    });

    return lead;
  }

  /**
   * Update lead stage (with role-based validation of state transitions)
   */
  async updateStage(id: string, toStage: LeadStage, userId: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    if (!isValidLeadTransition(lead.stage as LeadStage, toStage)) {
      throw new BadRequestException(`Invalid lead stage transition from ${lead.stage} to ${toStage}`);
    }

    const updatedLead = await this.prisma.lead.update({
      where: { id },
      data: { stage: toStage },
    });

    // Log pipeline activity
    await this.prisma.leadActivity.create({
      data: {
        leadId: id,
        type: 'STAGE_CHANGE',
        description: `Moved stage from ${lead.stage} to ${toStage}`,
        userId,
      },
    });

    return updatedLead;
  }

  /**
   * Add a note to a lead
   */
  async addNote(id: string, content: string, userId: string) {
    return this.prisma.leadNote.create({
      data: {
        leadId: id,
        content,
        authorId: userId,
      },
    });
  }

  /**
   * Helper to retrieve or create a System fallback admin user for automated actions
   */
  private async getSystemUser() {
    let systemUser = await this.prisma.adminUser.findFirst({
      where: { email: 'system@algoguido.com' },
    });

    if (!systemUser) {
      systemUser = await this.prisma.adminUser.create({
        data: {
          email: 'system@algoguido.com',
          password: 'system_random_password_never_used_directly',
          name: 'AI System Agent',
          role: 'VIEWER',
          isActive: false,
        },
      });
    }

    return systemUser;
  }
}
