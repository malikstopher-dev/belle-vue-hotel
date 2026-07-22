'use client';

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-gold-500 text-black hover:bg-gold-400 shadow-lg hover:shadow-gold',
        luxury: 'bg-transparent border border-gold-500/30 text-gold-500 hover:bg-gold-500/10 hover:border-gold-500/50',
        ghost: 'hover:bg-white/5 text-cream hover:text-gold-500',
        link: 'text-gold-500 underline-offset-4 hover:underline',
        glass: 'bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20',
        outline: 'border border-white/20 text-white hover:bg-white/5',
      },
      size: {
        default: 'h-12 px-8 py-3',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-base',
        xl: 'h-16 px-12 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'default' && (
          <span className="absolute inset-0 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };