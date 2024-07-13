'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Minus, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

const Accordion = AccordionPrimitive.Root;

const FAQAccordion = () => {
  return (
    <Accordion
      type="multiple"
      className="flex flex-1 flex-col gap-1 w-full max-w-screen lg:max-w-screen-xl md:max-w-screen-lg sm:max-w-screen-sm text-center"
    >
      <AccordionItem value={'where-to-find-required-document'}>
        <AccordionTrigger>
          Не знаю де отримати необхідний документ
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi
          odio necessitatibus hic? Quas quia sit doloribus dolore maxime,
          blanditiis dicta quasi at eos necessitatibus quo quaerat, sed a
          architecto vitae?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'conflict-with-professeur'}>
        <AccordionTrigger>
          Виникла конфліктна ситуація з викладачем, не знаю до кого звернутися
        </AccordionTrigger>
        <AccordionContent>
          Звернися до студентської ради підрозділу (лінк на канали СР
          підрозділів). Якщо не знаєш де це, пиши до нас (лінк на саппорт)
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'do-not-understand'}>
        <AccordionTrigger>
          Не розумію, що мається на увазі в положенні
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo debitis
          exercitationem mollitia nihil expedita quos ad. Voluptas et, commodi
          dignissimos nostrum cumque eum unde, maiores nulla molestiae quo
          ratione enim.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'cannot-find-info'}>
        <AccordionTrigger>
          Не можу знайти необхідну інформацію щодо освітнього процесу
        </AccordionTrigger>
        <AccordionContent>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero minus
          natus omnis temporibus repellendus aperiam consequatur molestiae at id
          fugiat odio quaerat et quam fuga sunt corrupti excepturi, quae quo?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'how-to-join-clubs'}>
        <AccordionTrigger>
          Як можна долучитися до студентських клубів та організацій?
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
          voluptatem deleniti, placeat molestiae corporis beatae qui quaerat
          illo adipisci autem neque delectus, dolor, nulla tenetur repudiandae
          laborum facere laudantium minus!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'how-to-be-in-touch'}>
        <AccordionTrigger>
          Як дізнатися про зміни в розкладі занять?
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis
          vitae unde at ratione laboriosam praesentium non impedit eos accusamus
          libero debitis tempore, voluptatum ipsam, molestiae perferendis, nisi
          distinctio temporibus corporis?
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={'what-documents-are-required'}>
        <AccordionTrigger>
          Які документи потрібні для отримання стипендії?
        </AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
          dolorem quae nulla reiciendis, est dolorum recusandae omnis quam
          necessitatibus totam. Quis mollitia perspiciatis incidunt? Fuga eius
          soluta repudiandae excepturi tempore!
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
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
          'flex flex-1 lg:max-w-screen-2xl md:max-w-screen-md sm:max-w-xs select-none justify-between font-medium hover:underline [&[data-state=open]>svg]:rotate-180 lg:text-lg md:text-xl sm:text-2xl p-2 text-center',
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
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('p-2', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export default FAQAccordion;
