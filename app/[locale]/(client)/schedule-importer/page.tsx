import { Suspense } from 'react';
import { Metadata } from 'next';

import Schedule from '@/app/[locale]/(client)/schedule-importer/components/schedule';
import ScheduleTable from '@/app/[locale]/(client)/schedule-importer/components/schedule-table';
import { getGroups } from '@/app/[locale]/actions/schedule.actions';
import Spinner from '@/components/ui/spinner';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Розклад занять',
  description:
    'Перегляньте актуальний розклад занять для студентів КПІ ім. Ігоря Сікорського. Знайдіть інформацію про лекції, семінари та інші навчальні події.',
};

export default async function Page() {
  const groups = await getGroups();

  return (
    <div className="flex gap-[20px] flex-col items-center pt-[20px] lg:pt-[40px]">
      <Suspense fallback={<Spinner />}>
        <Schedule groups={groups} />
      </Suspense>
      <p className="max-w-[750px] text-center text-m-p md:text-p px-[24px]">
        Виберіть групу у випадаючому списку. Приберіть непотрібні вам предмети,
        натиснувши на хрестик біля предмету. Натисніть на кнопку "Імпортувати
        розклад". Надайте застосунку необхідні дозволи, та через декілька хвилин
        насолоджуйтесь розкладом у Google Calendar.
      </p>
      <ScheduleTable />
    </div>
  );
}
