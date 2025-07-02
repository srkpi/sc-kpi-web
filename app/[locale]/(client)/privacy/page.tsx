import { FileCheck2, Layers } from 'lucide-react';
import { Metadata } from 'next';

import SubClientLayout from '@/app/[locale]/(client)/sub-client-layout';
import { BreadcrumbItemType } from '@/components/ui/breadcrumb';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: FileCheck2,
    href: '/privacy',
    label: 'Політика конфіденційності',
  },
];

export const metadata: Metadata = {
  title: 'Політика конфіденційності',
  description:
    'Ознайомтесь з нашою політикою конфіденційності, щоб дізнатися, як ми збираємо, використовуємо та захищаємо ваші персональні дані.',
};

export default function Privacy() {
  return (
    <SubClientLayout
      pageTitle="Політика конфіденційності"
      breadcrumbs={BREADCRUMBS_ITEMS}
    >
      <div className="mt-9 md:mt-[80px] ml-0 mr-0 md:ml-[193px] md:mr-[193px] text-left space-y-4">
        <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
          <span className="font-m-p font-semibold md:text-m-h1">
            Політика конфіденційності
          </span>{' '}
          <br />
          Цей документ описує політику конфіденційності для сайту
          https://sc.kpi.ua Студентської Ради КПІ. <br />
          Основною метою Сайту є допомога студентам та автоматизація внутрішніх
          і зовнішніх процесів Студентської Ради КПІ. <br />
          Сайт є проєктом з відкритим кодом, який знаходиться у публічному
          просторі за посиланням{' '}
          <a className="text underline" href="https://github.com/srkpi/">
            https://github.com/srkpi/
          </a>
          <br />
          <br />
          Використовуючи Сайт, Ви підтверджуєте, що ознайомилися з{' '}
          <a
            className="text underline"
            href="https://policies.google.com/privacy"
          >
            Політикою конфіденційності Google
          </a>{' '}
          і погоджуєтеся дотримуватися її. Використання і передача даних,
          отриманих із Google API, до будь-якого застосунку здійснюється
          відповідно до{' '}
          <a
            className="text underline"
            href="https://developers.google.com/terms/api-services-user-data-policy"
          >
            Політики щодо даних користувачів служб Google API
          </a>
          , включаючи{' '}
          <a
            className="text underline"
            href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
          >
            вимоги обмеженого використання
          </a>
          .
        </p>
        <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
          <span className="font-m-p font-semibold md:text-m-h1">
            Збір персональних даних
          </span>{' '}
          <br />
          Перелік персональних даних користувачів, які можуть бути зібрані,
          збережені та використані під час роботи з сайтом: <br /> прізвище,
          ім’я, по батькові, електронна пошта, академічна група,
          факультет/інститут; <br />
          інформація про відвідування і використання Сайту, включаючи тривалість
          відвідування, перегляди сторінок і шляхи навігації по сайту тощо;
        </p>
        <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
          <span className="font-m-p font-semibold md:text-m-h1">
            Використання вашої персональної інформації
          </span>{' '}
          <br />
          Персональна інформація, яка була передана нам через Сайт, буде
          використовуватися задля цілей, зазначених у цих правилах або на
          відповідних сторінках Сайту. <br />
          Ми можемо використовувати вашу персональну інформацію в наступних
          цілях: адміністрування Сайту; надання вам можливості користуватися
          сервісами, доступними на Сайті;
        </p>
        <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
          <span className="font-m-p font-semibold md:text-m-h1">
            Зміни до умов Політики
          </span>{' '}
          <br />
          Адміністрація Сайту має право вносити зміни в умови Політики. <br />
          Всі зміни набувають чинності з моменту їх публікації. Використовуючи
          Сайт, ви підтверджуєте згоду з умовами Політики у редакції, чинній на
          момент використання Сайту.
        </p>
        <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
          <span className="font-m-p font-semibold md:text-m-h1">
            Коли ми видаляємо персональні дані?
          </span>{' '}
          <br />
          Персональні дані користувача видаляються: за власним запитом
          користувача; після деактивації Сайту. <br />
          Адміністрація Сайту залишає за собою право видаляти акаунт та
          персональні дані користувача у випадках, коли дії користувача шкодять
          функціонуванню Сайту.
        </p>
      </div>
    </SubClientLayout>
  );
}
