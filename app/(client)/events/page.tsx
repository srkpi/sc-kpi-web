import { CalendarDays, Layers } from 'lucide-react';

import { EventsPage } from '@/app/(client)/events/EventsPage';
import SubClientLayout from '@/app/(client)/sub-client-layout';
import { BreadcrumbItemType } from '@/components/ui/breadcrumb';
import { api } from '@/lib/api';
import { CalendarEvent } from '@/types/calendar-event';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: CalendarDays,
    href: '/events',
    label: 'Розклад заходів',
  },
];

export default async function Page() {
  const { data } = await api.get<CalendarEvent[]>('/calendar/event');
  return (
    <SubClientLayout
      pageTitle="Розклад заходів"
      breadcrumbs={BREADCRUMBS_ITEMS}
    >
      <EventsPage events={data} />
    </SubClientLayout>
  );
}
