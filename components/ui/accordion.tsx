'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Minus, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

const Accordion = AccordionPrimitive.Root;

interface MultipleAccordionProps {
  trigger: React.ReactNode[];
  content: React.ReactNode[];
  itemValue: string[];
  children?: React.ReactNode[];
}

const MultipleAccordion: React.FC<MultipleAccordionProps> = ({
  trigger = [],
  content = [],
  itemValue = [],
}: {
  trigger: React.ReactNode[];
  content: React.ReactNode[];
  itemValue: string[];
}) => {
  if (trigger.length != content.length)
    return (
      <>
        The lenght of the triggers list is not the same as the lenght of the
        content list.
      </>
    );
  if (itemValue.length == 0 || itemValue.length == undefined)
    return <>The lenght of the itemValue list cannot be 0!</>;

  return (
    <Accordion
      type="multiple"
      className="flex flex-col justify-evenly items-center gap-2 w-screen max-w-screen-lg lg:max-w-screen-2xl md:max-w-screen-md sm:max-w-screen-sm"
    >
      {trigger.map((item, key) => (
        <AccordionListItem key={key} itemValue={itemValue[key]}>
          <AccordionListItemTrigger>{trigger[key]}</AccordionListItemTrigger>
          <AccordionContent>{content[key]}</AccordionContent>
        </AccordionListItem>
      ))}
    </Accordion>
  );
};

interface AccordionListeItemTriggerProps {
  children: React.ReactNode;
}

const AccordionListItemTrigger: React.FC<AccordionListeItemTriggerProps> = ({
  children,
}) => {
  return <AccordionTrigger>{children}</AccordionTrigger>;
};

interface AccordionListItemProps {
  children: React.ReactNode[];
  itemValue: string;
}

const AccordionListItem: React.FC<AccordionListItemProps> = ({
  children,
  ...props
}) => {
  return <AccordionItem value={props.itemValue}>{children}</AccordionItem>;
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border rounded-s-xl rounded-e-xl font-sans', className)}
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
          'flex flex-1 w-screen max-w-screen-lg lg:max-w-screen-2xl md:max-w-screen-md sm:max-w-screen-sm select-none justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 p-4',
          className,
        )}
        {...props}
      >
        {children}
        {isCollapsed ? <PlusIcon /> : <Minus />}
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
      className="overflow-hidden max-w-screen-lg px-3 text-sm transition-all duration-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export default MultipleAccordion;
