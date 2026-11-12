import Image from 'next/image';

export default function Admin() {
  return (
    <div className="rounded-lg bg-gray flex h-fit justify-between items-center gap-10 px-16 py-10">
      <div>
        <h1 className="text-4xl font-semibold">
          Привіт, приготуйся до роботи!
        </h1>
        <p className="text-2xl mt-6">
          Тут ти зможеш додавати, редагувати та видаляти департаменти,
          керівництво, напрями роботи, студентські об’єднання та найчастіші
          запитання з відповідями на них.
        </p>
      </div>
      <Image
        className="shrink-0 rounded-lg"
        src="/images/hedgehog.jpg"
        alt="Nice looking hedgehog"
        width={240}
        height={280}
        quality={100}
      />
    </div>
  );
}
