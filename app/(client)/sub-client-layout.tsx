import { BreadcrumbItemType, Breadcrumbs } from '@/components/ui/breadcrumb';

export default function SubClientLayout({
  children,
  breadcrumbs,
  pageTitle,
  titleCentered,
}: Readonly<{
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItemType[];
  pageTitle?: string;
  titleCentered?: boolean;
}>) {
  return (
    <div className="_container py-8">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <h1
        className={`font-h1 mb-[25px] md:my-[35px] text-m-h1 md:text-h1 ${titleCentered ? 'text-center' : 'text-left'}`}
      >
        {pageTitle}
      </h1>
      {children}
    </div>
  );
}
