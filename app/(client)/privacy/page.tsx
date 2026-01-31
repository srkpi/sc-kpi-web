import { FileCheck2, Layers } from 'lucide-react';
import { Metadata } from 'next';

import SubClientLayout from '@/app/(client)/sub-client-layout';
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
      titleCentered
    >
      <div className="mt-12 md:mt-20 mx-0 md:mx-[193px] text-left space-y-10">
        <section className="space-y-4">
          <h2 className="font-semibold text-m-h1">Політика конфіденційності</h2>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Цей документ описує політику конфіденційності для сайту{' '}
            <a
              className="underline"
              href="https://sc.kpi.ua"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://sc.kpi.ua
            </a>{' '}
            Студентської Ради КПІ. Основною метою Сайту є допомога студентам та
            автоматизація внутрішніх і зовнішніх процесів Студентської Ради КПІ.
            Сайт є проєктом з відкритим кодом, який знаходиться у публічному
            просторі за посиланням{' '}
            <a
              className="underline"
              href="https://github.com/srkpi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/srkpi/
            </a>
            .
          </p>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Використовуючи Сайт, Ви підтверджуєте, що ознайомилися з{' '}
            <a
              className="underline"
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Політикою конфіденційності Google
            </a>{' '}
            та погоджуєтеся дотримуватися її. Використання і передача даних,
            отриманих із Google API, здійснюється відповідно до{' '}
            <a
              className="underline"
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Політики щодо даних користувачів служб Google API
            </a>
            , включаючи{' '}
            <a
              className="underline"
              href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
              target="_blank"
              rel="noopener noreferrer"
            >
              вимоги обмеженого використання
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-m-h1">Збір персональних даних</h2>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Під час використання Сайту можуть збиратися, зберігатися та
            використовуватися такі персональні дані користувачів: прізвище,
            ім’я, по батькові, електронна пошта, академічна група, факультет або
            інститут.
          </p>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Також може збиратися інформація про відвідування і використання
            Сайту, включаючи тривалість перебування, перегляди сторінок та шляхи
            навігації.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-m-h1">
            Використання персональної інформації
          </h2>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Персональна інформація, передана через Сайт, використовується
            виключно для цілей, зазначених у цій Політиці або на відповідних
            сторінках Сайту.
          </p>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Зокрема, персональні дані можуть використовуватися для
            адміністрування Сайту та надання доступу до сервісів, доступних на
            Сайті.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-m-h1">Зміни до умов Політики</h2>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Адміністрація Сайту має право вносити зміни до умов цієї Політики у
            будь-який час.
          </p>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Усі зміни набувають чинності з моменту їх публікації. Використовуючи
            Сайт, ви підтверджуєте згоду з чинною редакцією Політики.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-m-h1">
            Видалення персональних даних
          </h2>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Персональні дані користувача можуть бути видалені за його власним
            запитом або після деактивації Сайту.
          </p>

          <p className="font-regular text-m-p sm:text-p leading-relaxed">
            Адміністрація Сайту залишає за собою право видаляти акаунт та
            персональні дані користувача у випадках, коли його дії шкодять
            функціонуванню Сайту.
          </p>
        </section>
      </div>
    </SubClientLayout>
  );
}
