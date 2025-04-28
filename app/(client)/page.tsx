import React from 'react';
import { FileInputIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { getDepartmentList } from '@/app/actions/department.actions';
import { getServiceList } from '@/app/actions/service.actions';
import SliderMainPageDepartments from '@/components/sliders/SliderMainPageDepartments';
import { Button } from '@/components/ui/button';

const documents = [
  {
    title: 'Положення про СС',
    link: 'https://t.me/oss_kpi_archive/772',
    description:
      'Положення про студентське самоврядування Національного технічного університету України "Київський політехнічний інститут імені Ігоря Сікорського", затверджене протоколом №1 засідання Конференції студентів КПІ ім. Ігоря Сікорського від 27.04.2024, зі змінами, затвердженими протоколом №2 засідання Конференції студентів КПІ ім. Ігоря Сікорського від 04.04.2024, зі змінами, затвердженими протоколом №1/2024 засідання Конференції студентів КПІ ім. Ігоря Сікорського від 22.09.2024.',
  },
  {
    title: 'Закон України "Про вищу освіту"',
    link: 'https://zakon.rada.gov.ua/laws/show/1556-18#Text',
    description:
      'Цей Закон встановлює основні правові, організаційні, фінансові засади функціонування системи вищої освіти, створює умови для посилення співпраці державних органів і бізнесу з закладами вищої освіти на принципах автономії закладів вищої освіти, поєднання освіти з наукою та виробництвом з метою підготовки конкурентоспроможного людського капіталу для високотехнологічного та інноваційного розвитку країни, самореалізації особистості, забезпечення потреб суспільства, ринку праці та держави у кваліфікованих фахівцях.',
  },
];

export const metadata: Metadata = {
  description:
    "Ласкаво просимо на офіційну сторінку Студентської Ради КПІ ім. Ігоря Сікорського. Дізнайтеся більше про наші проєкти, об'єднання та події, які роблять студентське життя в КПІ цікавішим і активнішим.",
};

export default async function Home() {
  const services = await getServiceList();
  const departments = await getDepartmentList();

  return (
    <div className="mb-[144px] md:mb-[200px]">
      {departments.length >= 2 && (
        <section className="overflow-hidden pb-[70px]">
          <SliderMainPageDepartments departments={departments} />
        </section>
      )}
      <section className="max-w-[1520px] mx-auto px-0 md:px-[32px] lg:px-[64px] xl:px-[100px] mb-[60px]">
        <div className="overflow-hidden min-h-[300px] rounded-[20px] bg-[linear-gradient(270deg,_rgba(236,237,248,0.10)_0.26%,rgba(236,237,248,0.00)_95.06%)] relative py-[30px] px-[14px] md:py-[70px] md:px-[130px]">
          <div className="flex flex-col lg:max-w-[60%] min-[1520px]:max-w-[80%] items-start">
            <h1 className="text-[20px] md:text-h1 max-w-[calc(100%-110px)] sm:max-w-full font-semibold text-blue mb-[14px] md:mb-[5px] leading-[110%]">
              Студентська рада КПІ ім. Ігоря Сікорського
            </h1>
            <p className="text-p md:text-h3 mb-[30px] max-w-[calc(100%-150px)] sm:max-w-[calc(40%+150px)] lg:max-w-[490px]">
              це ком'юніті згуртованих та ініціативних студентів, які роблять
              КПІ кращим.
            </p>
            <p className="text-[18px] md:text-h3 mb-[30px] md:mb-[10px] sm:max-w-[calc(40%+210px)] lg:max-w-[800px]">
              Ми відкриті для кожного студента. Основна наша діяльність полягає
              в захисті прав та інформуванні студентства, організації та
              проведення культурно-масових подій
            </p>
            <p className="text-[18px] md:text-h3 mb-[30px] max-w-[650px]">
              У Студраді є місце для всіх від редакторів/ок та дизайнерів/ок до
              організаторів/ок подій, а також всіх, хто має бажання підтримувати
              студентську спільноту.
            </p>
            <p className="text-[18px] md:text-h3 mb-[50px] max-w-[530px]">
              <span className="text-[20px] md:text-h1 text-blue font-medium">
                Кожен,
              </span>{' '}
              хто бажає приєднатися, може будь-коли заповнити форму за
              посиланням нижче.
            </p>
            <Link href="https://forms.gle/wXVo8zMxSpZZpmQ96">
              <Button className="self-center md:self-start py-2 md:py-4 px-8 md:px-6">
                Приєднуйся до Студради КПІ
              </Button>
            </Link>
          </div>
          <div className="absolute top-4 lg:top-1/2 lg:-translate-y-1/2 right-0 w-[480px] lg:h-[480px] aspect-square max-w-[calc(60%-200px)] min-w-[150px]">
            <img
              className="absolute top-0 left-0 h-full w-full"
              src="/images/blue-hedgehog.svg"
              alt="їжачок"
            />
            <img
              className="absolute top-0 left-0 h-full w-full opacity-70"
              src="/images/blue-hedgehog.svg"
              alt="їжачок"
            />
            <img
              className="absolute top-0 left-0 h-full w-full blur-[8px] brightness-[100] -z-10"
              src="/images/blue-hedgehog.svg"
              alt="їжачок"
            />
            <img
              className="absolute top-0 left-0 h-full w-full blur-[8px] brightness-[100] -z-10"
              src="/images/blue-hedgehog.svg"
              alt="їжачок"
            />
          </div>
        </div>
      </section>
      {services.length > 0 && (
        <section className="flex flex-col gap-[30px] md:gap-[80px] items-center _container mb-[60px]">
          <h2 className="font-h1 text-blue">Служби</h2>
          {services.map((service, index: number) => (
            <div
              className="relative max-w-[450px] md:max-w-full w-full flex flex-col md:flex-row md:min-h-[350px] lg:min-h-[500px] rounded-[20px] overflow-hidden"
              key={service.id}
            >
              <div
                className={`md:w-1/2 aspect-[16/9] rounded-[20px] md:rounded-none overflow-hidden w-full relative ${index % 2 === 1 ? 'md:block' : 'md:hidden'}`}
              >
                <img
                  className="h-full w-full object-cover absolute top-0 left-0"
                  src={service.image}
                  alt={service.name}
                />
              </div>
              <div className="md:w-1/2 p-[14px] mt-[-20px] pt-[30px] md:p-[30px] lg:p-[50px] bg-gradient-to-b from-[#ecedf833] to-transparrent flex flex-col">
                <h3 className="text-[20px] md:text-h1 font-semibold pb-[18px] md:pb-[20px] lg:pb-[40px]">
                  {service.name}
                </h3>
                <p className="text-[14px] leading-[150%] md:text-[16px] pb-[20px] md:pb-[40px] lg:pb-[80px]">
                  {service.description}
                </p>
                <Link
                  className="self-center md:self-start"
                  href={service.buttonLink}
                >
                  <Button className="h-[40px] w-full max-w-[350px] min-w-[250px] md:h-[50px] rounded-[6px] bg-gradient-to-r from-accent to-blue border-none">
                    Вступити
                  </Button>
                </Link>
              </div>
              {index % 2 === 0 && (
                <div className="w-1/2 relative">
                  <img
                    className="h-full w-full object-cover absolute top-0 left-0"
                    src={service.image}
                    alt={service.name}
                  />
                </div>
              )}
            </div>
          ))}
        </section>
      )}
      <section className="_container">
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 items-center">
          <h2 className="text-[24px] md:text-h1 font-semibold text-blue mb-[30px] md:mb-[80px]">
            Документи
          </h2>
          <div className="flex justify-around w-full gap-x-4 gap-y-[30px] md:gap-y-[80px] flex-wrap">
            {documents.map(document => (
              <div
                key={document.title}
                className="flex flex-col flex-auto items-center"
              >
                <h4 className="text-[20px] md:text-[30px] font-medium self-center sm:text-center mb-[30px] md:mb-[50px]">
                  {document.title}
                </h4>
                <div className="overflow-hidden bg-[linear-gradient(270deg,rgba(236,237,248,0.1)_0.26%,_rgba(236,237,248,0)_100%)] min-h-[300px] md:min-h-[500px] px-[14px] sm:px-[50px] py-[20px] max-w-[350px] md:max-w-none md:w-[400px] rounded-[20px] backdrop-blur-[10px] flex-auto">
                  <div className="h-full w-full p-[12px] absolute top-0 left-0 -z-10">
                    <div className="bg-blue h-full w-full rounded-[14px] blur-[10px] bg-gradient-to-r from-dark to-[#2634DA]"></div>
                  </div>
                  <Link
                    className="select-none flex gap-4 items-center hover:translate-x-1 transition-all mb-[25px]"
                    href={document.link}
                    download
                  >
                    <FileInputIcon
                      className="hidden md:inline-block"
                      color="white"
                      size={40}
                    />
                    <FileInputIcon
                      className="inline-block md:hidden"
                      color="white"
                      size={30}
                    />
                    <span className="underline text-p">{document.title}</span>
                  </Link>
                  <p className="text-m-p md:text-p  font-light">
                    {document.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
