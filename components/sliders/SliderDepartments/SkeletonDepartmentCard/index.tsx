import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';
import { Button } from '@/components/ui/button';

const SkeletonDepartmentCard = () => {
  return (
    <>
      <div className="hidden md:flex gap-5 md:gap-12 lg:gap-[72px]">
        <div className="md:w-[45%] 2xl:w-[40%] flex flex-col">
          <div className="max-w-[550px] flex-auto mb-5">
            <div className="font-h1 mb-5 lg:mb-12 bg-blue animate-pulse h-[36px] rounded-[10px] w-[50%]"></div>
            <div className="pb-5 lg:pb-9 flex flex-col gap-2">
              <div className="animate-pulse bg-blue h-5 w-full rounded-[6px]"></div>
              <div className="animate-pulse bg-blue h-5 w-full rounded-[6px]"></div>
              <div className="animate-pulse bg-blue h-5 w-[60%] rounded-[6px]"></div>
            </div>
            <Button size="sm" className="min-w-[300px]">
              Вступити
            </Button>
          </div>
          <div className="flex gap-1 self-end">
            <ArrowLeft onClick={() => null} />
            <ArrowRight onClick={() => null} />
          </div>
        </div>
        <div className="md:w-[55%] 2xl:w-[60%] transition-all hidden md:flex xl:block 2xl:mr-[37px] h-full p-[2px]">
          <div className="max-h-[420px] max-w-[725px] aspect-[36/21] h-full overflow-hidden rounded-[20px] w-full">
            <div className="object-cover w-full h-full bg-blue animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex md:hidden flex-col gap-5 sm:gap-8 items-center max-w-[500px] mx-auto">
        <div className="flex gap-1 w-full justify-between items-center">
          <ArrowLeft onClick={() => null} />
          <div className="font-h3 text-m-h1 sm:text-[24px] bg-blue animate-pulse h-[18px] sm:h-[24px] w-24 rounded-[6px]"></div>
          <ArrowRight onClick={() => null} />
        </div>
        <div className="max-h-[420px] md:min-h-[300px] aspect-[36/21] overflow-hidden animate-pulse bg-blue w-[100%] rounded-[20px]">
          <div className="object-cover w-full h-full bg-blue animate-pulse" />
        </div>
        <div className="text-center font-m-p text-m-p sm:text-p flex flex-col gap-2 items-center w-full">
          <div className="animate-pulse bg-blue h-4 w-full rounded-[6px]"></div>
          <div className="animate-pulse bg-blue h-4 w-full rounded-[6px]"></div>
          <div className="animate-pulse bg-blue h-4 w-[60%] rounded-[6px]"></div>
        </div>
        <Button size="sm" className="min-w-[270px] sm:min-w-[290px]">
          Вступити
        </Button>
      </div>
    </>
  );
};

export default SkeletonDepartmentCard;
