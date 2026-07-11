/**
 * Shared constants used across all apps and packages
 */
export const CONSTANTS = {
  /** Application metadata */
  APP: {
    NAME: 'Algoguido Technologies',
    DESCRIPTION: 'AI-Powered Enterprise Solutions',
    URL: 'https://algoguido.com',
    SUPPORT_EMAIL: 'support@algoguido.com',
  },

  /** Lead pipeline stages */
  LEAD_STAGES: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST'] as const,

  /** User roles */
  ROLES: ['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER'] as const,

  /** Application types */
  APPLICATION_TYPES: ['INTERNSHIP', 'RESEARCH', 'TRAINING'] as const,

  /** Product categories */
  PRODUCT_CATEGORIES: [
    'AI_SAAS',
    'ENTERPRISE',
    'GOVERNMENT',
    'CLOUD',
    'EDUCATION',
  ] as const,

  /** Enterprise service categories */
  SERVICE_CATEGORIES: [
    'ERP',
    'CRM',
    'HRMS',
    'SCHOOL_ERP',
    'HOSPITAL_ERP',
    'SAAS_DEVELOPMENT',
    'AI_AUTOMATION',
  ] as const,

  /** Blog categories */
  BLOG_CATEGORIES: ['AI', 'TECHNOLOGY', 'ENTERPRISE', 'RESEARCH', 'TUTORIALS'] as const,

  /** Pagination defaults */
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },

  /** File upload limits */
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    ALLOWED_DOC_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm'],
  },

  /** Razorpay payment statuses */
  PAYMENT_STATUS: ['CREATED', 'AUTHORIZED', 'CAPTURED', 'REFUNDED', 'FAILED'] as const,

  /** Subscription statuses */
  SUBSCRIPTION_STATUS: ['CREATED', 'ACTIVE', 'PAUSED', 'CANCELLED', 'COMPLETED', 'EXPIRED'] as const,
} as const;
