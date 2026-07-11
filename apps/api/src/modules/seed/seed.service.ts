import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import * as crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}

  async runSeed(): Promise<Record<string, number | string>> {
    const results: Record<string, number | string> = {};

    // ── Admin Users ────────────────────────────────────────────────
    await this.prisma.adminUser.upsert({
      where: { email: 'admin@algoguido.com' },
      update: {},
      create: {
        email: 'admin@algoguido.com',
        password: hashPassword('Admin@123456'),
        name: 'Super Admin',
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });

    await this.prisma.adminUser.upsert({
      where: { email: 'algoguidot@gmail.com' },
      update: {},
      create: {
        email: 'algoguidot@gmail.com',
        password: hashPassword('Rajita@7860123'),
        name: 'System Administrator',
        role: 'ADMIN',
        isActive: true,
      },
    });

    await this.prisma.adminUser.upsert({
      where: { email: 'system@algoguido.com' },
      update: {},
      create: {
        email: 'system@algoguido.com',
        password: hashPassword('system_random_password_never_used_directly'),
        name: 'AI System Agent',
        role: 'VIEWER',
        isActive: false,
      },
    });
    results['adminUsers'] = await this.prisma.adminUser.count();

    // ── Product Categories ─────────────────────────────────────────
    const categories = [
      { name: 'AI SaaS', slug: 'ai-saas', description: 'AI-powered SaaS products' },
      { name: 'Enterprise', slug: 'enterprise', description: 'Enterprise software solutions' },
      { name: 'Government', slug: 'government', description: 'Government projects' },
      { name: 'Cloud', slug: 'cloud', description: 'Cloud & infrastructure services' },
      { name: 'Education', slug: 'education', description: 'Education & training programs' },
    ];
    for (const cat of categories) {
      await this.prisma.productCategory.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
    }
    results['productCategories'] = await this.prisma.productCategory.count();

    // ── Products ───────────────────────────────────────────────────
    const aiSaasCategory = await this.prisma.productCategory.findUnique({ where: { slug: 'ai-saas' } });
    if (aiSaasCategory) {
      const products = [
        { name: 'eduAI365', slug: 'eduai365', tagline: 'AI-Powered Education Platform', description: 'Comprehensive AI-driven education management system with smart analytics, personalized learning paths, and automated assessments.', categoryId: aiSaasCategory.id, technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TensorFlow', 'Redis'], sortOrder: 1 },
        { name: 'Apply4Jobs', slug: 'apply4jobs', tagline: 'Smart Job Application Platform', description: 'AI-powered job application and recruitment platform with resume parsing, skill matching, and automated screening.', categoryId: aiSaasCategory.id, technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'AI/ML'], sortOrder: 2 },
        { name: 'LeadGrowAI', slug: 'leadgrowai', tagline: 'AI-Driven Lead Management', description: 'Intelligent CRM with AI lead scoring, automated follow-ups, and predictive conversion analytics.', categoryId: aiSaasCategory.id, technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Gemini AI'], sortOrder: 3 },
        { name: 'TheHiring', slug: 'thehiring', tagline: 'Next-Gen Recruitment Solution', description: 'End-to-end hiring platform with AI screening, interview scheduling, and candidate management.', categoryId: aiSaasCategory.id, technologies: ['React', 'Express', 'PostgreSQL', 'Redis'], sortOrder: 4 },
        { name: 'Hospital AI', slug: 'hospital-ai', tagline: 'AI Healthcare Management', description: 'Comprehensive hospital management system with AI diagnostics, patient tracking, and resource optimization.', categoryId: aiSaasCategory.id, technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Python', 'FHIR'], sortOrder: 5 },
        { name: 'Community Registry', slug: 'community-registry', tagline: 'Digital Community Platform', description: 'Community registration and management platform with verification, directory, and engagement features.', categoryId: aiSaasCategory.id, technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'], sortOrder: 6 },
      ];
      for (const p of products) {
        await this.prisma.product.upsert({ where: { slug: p.slug }, update: {}, create: p });
      }
    }
    results['products'] = await this.prisma.product.count();

    // ── Enterprise Services ────────────────────────────────────────
    const services = [
      { name: 'ERP Solutions', slug: 'erp', description: 'Custom Enterprise Resource Planning systems tailored for your business operations, supply chain, and financial management.', category: 'ERP', features: ['Inventory Management', 'Financial Accounting', 'HR Module', 'Supply Chain', 'Reports & Analytics'], technologies: ['Next.js', 'NestJS', 'PostgreSQL'], sortOrder: 1 },
      { name: 'CRM', slug: 'crm', description: 'Customer Relationship Management solutions with AI-powered lead scoring, pipeline management, and customer insights.', category: 'CRM', features: ['Lead Management', 'Pipeline Tracking', 'Email Integration', 'Analytics', 'Automation'], technologies: ['React', 'Node.js', 'PostgreSQL'], sortOrder: 2 },
      { name: 'HRMS', slug: 'hrms', description: 'Complete Human Resource Management System with payroll, attendance, recruitment, and performance management.', category: 'HRMS', features: ['Payroll', 'Attendance', 'Leave Management', 'Recruitment', 'Performance'], technologies: ['Next.js', 'NestJS', 'PostgreSQL'], sortOrder: 3 },
      { name: 'School ERP', slug: 'school-erp', description: 'Comprehensive school management system with student records, attendance, fee management, and parent portal.', category: 'SCHOOL_ERP', features: ['Student Management', 'Fee Collection', 'Attendance', 'Timetable', 'Parent Portal'], technologies: ['React', 'Node.js', 'MySQL'], sortOrder: 4 },
      { name: 'Hospital ERP', slug: 'hospital-erp', description: 'Hospital management system with patient records, billing, pharmacy, lab management, and appointment scheduling.', category: 'HOSPITAL_ERP', features: ['Patient Records', 'Billing', 'Pharmacy', 'Lab Management', 'Appointments'], technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'FHIR'], sortOrder: 5 },
      { name: 'SaaS Development', slug: 'saas', description: 'End-to-end SaaS product development with multi-tenancy, subscription billing, and scalable cloud architecture.', category: 'SAAS_DEVELOPMENT', features: ['Multi-tenancy', 'Subscription Billing', 'API Design', 'Cloud Architecture', 'CI/CD'], technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'], sortOrder: 6 },
      { name: 'AI Automation', slug: 'ai-automation', description: 'Business process automation powered by artificial intelligence — workflow automation, document processing, and predictive analytics.', category: 'AI_AUTOMATION', features: ['Workflow Automation', 'Document AI', 'Chatbots', 'Predictive Analytics', 'NLP'], technologies: ['Python', 'TensorFlow', 'Node.js', 'PostgreSQL'], sortOrder: 7 },
    ];
    for (const svc of services) {
      await this.prisma.enterpriseService.upsert({ where: { slug: svc.slug }, update: {}, create: svc });
    }
    results['enterpriseServices'] = await this.prisma.enterpriseService.count();

    // ── Blog Categories ────────────────────────────────────────────
    const blogCategories = [
      { name: 'AI', slug: 'ai', description: 'Artificial Intelligence articles and updates' },
      { name: 'Technology', slug: 'technology', description: 'Latest technology trends and insights' },
      { name: 'Enterprise', slug: 'enterprise-blog', description: 'Enterprise software and business solutions' },
      { name: 'Research', slug: 'research', description: 'Research papers and academic collaborations' },
      { name: 'Tutorials', slug: 'tutorials', description: 'Technical tutorials and how-to guides' },
    ];
    for (const cat of blogCategories) {
      await this.prisma.blogCategory.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
    }
    results['blogCategories'] = await this.prisma.blogCategory.count();

    // ── Education Tracks ───────────────────────────────────────────
    const tracks = [
      { name: 'Web Development Internship', slug: 'web-dev-internship', description: 'Hands-on internship program covering modern web development with React, Next.js, and NestJS.', type: 'INTERNSHIP' as const, duration: '3 months', requirements: ['HTML/CSS', 'JavaScript', 'React basics'], isActive: true },
      { name: 'AI/ML Research Program', slug: 'ai-ml-research', description: 'Research collaboration program focused on applied AI and machine learning in enterprise contexts.', type: 'RESEARCH' as const, duration: '6 months', requirements: ['Python', 'Machine Learning', 'Research experience'], isActive: true },
      { name: 'Full Stack Training', slug: 'fullstack-training', description: 'Comprehensive training program covering full-stack development from frontend to deployment.', type: 'TRAINING' as const, duration: '4 months', requirements: ['Programming fundamentals', 'Basic web concepts'], isActive: true },
    ];
    for (const track of tracks) {
      await this.prisma.educationTrack.upsert({ where: { slug: track.slug }, update: {}, create: track });
    }
    results['educationTracks'] = await this.prisma.educationTrack.count();

    // ── Settings ───────────────────────────────────────────────────
    const settings = [
      { key: 'site_name', value: 'Algoguido Technologies', type: 'STRING', group: 'general', description: 'Website name' },
      { key: 'site_tagline', value: 'AI-Powered Enterprise Solutions', type: 'STRING', group: 'general', description: 'Website tagline' },
      { key: 'contact_email', value: 'info@algoguido.com', type: 'STRING', group: 'contact', description: 'Primary contact email' },
      { key: 'maintenance_mode', value: 'false', type: 'BOOLEAN', group: 'general', description: 'Enable maintenance mode' },
    ];
    for (const s of settings) {
      await this.prisma.setting.upsert({ where: { key: s.key }, update: {}, create: s });
    }
    results['settings'] = await this.prisma.setting.count();

    results['status'] = 'success';
    return results;
  }

  async getDbStatus(): Promise<Record<string, number>> {
    const [
      adminUsers, productCategories, products,
      enterpriseServices, blogCategories, educationTracks,
      settings, leads, testimonials, certificates,
    ] = await Promise.all([
      this.prisma.adminUser.count(),
      this.prisma.productCategory.count(),
      this.prisma.product.count(),
      this.prisma.enterpriseService.count(),
      this.prisma.blogCategory.count(),
      this.prisma.educationTrack.count(),
      this.prisma.setting.count(),
      this.prisma.lead.count(),
      this.prisma.testimonial.count(),
      this.prisma.certificate.count(),
    ]);
    return {
      adminUsers, productCategories, products,
      enterpriseServices, blogCategories, educationTracks,
      settings, leads, testimonials, certificates,
    };
  }
}
