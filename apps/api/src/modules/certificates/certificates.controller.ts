import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new certificate (Admin)' })
  async create(
    @Body()
    body: {
      certificateNo: string;
      candidateName: string;
      course: string;
      grade: string;
      duration: string;
      dateOfIssue: string;
      description?: string;
    }
  ) {
    return this.certificatesService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List all certificates (Admin) or search by certificate number' })
  async findAll(@Query('certNo') certNo?: string) {
    if (certNo) {
      return this.certificatesService.findByCertNo(certNo);
    }
    return this.certificatesService.findAll();
  }

  @Get(':certNo')
  @ApiOperation({ summary: 'Retrieve certificate details by certificate number (Public)' })
  async findByCertNo(@Param('certNo') certNo: string) {
    return this.certificatesService.findByCertNo(certNo);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a certificate by ID (Admin)' })
  async remove(@Param('id') id: string) {
    return this.certificatesService.remove(id);
  }
}
