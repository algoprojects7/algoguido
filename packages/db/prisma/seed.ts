import { PrismaClient, Role } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

/**
 * Simple password hash for seeding (use bcrypt/argon2 in production)
 */
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('🌱 Seeding database...\n');

  // ── Admin Users ───────────────────────────────────────────────────────
  const superAdmin = await prisma.adminUser.upsert({
    where: { email: 'admin@algoguido.com' },
    update: {},
    create: {
      email: 'admin@algoguido.com',
      password: hashPassword('Admin@123456'),
      name: 'Super Admin',
      role: Role.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log('✅ Admin user created:', superAdmin.email);

  const adminUser = await prisma.adminUser.upsert({
    where: { email: 'algoguidot@gmail.com' },
    update: {},
    create: {
      email: 'algoguidot@gmail.com',
      password: hashPassword('Rajita@7860123'),
      name: 'System Administrator',
      role: Role.ADMIN,
      isActive: true,
    },
  });
  console.log('✅ Admin user created:', adminUser.email);

  const systemUser = await prisma.adminUser.upsert({
    where: { email: 'system@algoguido.com' },
    update: {},
    create: {
      email: 'system@algoguido.com',
      password: hashPassword('system_random_password_never_used_directly'),
      name: 'AI System Agent',
      role: Role.VIEWER,
      isActive: false,
    },
  });
  console.log('✅ System user created:', systemUser.email);

  // ── Product Categories ────────────────────────────────────────────────
  const categories = [
    { name: 'AI SaaS', slug: 'ai-saas', description: 'AI-powered SaaS products' },
    { name: 'Enterprise', slug: 'enterprise', description: 'Enterprise software solutions' },
    { name: 'Government', slug: 'government', description: 'Government projects' },
    { name: 'Cloud', slug: 'cloud', description: 'Cloud & infrastructure services' },
    { name: 'Education', slug: 'education', description: 'Education & training programs' },
  ];

  for (const cat of categories) {
    await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('✅ Product categories created:', categories.length);

  // ── Products ──────────────────────────────────────────────────────────
  const aiSaasCategory = await prisma.productCategory.findUnique({ where: { slug: 'ai-saas' } });

  if (aiSaasCategory) {
    const products = [
      {
        name: 'eduAI365',
        slug: 'eduai365',
        tagline: 'AI-Powered Education Platform',
        description: 'Comprehensive AI-driven education management system with smart analytics, personalized learning paths, and automated assessments.',
        categoryId: aiSaasCategory.id,
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TensorFlow', 'Redis'],
        sortOrder: 1,
      },
      {
        name: 'Apply4Jobs',
        slug: 'apply4jobs',
        tagline: 'Smart Job Application Platform',
        description: 'AI-powered job application and recruitment platform with resume parsing, skill matching, and automated screening.',
        categoryId: aiSaasCategory.id,
        technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'AI/ML'],
        sortOrder: 2,
      },
      {
        name: 'LeadGrowAI',
        slug: 'leadgrowai',
        tagline: 'AI-Driven Lead Management',
        description: 'Intelligent CRM with AI lead scoring, automated follow-ups, and predictive conversion analytics.',
        categoryId: aiSaasCategory.id,
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Gemini AI'],
        sortOrder: 3,
      },
      {
        name: 'TheHiring',
        slug: 'thehiring',
        tagline: 'Next-Gen Recruitment Solution',
        description: 'End-to-end hiring platform with AI screening, interview scheduling, and candidate management.',
        categoryId: aiSaasCategory.id,
        technologies: ['React', 'Express', 'PostgreSQL', 'Redis'],
        sortOrder: 4,
      },
      {
        name: 'Hospital AI',
        slug: 'hospital-ai',
        tagline: 'AI Healthcare Management',
        description: 'Comprehensive hospital management system with AI diagnostics, patient tracking, and resource optimization.',
        categoryId: aiSaasCategory.id,
        technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Python', 'FHIR'],
        sortOrder: 5,
      },
      {
        name: 'Community Registry',
        slug: 'community-registry',
        tagline: 'Digital Community Platform',
        description: 'Community registration and management platform with verification, directory, and engagement features.',
        categoryId: aiSaasCategory.id,
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
        sortOrder: 6,
      },
    ];

    for (const product of products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product,
      });
    }
    console.log('✅ Products created:', products.length);
  }

  // ── Enterprise Services ───────────────────────────────────────────────
  const services = [
    { name: 'ERP Solutions', slug: 'erp', description: 'Custom Enterprise Resource Planning systems tailored for your business operations, supply chain, and financial management.', category: 'ERP', features: ['Inventory Management', 'Financial Accounting', 'HR Module', 'Supply Chain', 'Reports & Analytics'], technologies: ['Next.js', 'NestJS', 'PostgreSQL'], sortOrder: 1 },
    { name: 'CRM', slug: 'crm', description: 'Customer Relationship Management solutions with AI-powered lead scoring, pipeline management, and customer insights.', category: 'CRM', features: ['Lead Management', 'Pipeline Tracking', 'Email Integration', 'Analytics', 'Automation'], technologies: ['React', 'Node.js', 'PostgreSQL'], sortOrder: 2 },
    { name: 'HRMS', slug: 'hrms', description: 'Complete Human Resource Management System with payroll, attendance, recruitment, and performance management.', category: 'HRMS', features: ['Payroll', 'Attendance', 'Leave Management', 'Recruitment', 'Performance'], technologies: ['Next.js', 'NestJS', 'PostgreSQL'], sortOrder: 3 },
    { name: 'School ERP', slug: 'school-erp', description: 'Comprehensive school management system with student records, attendance, fee management, and parent portal.', category: 'SCHOOL_ERP', features: ['Student Management', 'Fee Collection', 'Attendance', 'Timetable', 'Parent Portal'], technologies: ['React', 'Node.js', 'MySQL'], sortOrder: 4 },
    { name: 'Hospital ERP', slug: 'hospital-erp', description: 'Hospital management system with patient records, billing, pharmacy, lab management, and appointment scheduling.', category: 'HOSPITAL_ERP', features: ['Patient Records', 'Billing', 'Pharmacy', 'Lab Management', 'Appointments'], technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'FHIR'], sortOrder: 5 },
    { name: 'SaaS Development', slug: 'saas', description: 'End-to-end SaaS product development with multi-tenancy, subscription billing, and scalable cloud architecture.', category: 'SAAS_DEVELOPMENT', features: ['Multi-tenancy', 'Subscription Billing', 'API Design', 'Cloud Architecture', 'CI/CD'], technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'], sortOrder: 6 },
    { name: 'AI Automation', slug: 'ai-automation', description: 'Business process automation powered by artificial intelligence — workflow automation, document processing, and predictive analytics.', category: 'AI_AUTOMATION', features: ['Workflow Automation', 'Document AI', 'Chatbots', 'Predictive Analytics', 'NLP'], technologies: ['Python', 'TensorFlow', 'Node.js', 'PostgreSQL'], sortOrder: 7 },
  ];

  for (const service of services) {
    await prisma.enterpriseService.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }
  console.log('✅ Enterprise services created:', services.length);

  // ── Blog Categories ───────────────────────────────────────────────────
  const blogCategories = [
    { name: 'AI', slug: 'ai', description: 'Artificial Intelligence articles and updates' },
    { name: 'Technology', slug: 'technology', description: 'Latest technology trends and insights' },
    { name: 'Enterprise', slug: 'enterprise-blog', description: 'Enterprise software and business solutions' },
    { name: 'Research', slug: 'research', description: 'Research papers and academic collaborations' },
    { name: 'Tutorials', slug: 'tutorials', description: 'Technical tutorials and how-to guides' },
  ];

  for (const cat of blogCategories) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('✅ Blog categories created:', blogCategories.length);

  // ── Education Tracks ──────────────────────────────────────────────────
  const tracks = [
    { name: 'Web Development Internship', slug: 'web-dev-internship', description: 'Hands-on internship program covering modern web development with React, Next.js, and NestJS.', type: 'INTERNSHIP' as const, duration: '3 months', requirements: ['HTML/CSS', 'JavaScript', 'React basics'], isActive: true },
    { name: 'AI/ML Research Program', slug: 'ai-ml-research', description: 'Research collaboration program focused on applied AI and machine learning in enterprise contexts.', type: 'RESEARCH' as const, duration: '6 months', requirements: ['Python', 'Machine Learning', 'Research experience'], isActive: true },
    { name: 'Full Stack Training', slug: 'fullstack-training', description: 'Comprehensive training program covering full-stack development from frontend to deployment.', type: 'TRAINING' as const, duration: '4 months', requirements: ['Programming fundamentals', 'Basic web concepts'], isActive: true },
  ];

  for (const track of tracks) {
    await prisma.educationTrack.upsert({
      where: { slug: track.slug },
      update: {},
      create: track,
    });
  }
  console.log('✅ Education tracks created:', tracks.length);

  // ── Testimonials ──────────────────────────────────────────────────────
  const testimonials = [
    { name: 'Rajesh Kumar', designation: 'CTO', company: 'TechSolutions India', content: 'Algoguido delivered an exceptional ERP system that transformed our business operations. Their AI integration is cutting-edge.', rating: 5, sortOrder: 1 },
    { name: 'Priya Sharma', designation: 'Director', company: 'EduVision Academy', content: 'The eduAI365 platform has revolutionized how we manage our educational institution. Student engagement increased by 40%.', rating: 5, sortOrder: 2 },
    { name: 'Dr. Amit Patel', designation: 'Chief Medical Officer', company: 'City Hospital', content: 'Hospital AI has streamlined our patient management workflow. The team at Algoguido understands healthcare technology deeply.', rating: 5, sortOrder: 3 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('✅ Testimonials created:', testimonials.length);

  // ── Settings ──────────────────────────────────────────────────────────
  const settings = [
    { key: 'site_name', value: 'Algoguido Technologies', type: 'STRING', group: 'general', description: 'Website name' },
    { key: 'site_tagline', value: 'AI-Powered Enterprise Solutions', type: 'STRING', group: 'general', description: 'Website tagline' },
    { key: 'contact_email', value: 'info@algoguido.com', type: 'STRING', group: 'contact', description: 'Primary contact email' },
    { key: 'maintenance_mode', value: 'false', type: 'BOOLEAN', group: 'general', description: 'Enable maintenance mode' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }
  console.log('✅ Settings created:', settings.length);

  // ── Demo Inquiries and Leads ──────────────────────────────────────────
  console.log('\n🌱 Seeding leads and education inquiries...');
  
  const sysUser = await prisma.adminUser.findUnique({
    where: { email: 'system@algoguido.com' }
  });
  const sysUserId = sysUser ? sysUser.id : superAdmin.id;

  const demoLeads = [
    // Development Leads
    {
      name: 'Dr. Ramesh Chawla',
      email: 'ramesh.chawla@iitg.ac.in',
      phone: '+91 94350 12345',
      company: 'IIT Guwahati',
      stage: 'NEW' as const,
      source: 'WEBSITE_CONTACT',
      score: 85,
      value: 120000,
      message: 'AI based research & collaboration on Natural Language Processing for regional languages. Looking for pilot phase implementation details.',
    },
    {
      name: 'Suresh Naidu',
      email: 'suresh@naidulogistics.com',
      phone: '+91 98640 54321',
      company: 'Naidu Logistics',
      stage: 'CONTACTED' as const,
      source: 'WEBSITE_CONTACT',
      score: 75,
      value: 250000,
      message: 'Mobile App for fleet tracking, driver allocation, and logistics route optimization. Need offline sync capabilities.',
    },
    {
      name: 'Meera Nair',
      email: 'meera.nair@healthcareplus.org',
      phone: '+91 70020 98765',
      company: 'HealthCare Plus',
      stage: 'QUALIFIED' as const,
      source: 'WEBSITE_CONTACT',
      score: 90,
      value: 650000,
      message: 'Database audit and migration to custom Hospital ERP database. Highly confidential patient record data mapping is required.',
    },
    {
      name: 'Ananya Roy',
      email: 'ananya.roy@retailflow.ai',
      phone: '+91 88888 12345',
      company: 'RetailFlow AI',
      stage: 'PROPOSAL' as const,
      source: 'WEBSITE_CONTACT',
      score: 95,
      value: 450000,
      message: 'AI based recommendation system app for e-commerce store catalog. Seeking integration details with Shopify API.',
    },
    // Education Sector Leads
    {
      name: 'Amit Baruah',
      email: 'amit.baruah.student@gmail.com',
      phone: '+91 99540 67890',
      company: 'Tezpur University',
      stage: 'NEW' as const,
      source: 'EDUCATION_PORTAL',
      score: 70,
      value: 15000,
      message: 'Paid Internship - React & Next.js Full Stack Development. Student from Department of Computer Science, 6th Semester. Skills: HTML, CSS, Basic JS.',
    },
    {
      name: 'Prof. Dipankar Das',
      email: 'ddas@aec.ac.in',
      phone: '+91 98765 00001',
      company: 'Assam Engineering College',
      stage: 'CONTACTED' as const,
      source: 'EDUCATION_PORTAL',
      score: 80,
      value: 50000,
      message: 'Workshop request on GenAI integration in engineering curriculum for AEC computing department faculties.',
    },
    {
      name: 'Dr. Hemanga Kakati',
      email: 'hkakati@cottonuniversity.ac.in',
      phone: '+91 90850 55555',
      company: 'Cotton University',
      stage: 'QUALIFIED' as const,
      source: 'EDUCATION_PORTAL',
      score: 88,
      value: 300000,
      message: 'Academic Research Project - IoT-based smart agricultural sensor networks. Joint collaboration proposal for state grant.',
    },
    {
      name: 'Dr. Nivedita Devi',
      email: 'nivedita.devi@nits.ac.in',
      phone: '+91 94351 99999',
      company: 'NIT Silchar',
      stage: 'NEW' as const,
      source: 'EDUCATION_PORTAL',
      score: 82,
      value: 120000,
      message: 'FDP proposal - Cloud Infrastructure, Docker & Kubernetes DevOps practices for computing faculties at NIT Silchar.',
    },
  ];

  for (const leadData of demoLeads) {
    const existing = await prisma.lead.findFirst({
      where: { email: leadData.email, source: leadData.source }
    });
    if (!existing) {
      await prisma.lead.create({
        data: {
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone,
          company: leadData.company,
          stage: leadData.stage,
          source: leadData.source,
          score: leadData.score,
          value: leadData.value,
          notes: {
            create: {
              content: `Initial message: "${leadData.message}"\n\nAI Lead Score: ${leadData.score}/100\nReasoning: Generated from seeded demo records.`,
              authorId: sysUserId,
            }
          }
        }
      });
    }
  }
  console.log('✅ Demo leads & education applications created:', demoLeads.length);

  // ── Seed Certificates ─────────────────────────────────────────────────
  console.log('\n🌱 Seeding certificates...');
  const demoCertificates = [
    {
      certificateNo: 'AGC-2026-9812',
      candidateName: 'Amit Baruah',
      course: 'React & Next.js Full Stack Development',
      grade: 'A+',
      duration: '3 Months',
      dateOfIssue: new Date('2026-06-15'),
      description: 'Awarded for outstanding performance in the Next.js and NestJS development track.',
    },
    {
      certificateNo: 'AGC-2026-4421',
      candidateName: 'Priya Sharma',
      course: 'Advanced Web Development & SaaS Systems',
      grade: 'A',
      duration: '3 Months',
      dateOfIssue: new Date('2026-05-10'),
      description: 'Successfully completed SaaS and database architecture implementation projects.',
    },
    {
      certificateNo: 'AGC-2026-0731',
      candidateName: 'Suresh Naidu',
      course: 'Mobile App Architecture & Design',
      grade: 'A+',
      duration: '3 Months',
      dateOfIssue: new Date('2026-07-01'),
      description: 'Demonstrated excellence in Android mobile application layout, offline syncing, and routing.',
    },
  ];

  for (const cert of demoCertificates) {
    await prisma.certificate.upsert({
      where: { certificateNo: cert.certificateNo },
      update: {},
      create: cert,
    });
  }
  console.log('✅ Demo certificates created:', demoCertificates.length);

  console.log('\n🎉 Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
