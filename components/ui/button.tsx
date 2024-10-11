import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  cn(
    'font-sans',
    'font-bold text-m-p md:text-p tracking-[0.02em]', // In font-button class is a potentially dangerous style with font-semibold (it is missing in configuration)
    // 'font-button', // if you want to use font-semibold uncomment this line
    'inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-[#666] disabled:border-[#666] disabled:opacity-100',
  ),
  {
    variants: {
      variant: {
        default:
          'bg-blue border-[1px] border-accent focus:border-[#fff] leading-[19px] border-[1px] border-blue hover:bg-accent focus:border-white',
        outline:
          'leading-[19px] bg-transparent border-[1px] border-blue hover:bg-blue focus:bg-accent focus:border-accent',
        destructive:
          'leading-[19px] bg-transparent border-[1px] border-destructive hover:bg-destructive',
      },
      size: {
        default:
          'px-6 py-4 rounded-[0.375rem] md:h-15 md:px-16 md:py-5 md:rounded-[0.625rem]',
        sm: 'py-2 px-5 rounded-[6px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(className, buttonVariants({ variant, className, size }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
