import React from 'react';
import { FC, Fragment } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { ChevronsRight, Ellipsis } from 'lucide-react';

import { cn } from '@/lib/cn';

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & { separator?: React.ReactNode }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-2 break-words text-l-p text-subtle-l0 md:gap-3 md:text-p',
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(
      'inline-flex h-5 items-center gap-1.5 text-l-p font-regular md:gap-2 md:text-p',
      className,
    )}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & { asChild?: boolean }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn(
        'inline-flex items-center gap-[inherit] text-l-p transition-colors hover:cursor-pointer hover:text-subtle-l1 md:text-p',
        className,
      )}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn(
      'inline-flex items-center gap-[inherit] font-regular text-l-p text-subtle-l1 md:text-p',
      className,
    )}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('flex items-center [&>svg]:size-6', className)}
    {...props}
  >
    {children ?? <ChevronsRight />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex size-6 items-center justify-center', className)}
    {...props}
  >
    <Ellipsis className="size-6" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export type BreadcrumbItemType = {
  icon?: React.ElementType;
  href: string;
  label: string;
};

const VISIBLE_TAIL_DESKTOP = 3;
const VISIBLE_TAIL_MOBILE = 2;

const Breadcrumbs: FC<{ items: BreadcrumbItemType[]; className?: string }> = ({
  items,
  className,
}) => {
  const lastIndex = items.length - 1;
  const isHiddenOn = (index: number, tail: number) =>
    index > 0 && index < items.length - tail;

  const hasHiddenDesktop = items.some((_, i) =>
    isHiddenOn(i, VISIBLE_TAIL_DESKTOP),
  );
  const hasHiddenMobile = items.some((_, i) =>
    isHiddenOn(i, VISIBLE_TAIL_MOBILE),
  );

  const visibilityClass = (index: number) => {
    const hiddenDesktop = isHiddenOn(index, VISIBLE_TAIL_DESKTOP);
    const hiddenMobile = isHiddenOn(index, VISIBLE_TAIL_MOBILE);

    if (hiddenDesktop && hiddenMobile) return 'hidden';
    if (hiddenMobile) return 'hidden md:flex';
    if (hiddenDesktop) return 'flex md:hidden';
    return undefined;
  };

  const ellipsisClass = cn(
    hasHiddenMobile && !hasHiddenDesktop && 'flex md:hidden',
    !hasHiddenMobile && hasHiddenDesktop && 'hidden md:flex',
    !hasHiddenMobile && !hasHiddenDesktop && 'hidden',
  );

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === lastIndex;
          const Icon = item.icon;
          const visibility = visibilityClass(index);
          const content = (
            <>
              {Icon && <Icon className="size-5 shrink-0" />}
              {item.label}
            </>
          );

          return (
            <Fragment key={`${item.href}-${index}`}>
              {!isFirst && <BreadcrumbSeparator className={visibility} />}
              <BreadcrumbItem className={visibility}>
                {isLast ? (
                  <BreadcrumbPage>{content}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{content}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {isFirst && (hasHiddenDesktop || hasHiddenMobile) && (
                <>
                  <BreadcrumbSeparator className={ellipsisClass} />
                  <li
                    role="presentation"
                    aria-hidden="true"
                    className={cn('items-center', ellipsisClass)}
                  >
                    <BreadcrumbEllipsis />
                  </li>
                </>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumbs,
  BreadcrumbSeparator,
};
