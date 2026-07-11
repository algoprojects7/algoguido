import * as React from 'react';
import { cn } from '../utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border transition-all duration-300 ease-in-out',
          {
            'bg-white border-slate-100 text-slate-900 dark:bg-navy-900 dark:border-navy-800 dark:text-white shadow-sm': variant === 'default',
            'glass-light dark:glass-dark text-slate-900 dark:text-white shadow-glass':
              variant === 'glass',
            'glass-light dark:glass-dark text-slate-900 dark:text-white glass-light-hover dark:glass-dark-hover cursor-pointer':
              variant === 'interactive',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
