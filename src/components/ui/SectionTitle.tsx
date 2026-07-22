'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
  badge?: string;
}

export function SectionTitle({ title, subtitle, align = 'center', light = false, className, badge }: SectionTitleProps) {
  return (
    <div className={cn(
      'mb-16 md:mb-20',
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      className
    )}>
      {badge && (
        <div className={cn(
          'inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase',
          light
            ? 'bg-gold-500/10 text-gold-600 border border-gold-500/20'
            : 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
        )}>
          {badge}
        </div>
      )}
      <h2 className={cn(
        'font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight',
        light ? 'text-luxury-black' : 'text-cream'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 md:mt-6 text-lg md:text-xl max-w-2xl font-light',
          align === 'center' && 'mx-auto',
          light ? 'text-luxury-gray' : 'text-luxury-silver'
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        'mt-6 md:mt-8 h-[1px] w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent',
        align === 'center' && 'mx-auto',
        align === 'right' && 'ml-auto'
      )} />
    </div>
  );
}