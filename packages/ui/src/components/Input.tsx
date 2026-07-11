import * as React from 'react';
import { cn } from '../utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full h-12 px-4 rounded-xl border text-sm transition-all duration-300 outline-none',
          'bg-slate-50/50 border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 placeholder-slate-400',
          'dark:bg-navy-900/50 dark:border-navy-800 dark:focus:bg-navy-950 dark:focus:border-brand-500 dark:focus:ring-2 dark:focus:ring-brand-500/20 dark:text-white dark:placeholder-gray-500',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full h-12 px-4 rounded-xl border text-sm transition-all duration-300 outline-none appearance-none cursor-pointer',
          'bg-slate-50/50 border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-600 focus:text-slate-800 placeholder-slate-400',
          'dark:bg-navy-900/50 dark:border-navy-800 dark:focus:bg-navy-950 dark:focus:border-brand-500 dark:focus:ring-2 dark:focus:ring-brand-500/20 dark:text-gray-300 dark:focus:text-white dark:placeholder-gray-500',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full px-4 py-3 rounded-xl border text-sm transition-all duration-300 outline-none resize-y',
          'bg-slate-50/50 border-slate-200 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-slate-800 placeholder-slate-400',
          'dark:bg-navy-900/50 dark:border-navy-800 dark:focus:bg-navy-950 dark:focus:border-brand-500 dark:focus:ring-2 dark:focus:ring-brand-500/20 dark:text-white dark:placeholder-gray-500',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
