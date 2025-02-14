import React from 'react';

import ArrowLeft from '@/components/sliders/ArrowLeft';
import ArrowRight from '@/components/sliders/ArrowRight';

const SkeletonDepartmentCard = () => {
  return (
    <>
      <div className="hidden md:flex gap-5">
        <div className="md:w-[45%] 2xl:w-[40%] flex flex-col">
          <div className="hidden w-full md:flex justify-end flex-col h-full pr-8">
            <div className="max-w-[550px]">
              <h3 className="font-extrabold md:text-[80px] lg:text-[100px] text-blue opacity-55 mb-2 lg:mb-5 leading-[1.15em]">
                #01
              </h3>
              <div className="font-h1 bg-blue animate-pulse h-[36px] rounded-[10px] w-[75%] mb-5"></div>
              <div className="pb-5 lg:pb-9 flex flex-col gap-2">
                <div className="animate-pulse bg-blue h-5 w-full rounded-[6px]"></div>
                <div className="animate-pulse bg-blue h-5 w-full rounded-[6px]"></div>
                <div className="animate-pulse bg-blue h-5 w-[60%] rounded-[6px]"></div>
              </div>
            </div>
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
          <div className="font-h3 text-m-h1 sm:text-[24px] bg-blue animate-pulse h-[18px] sm:h-[24px] w-36 rounded-[6px]"></div>
          <ArrowRight onClick={() => null} />
        </div>
        <div className="max-h-[420px] md:min-h-[300px] aspect-[36/21] overflow-hidden animate-pulse bg-blue w-[100%] rounded-[20px]">
          <div className="object-cover w-full h-full bg-blue animate-pulse" />
        </div>
        <div className="flex gap-3 w-full">
          <h3 className="font-extrabold text-[50px] text-blue opacity-55 leading-[1em]">
            #01
          </h3>
          <div className="w-full flex flex-col gap-2 items-start pt-1 flex-auto">
            <div className="animate-pulse bg-blue h-3 md:h-4 w-full rounded-[6px]"></div>
            <div className="animate-pulse bg-blue h-3 md:h-4 w-full rounded-[6px]"></div>
            <div className="animate-pulse bg-blue h-3 md:h-4 w-[60%] rounded-[6px]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonDepartmentCard;
