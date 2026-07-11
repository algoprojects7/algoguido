import { z } from 'zod';

// ─── Auth ────────────────────────────────────────────────────────────────────

export const RoleEnum = z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER']);
export type Role = z.infer<typeof RoleEnum>;

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const LoginDto = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
export type LoginDtoType = z.infer<typeof LoginDto>;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon?: string;
  image?: string;
  categoryId: string;
  features: ProductFeature[];
  technologies: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFeature {
  id: string;
  productId: string;
  title: string;
  description: string;
  icon?: string;
  sortOrder: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// ─── Enterprise Services ────────────────────────────────────────────────────

export interface EnterpriseService {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  icon?: string;
  image?: string;
  category: string;
  features: string[];
  technologies: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Client Projects ────────────────────────────────────────────────────────

export interface ClientProject {
  id: string;
  title: string;
  slug: string;
  client: string;
  description: string;
  caseStudy?: string;
  images: ProjectImage[];
  technologies: string[];
  category: string;
  isFeatured: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectImage {
  id: string;
  projectId: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
}

// ─── Blog ───────────────────────────────────────────────────────────────────

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

// ─── Leads ──────────────────────────────────────────────────────────────────

export const LeadStageEnum = z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST']);
export type LeadStage = z.infer<typeof LeadStageEnum>;

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  stage: LeadStage;
  source: string;
  score?: number;
  notes: LeadNote[];
  activities: LeadActivity[];
  assignedTo?: string;
  value?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadNote {
  id: string;
  leadId: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: string;
  description: string;
  userId: string;
  createdAt: Date;
}

// ─── Contact / Demo ─────────────────────────────────────────────────────────

export const ContactFormDto = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
export type ContactFormType = z.infer<typeof ContactFormDto>;

export const DemoRequestDto = z.object({
  product: z.string().min(1, 'Product selection is required'),
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  requirements: z.string().optional(),
});
export type DemoRequestType = z.infer<typeof DemoRequestDto>;

export const EnterpriseInquiryDto = z.object({
  company: z.string().min(1, 'Company is required'),
  industry: z.string().min(1, 'Industry is required'),
  employees: z.string().optional(),
  currentSystem: z.string().optional(),
  requirements: z.string().min(10, 'Please describe your requirements'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});
export type EnterpriseInquiryType = z.infer<typeof EnterpriseInquiryDto>;

// ─── Education / Applications ───────────────────────────────────────────────

export const ApplicationTypeEnum = z.enum(['INTERNSHIP', 'RESEARCH', 'TRAINING']);
export type ApplicationType = z.infer<typeof ApplicationTypeEnum>;

export const InternshipApplicationDto = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number is required'),
  university: z.string().min(1, 'University is required'),
  semester: z.string().min(1, 'Semester is required'),
  department: z.string().min(1, 'Department is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  portfolioUrl: z.string().url().optional(),
  message: z.string().optional(),
});
export type InternshipApplicationType = z.infer<typeof InternshipApplicationDto>;

export interface EducationTrack {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: ApplicationType;
  duration: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  trackId: string;
  type: ApplicationType;
  name: string;
  email: string;
  phone: string;
  status: 'PENDING' | 'REVIEWING' | 'INTERVIEW' | 'SELECTED' | 'REJECTED';
  documents: ApplicationDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// ─── Payments (Razorpay) ────────────────────────────────────────────────────

export const PaymentStatusEnum = z.enum(['CREATED', 'AUTHORIZED', 'CAPTURED', 'REFUNDED', 'FAILED']);
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;

export const SubscriptionStatusEnum = z.enum([
  'CREATED', 'ACTIVE', 'PAUSED', 'CANCELLED', 'COMPLETED', 'EXPIRED',
]);
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusEnum>;

export interface Payment {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description?: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentPlan {
  id: string;
  name: string;
  razorpayPlanId: string;
  amount: number;
  currency: string;
  interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
  description?: string;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  razorpaySubscriptionId: string;
  planId: string;
  customerEmail: string;
  status: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  razorpayInvoiceId?: string;
  paymentId?: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'CANCELLED' | 'EXPIRED';
  customerEmail: string;
  customerName: string;
  lineItems: InvoiceLineItem[];
  dueDate?: Date;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitAmount: number;
  amount: number;
}

// ─── Media ──────────────────────────────────────────────────────────────────

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  mimeType: string;
  size: number;
  alt?: string;
  uploadedBy: string;
  createdAt: Date;
}

// ─── Analytics ──────────────────────────────────────────────────────────────

export interface PageView {
  id: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  sessionId: string;
  createdAt: Date;
}

export interface VisitorSession {
  id: string;
  ip: string;
  country?: string;
  device?: string;
  browser?: string;
  startedAt: Date;
  endedAt?: Date;
}

// ─── Audit ──────────────────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  oldValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ip: string;
  userAgent?: string;
  createdAt: Date;
}

// ─── Common ─────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export const PaginationQueryDto = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
export type PaginationQuery = z.infer<typeof PaginationQueryDto>;

// ─── Settings ───────────────────────────────────────────────────────────────

export interface Setting {
  id: string;
  key: string;
  value: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  group: string;
  description?: string;
  updatedAt: Date;
}

// ─── Testimonials ───────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
}

// ─── Team Members ───────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio?: string;
  avatar?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  sortOrder: number;
  isActive: boolean;
}
