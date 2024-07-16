import Image from 'next/image';

const Header = () => {
  return (
    <div className="flex justify-between items-center py-[8px] sm:[15px] lg:py-[23px] px-[14px] md:px-[32px] lg:px-[64px] xl:px-[100px]">
      <Image
        className="object-cover align-top w-[67px] md:w-[85px] lg:w-[104px] h-auto"
        src="/images/Logo.png"
        alt="logo"
        width={104}
        height={38}
      />
      <div>other</div>
    </div>
  );
};

export default Header;
