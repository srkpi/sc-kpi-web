import { FileInputIcon } from 'lucide-react';
import Link from 'next/link';

import SliderDepartments from '@/components/SliderDepartments';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

export default async function Home() {
  const { data: departments } = await api.get<Department[]>('/departments');

  return (
    <main className="pt-5 md:pt-8 lg:pt-12">
      <section className="_container">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-x-5 gap-y-12 pb-[60px] md:pb-[200px]">
          <div className="lg:w-[45%] flex flex-col gap-8 md:gap-16">
            <div className="flex flex-col gap-5 sm:gap-8 md:gap-16 max-w-[460px] md:max-w-[600px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h1 className="md:block hidden font-h1">
                    Студентська рада КПІ
                  </h1>
                  <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
                    <span className="inline md:hidden">
                      Студентська рада КПІ —{' '}
                    </span>
                    це ком'юніті згуртованих та ініціативних студентів, які
                    роблять КПІ кращим.
                  </p>
                </div>
                <div className="flex flex-col gap-1 max-w-[520px]">
                  <h3 className="hidden md:block font-h3">
                    Ми відкриті для кожного студента
                  </h3>
                  <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
                    Основна наша діяльність полягає в захисті прав та
                    інформуванні студентства, організації та проведення
                    культурно-масових подій
                  </p>
                </div>
                <div className="flex flex-col gap-1 max-w-[520px]">
                  <h3 className="hidden md:block font-h3">
                    У Студраді є місце для всіх
                  </h3>
                  <p className="font-regular text-m-p leading-4 sm:text-p sm:leading-5">
                    <span className="inline md:hidden">
                      У Студраді є місце для всіх —{' '}
                    </span>
                    від редакторів/ок та дизайнерів/ок до організаторів/ок
                    подій, а також всіх, хто має бажання підтримувати
                    студентську спільноту.
                  </p>
                </div>
                <p className="max-w-[520px] font-regular text-m-p leading-4 sm:text-p sm:leading-5">
                  <span className="md:font-h3">Кожен,</span> хто бажає
                  приєднатися, може будь-коли заповнити форму за посиланням
                  нижче.
                </p>
              </div>
              <Link href="https://forms.gle/wXVo8zMxSpZZpmQ96">
                <Button size="sm" className="self-start px-12 md:px-6">
                  Приєднуйся до Студради КПІ
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
              <h2 className="font-h3 text-m-h1 md:text-h1 ">Документи</h2>
              <h4 className="font-p text-m-p sm:text-p">Положення про ОСС</h4>
              <Link
                className="min-h-[40px] sm:min-h-[50px] md:min-h-[70px] select-none max-w-[360px] flex gap-4 bg-gradient-to-r hover:translate-x-1 transition-all from-dark to-accent rounded-[10px] items-center p-[10px] md:p-[15px]"
                href="https://t.me/oss_kpi_archive/105"
                download
              >
                <div className="hidden md:inline-block">
                  <FileInputIcon color="white" size={40} />
                </div>
                <div className="inline-block md:hidden">
                  <FileInputIcon color="white" size={20} />
                </div>
                <span className="underline text-m-p sm:text-p">
                  Положення про ОСС
                </span>
              </Link>
              <h4 className="font-p text-m-p sm:text-p">
                Закон про вищу освіту
              </h4>
              <Link
                className="min-h-[40px] sm:min-h-[50px] md:min-h-[70px] select-none max-w-[360px] flex gap-4 bg-gradient-to-r hover:translate-x-1 transition-all from-dark to-accent rounded-[10px] items-center p-[10px] md:p-[15px]"
                href=" https://zakon.rada.gov.ua/laws/show/1556-18#Text"
                download
              >
                <div className="hidden md:inline-block">
                  <FileInputIcon color="white" size={40} />
                </div>
                <div className="inline-block md:hidden">
                  <FileInputIcon color="white" size={20} />
                </div>
                <span className="underline text-m-p sm:text-p">
                  Закон про вищу освіту
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:w-[55%] max-w-[900px] hidden lg:block h-[80vh] max-h-[1000px]">
            <iframe
              className="relative w-full h-full border-none select-none min-h-[580px]"
              src="https://xn--r1a.website/s/sr_kpi"
            />
          </div>
        </div>
      </section>
      <section className="relative w-full mx-auto pb-[90px] md:pb-[200px] overflow-x-hidden">
        <div className="_container">
          <SliderDepartments departments={departments} />
        </div>
      </section>
    </main>
  );
}
