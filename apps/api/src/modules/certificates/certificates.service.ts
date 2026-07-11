import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CertificatesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new certificate record
   */
  async create(data: {
    certificateNo: string;
    candidateName: string;
    course: string;
    grade: string;
    duration: string;
    dateOfIssue: string | Date;
    description?: string;
  }) {
    // Check if certificateNo is unique
    const existing = await this.prisma.certificate.findUnique({
      where: { certificateNo: data.certificateNo },
    });

    if (existing) {
      throw new BadRequestException(`Certificate with number ${data.certificateNo} already exists.`);
    }

    return this.prisma.certificate.create({
      data: {
        certificateNo: data.certificateNo,
        candidateName: data.candidateName,
        course: data.course,
        grade: data.grade,
        duration: data.duration,
        dateOfIssue: new Date(data.dateOfIssue),
        description: data.description || null,
      },
    });
  }

  /**
   * List all certificates in the database
   */
  async findAll() {
    return this.prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Find a single certificate by certificateNo (Public lookups)
   */
  async findByCertNo(certificateNo: string) {
    const cert = await this.prisma.certificate.findUnique({
      where: { certificateNo },
    });

    if (!cert) {
      throw new NotFoundException(`Certificate number ${certificateNo} not found.`);
    }

    return cert;
  }

  /**
   * Remove a certificate by internal ID
   */
  async remove(id: string) {
    const cert = await this.prisma.certificate.findUnique({
      where: { id },
    });

    if (!cert) {
      throw new NotFoundException(`Certificate with ID ${id} not found.`);
    }

    return this.prisma.certificate.delete({
      where: { id },
    });
  }
}
