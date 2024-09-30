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
  const isTheSameDay =
    startDateObj.getDay() === endDateObj.getDay() &&
    startDateObj.getMonth() === endDateObj.getMonth() &&
    startDateObj.getFullYear() === endDateObj.getFullYear();

  const cropDate = (DateObj: Date) => {
    const day = String(DateObj.getDate()).padStart(2, '0');
    const month = String(DateObj.getMonth() + 1).padStart(2, '0');
    const year = DateObj.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getTimeHoursAndMinutes = (DateObj: Date) => {
    const hours = String(DateObj.getHours()).padStart(2, '0');
    const minutes = String(DateObj.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getTimeDifference = () => {
    if (endDateObj.getTime() !== startDateObj.getTime()) {
      return (
        getTimeHoursAndMinutes(startDateObj) +
        '-' +
        getTimeHoursAndMinutes(endDateObj)
      );
    } else {
      return getTimeHoursAndMinutes(startDateObj);
    }
  };

  return (
    <div className="flex flex-col gap-[10px] outline-none border-[1px] rounded-[10px] p-[14px] border-white w-full hover:scale-[1.036] hover:shadow-[0px_0px_7px_0px_#ECEDF8A8] transition">
      <h3 className="text-blue text-sm md:text-base font-semibold">{title}</h3>
      <p className="text-m-p md:text-sm flex-auto">{shortDescription}</p>
      <div className="text-sm md:text-base font-medium flex flex-row gap-2 leading-[25px] mb-[-3px]">
        <MapPinned className="min-w-[24px]" />
        {location}
      </div>
      <div className="flex justify-between items-center flex-wrap gap-x-2 text-sm md:text-base">
        <span className="md:text-greyBlue">{tag}</span>
        <div className="flex gap-x-2 flex-wrap">
          <span className="font-semibold">
            {!isTheSameDay
              ? cropDate(startDateObj) + ' - ' + cropDate(endDateObj)
              : cropDate(startDateObj)}
          </span>
          <span>{getTimeDifference()}</span>
        </div>
      </div>
    </div>
  );
};

export default Event;
