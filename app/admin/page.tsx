import Image from 'next/image';

export default function Admin() {
  return (
    <>
      <div className="rounded-lg bg-[#ECEDF81A] flex flex-row w-3/4 h-1/4 justify-between items-center">
        <div className="ml-16">
          <h1 className="text-4xl font-semibold">
            Привіт, приготуйся до роботи!
          </h1>
          <p className="text-2xl mt-6">
            Тут ти зможеш додавати, редагувати та видаляти департаменти, гуртки
            та найчастіші запитання з відповідями на них.
          </p>
        </div>
        <Image
          className="my-3 mx-9"
          src="/images/hedgehog.jpg"
          alt="Nice looking hedgehog"
          width={240}
          height={313}
          quality={100}
        />
      </div>
    </>
  );
}
