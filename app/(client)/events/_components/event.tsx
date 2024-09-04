'use client';
import React from 'react';
import { MapPinned } from 'lucide-react';

interface EventInterface {
  title: string;
  shortDescription: string;
  location: string;
  tag: string;
  startDate: string;
  endDate: string;
}

const Event = ({
  title,
  shortDescription,
  location,
  tag,
  startDate,
  endDate,
}: EventInterface) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const cropDate = (DateObj: Date) => {
    return (
      DateObj.getDate() + '.' + DateObj.getMonth() + '.' + DateObj.getFullYear()
    );
  };

  const getTimeDifference = () => {
    if (
      endDateObj.getHours() != startDateObj.getHours() &&
      endDateObj.getHours() * 60 + endDateObj.getMinutes() >=
        startDateObj.getHours() * 60 + startDateObj.getMinutes()
    ) {
      return (
        startDateObj.getHours() +
        ':' +
        startDateObj.getMinutes() +
        '-' +
        endDateObj.getHours() +
        ':' +
        endDateObj.getMinutes()
      );
    } else {
      return startDateObj.getHours() + ':' + startDateObj.getMinutes();
    }
  };

  return (
    <div className="flex flex-col gap-[10px] outline-none border-[1px] rounded-[10px] p-[14px] border-white w-full hover:scale-[1.02] md:hover:scale-[1.04] transition">
      <h3 className="text-blue text-sm md:text-base font-semibold">{title}</h3>
      <p className="text-m-p md:text-sm flex-auto">{shortDescription}</p>
      <div className="text-sm md:text-base font-medium flex flex-row gap-2 leading-[25px] mb-[-3px]">
        <MapPinned className="min-w-[24px]" />
        {location}
      </div>
      <div className="flex justify-between items-center flex-wrap gap-x-2 text-sm md:text-base">
        <span className="md:text-greyBlue">{tag}</span>
        <div className="flex flex-row gap-3">
          <span className="font-semibold">
            {startDateObj === endDateObj
              ? cropDate(startDateObj) + '-' + cropDate(endDateObj)
              : cropDate(startDateObj)}
          </span>
          <span>{getTimeDifference()}</span>
        </div>
      </div>
    </div>
  );
};

export default Event;
