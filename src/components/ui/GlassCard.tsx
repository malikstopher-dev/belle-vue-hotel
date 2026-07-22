'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'strong' | 'subtle';
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = true, padding = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-2xl transition-all duration-500',
          variant === 'default' && 'glass-card',
          variant === 'strong' && 'glass-card-strong',
          variant === 'subtle' && 'bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm',
          hover && 'hover:border-gold-500/20 hover:shadow-luxury-lg',
          padding === 'sm' && 'p-4',
          padding === 'md' && 'p-6',
          padding === 'lg' && 'p-8',
          padding === 'none' && 'p-0',
          className
        )}
        {...props}
      >
        {children}
        {hover && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:via-transparent group-hover:to-gold-500/5 transition-all duration-500 pointer-events-none" />
        )}
      </div>
    );
  }
);
GlassCard.displayName = 'GlassCard';

export { GlassCard };