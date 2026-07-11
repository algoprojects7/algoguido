import * as React from 'react';
import { cn } from '../utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all duration-300',
          {
            'bg-brand-50 text-brand-600 border-brand-200 dark:bg-brand-500/20 dark:text-brand-300 dark:border-brand-500/30':
              variant === 'primary',
            'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30':
              variant === 'success',
            'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30':
              variant === 'warning',
            'bg-red-50 text-red-600 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30':
              variant === 'danger',
            'bg-slate-50 text-slate-600 border-slate-200 dark:bg-white/5 dark:text-gray-300 dark:border-white/10':
              variant === 'neutral',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
