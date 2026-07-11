import type { Role, LeadStage } from '@algoguido/types';

// ─── Permission Definitions ────────────────────────────────────────────────

export type Permission =
  | 'leads:read'
  | 'leads:write'
  | 'leads:delete'
  | 'applications:read'
  | 'applications:write'
  | 'applications:delete'
  | 'products:read'
  | 'products:write'
  | 'products:delete'
  | 'projects:read'
  | 'projects:write'
  | 'projects:delete'
  | 'services:read'
  | 'services:write'
  | 'services:delete'
  | 'blog:read'
  | 'blog:write'
  | 'blog:delete'
  | 'media:read'
  | 'media:write'
  | 'media:delete'
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'analytics:read'
  | 'audit:read'
  | 'settings:read'
  | 'settings:write'
  | 'payments:read'
  | 'payments:write'
  | 'payments:refund'
  | 'education:read'
  | 'education:write'
  | 'education:delete';

/**
 * Role-based permission matrix
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    'leads:read', 'leads:write', 'leads:delete',
    'applications:read', 'applications:write', 'applications:delete',
    'products:read', 'products:write', 'products:delete',
    'projects:read', 'projects:write', 'projects:delete',
    'services:read', 'services:write', 'services:delete',
    'blog:read', 'blog:write', 'blog:delete',
    'media:read', 'media:write', 'media:delete',
    'users:read', 'users:write', 'users:delete',
    'analytics:read', 'audit:read',
    'settings:read', 'settings:write',
    'payments:read', 'payments:write', 'payments:refund',
    'education:read', 'education:write', 'education:delete',
  ],
  ADMIN: [
    'leads:read', 'leads:write', 'leads:delete',
    'applications:read', 'applications:write', 'applications:delete',
    'products:read', 'products:write', 'products:delete',
    'projects:read', 'projects:write',
    'services:read', 'services:write',
    'blog:read', 'blog:write',
    'media:read', 'media:write',
    'users:read',
    'analytics:read', 'audit:read',
    'settings:read',
    'payments:read', 'payments:write',
    'education:read', 'education:write',
  ],
  EDITOR: [
    'leads:read',
    'applications:read',
    'products:read', 'products:write',
    'projects:read', 'projects:write',
    'services:read', 'services:write',
    'blog:read', 'blog:write',
    'media:read', 'media:write',
    'analytics:read',
    'payments:read',
    'education:read', 'education:write',
  ],
  VIEWER: [
    'leads:read',
    'applications:read',
    'products:read',
    'projects:read',
    'services:read',
    'blog:read',
    'media:read',
    'analytics:read',
    'payments:read',
    'education:read',
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

// ─── Lead Pipeline Logic ────────────────────────────────────────────────────

/**
 * Valid lead stage transitions
 */
const VALID_TRANSITIONS: Record<LeadStage, LeadStage[]> = {
  NEW: ['CONTACTED', 'LOST'],
  CONTACTED: ['QUALIFIED', 'LOST'],
  QUALIFIED: ['PROPOSAL', 'LOST'],
  PROPOSAL: ['WON', 'LOST'],
  WON: [],
  LOST: ['NEW'], // Re-open
};

/**
 * Check if a lead stage transition is valid
 */
export function isValidLeadTransition(from: LeadStage, to: LeadStage): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Get allowed next stages for a lead
 */
export function getNextStages(currentStage: LeadStage): LeadStage[] {
  return VALID_TRANSITIONS[currentStage] ?? [];
}

// ─── Navigation Config ──────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

/**
 * Public website navigation structure
 */
export const PUBLIC_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '/products',
    children: [
      { label: 'eduAI365', href: '/products/eduai365' },
      { label: 'Apply4Jobs', href: '/products/apply4jobs' },
      { label: 'LeadGrowAI', href: '/products/leadgrowai' },
      { label: 'TheHiring', href: '/products/thehiring' },
      { label: 'Hospital AI', href: '/products/hospital-ai' },
      { label: 'Community Registry', href: '/products/community-registry' },
    ],
  },
  {
    label: 'Enterprise',
    href: '/enterprise',
    children: [
      { label: 'ERP Solutions', href: '/enterprise/erp' },
      { label: 'CRM', href: '/enterprise/crm' },
      { label: 'HRMS', href: '/enterprise/hrms' },
      { label: 'School ERP', href: '/enterprise/school-erp' },
      { label: 'Hospital ERP', href: '/enterprise/hospital-erp' },
      { label: 'SaaS Development', href: '/enterprise/saas' },
      { label: 'AI Automation', href: '/enterprise/ai-automation' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Cloud', href: '/cloud' },
  { label: 'Education', href: '/education' },
  { label: 'Research', href: '/research' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Admin sidebar navigation structure
 */
export const ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Leads', href: '/dashboard/leads' },
  { label: 'Applications', href: '/dashboard/applications' },
  { label: 'Products', href: '/dashboard/products' },
  { label: 'Projects', href: '/dashboard/projects' },
  { label: 'Enterprise', href: '/dashboard/enterprise' },
  { label: 'Education', href: '/dashboard/education' },
  { label: 'Blog', href: '/dashboard/blogs' },
  { label: 'Media', href: '/dashboard/media' },
  { label: 'Payments', href: '/dashboard/payments' },
  { label: 'Users', href: '/dashboard/users' },
  { label: 'Analytics', href: '/dashboard/analytics' },
  { label: 'Audit Logs', href: '/dashboard/audit' },
  { label: 'Settings', href: '/dashboard/settings' },
];

// ─── Company Info ───────────────────────────────────────────────────────────

export const COMPANY_INFO = {
  name: 'Algoguido Technologies Private Limited',
  shortName: 'Algoguido',
  tagline: 'AI-Powered Enterprise Solutions',
  description:
    'Enterprise-grade technology company specializing in AI-powered SaaS products, ERP solutions, government projects, cloud infrastructure, and education programs.',
  email: 'info@algoguido.com',
  phone: '+91-XXXXXXXXXX',
  address: {
    line1: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
  },
  social: {
    linkedin: 'https://linkedin.com/company/algoguido',
    github: 'https://github.com/algoguido',
    twitter: 'https://twitter.com/algoguido',
  },
  stats: {
    clients: 50,
    projects: 100,
    teamSize: 30,
    uptime: 99.9,
  },
};
