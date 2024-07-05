"use client"

import * as React from 'react'
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/cn"
import { Minus, PlusIcon } from 'lucide-react'

const Accordion = AccordionPrimitive.Root

const FAQAccordion = () => {
    return (
        <Accordion type="multiple" className='flex flex-col justify-evenly items-center gap-2'>
            <AccordionListItem itemValue="item-1" accordionTrigger="Не знаю де отримати необхідний документ" accordionContent="
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique lacus quis rhoncus molestie. Sed convallis consectetur metus. Phasellus nec interdum dui. Suspendisse scelerisque, sem." />
            <AccordionListItem itemValue="item-2" accordionTrigger="Не знаю де отримати необхідний документ" accordionContent="
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique lacus quis rhoncus molestie. Sed convallis consectetur metus. Phasellus nec interdum dui. Suspendisse scelerisque, sem." />
        </Accordion>
    )
}

const AccordionListItem = ({ itemValue, accordionTrigger, accordionContent }: { itemValue: string, accordionTrigger: string, accordionContent: string }) => {
    return (
        <AccordionItem value={itemValue}>
            <AccordionTrigger>{accordionTrigger}</AccordionTrigger>
            <AccordionContent>{accordionContent}</AccordionContent>
        </AccordionItem>
    )
}

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("border rounded-s-xl rounded-e-xl font-sans", className)}
        {...props}
    />
))

AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(true)

    return (
        < AccordionPrimitive.Header className="flex" >
            <AccordionPrimitive.Trigger
                onClick={() => setIsCollapsed(!isCollapsed)}
                ref={ref}
                className={cn(
                    "flex flex-1 w-screen max-w-screen-lg select-none items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 p-4",
                    className
                )}
                {...props}
            >
                {children}
                {isCollapsed ? <PlusIcon /> : <Minus />}
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header >
    )
}
)

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden max-w-screen-lg px-3 text-sm transition-all duration-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export default FAQAccordion 