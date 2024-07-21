import { FC } from 'react';
import { Plus } from 'lucide-react';

import { EventTypeMapper } from '@/app/(client)/schedule-importer/constants';
import getTimeFromDate from '@/lib/getTimeFromDate';
import { Event } from '@/types/event';

interface ScheduleCardProps {
  event: Event;
}

const ScheduleCard: FC<ScheduleCardProps> = ({ event }) => {
  const { name, type, teacherName, startDate, endDate } = event;
  const startTime = getTimeFromDate(startDate);
  const endTime = getTimeFromDate(endDate);
  const eventType = EventTypeMapper[type];
  return (
    <div className="relative bg-gray p-[10px] w-[170px] lg:w-[260px] h-[120px] lg:h-[170px] rounded-[10px]">
      <Plus
        size={20}
        className="absolute m-[8px] cursor-pointer rotate-[-45deg] right-0 top-0"
      />
      <div
        className={`w-[60px] text-m-p lg:text-p lg:w-[80px] mb-[5px] rounded-[4px] h-[20px] lg:h-[25px] flex items-center justify-center bg-[${eventType.color}]`}
      >
        {eventType.text}
      </div>
      <p className="line-clamp-2 text-ellipsis text-m-p lg:text-p mb-[5px]">
        {name}
      </p>
      <p className="text-m-p lg:text-p text-gray-500 mb-[5px]">{teacherName}</p>
      <p className="font-light text-p-light lg:text-m-p">
        {startTime} - {endTime}
      </p>
    </div>
  );
};

export default ScheduleCard;
