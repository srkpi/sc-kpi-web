import { FileCheck2, Layers } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function Privacy() {
  return (
    <main className="pt-5 md:pt-8 lg:pt-12 p-[14px] sm:p-12 md:p-24">
      <div className="w-full flex flex-col md:flex-row md:justify-start md:items-center">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center">
            <BreadcrumbItem>
              <Layers className="w-[15px] h-[13px] md:w-[20px] md:h-[20px]" />
              <BreadcrumbLink
                className="no-underline hover:no-underline"
                href="/"
              >
                Головна
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <FileCheck2 className="w-[15px] h-[13px] md:w-[20px] md:h-[20px]" />
              <BreadcrumbLink href="/privacy">
                Політика конфіденційності
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="md:ml-40 md:block md:text-h1 mt-[30px] md:mt-0 text-m-h1 font-semibold text-center">
          Політика конфіденційності
        </h1>
      </div>
      <div className="mt-9 md:mt-[80px] ml-0 mr-0 md:ml-[193px] md:mr-[193px] text-left space-y-4">
        <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
          <span className="font-m-p font-semibold md:text-m-h1">
            Політика конфіденційності
          </span>{' '}
          <br />
          Цей документ описує політику конфіденційності для сайту
          https://srkpi.vercel.app/ Студентської Ради КПІ. <br />
          Основною метою Сайту є допомога студентам та автоматизація внутрішніх
          і зовнішніх процесів Студентської Ради КПІ. <br />
          Сайт є проєктом з відкритим кодом, який знаходиться у публічному
          просторі за посиланням{' '}
          <a className="text underline" href="https://github.com/srkpi/">
            https://github.com/srkpi/
          </a>
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
    </main>
  );
}