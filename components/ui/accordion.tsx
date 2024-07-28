'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Minus, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'border rounded-[10px] min-h-[40px] md:min-h-[60px]',
      className,
    )}
    {...props}
  />
));

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        onClick={() => setIsCollapsed(!isCollapsed)}
        ref={ref}
        className={cn(
          'flex flex-1 min-h-[40px] md:min-h-[60px] select-none justify-between hover:underline font-m-p md:text-base md:font-medium py-[13px] px-[10px] md:p-5 text-left',
          className,
        )}
        {...props}
      >
        {children}
        {isCollapsed ? (
          <PlusIcon className="w-[15px] md:w-[24px] h-[15px] md:h-[24px]" />
        ) : (
          <Minus className="w-[15px] md:w-[24px] h-[15px] md:h-[24px]" />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
      {...props}
    >
      <div
        className={cn(
          'pt-0 font-m-p md:text-base md:font-medium pb-[13px] px-[10px] md:p-5 md:pt-0',
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
