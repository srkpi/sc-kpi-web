import { FC } from 'react';
import { Plus } from 'lucide-react';

import getEventColor from '@/app/(client)/schedule-importer/utils/getEventColor';
import { Event } from '@/types/event';

interface ScheduleCardProps {
  event: Event;
}

const ScheduleCard: FC<ScheduleCardProps> = ({ event }) => {
  const { name, type, teacherName, time } = event;
  const eventType = type.split(' ').at(0) as string;
  const eventColor = getEventColor(eventType);
  return (
    <div className="relative bg-gray p-[10px] w-[170px] lg:w-[260px] h-[120px] lg:h-[170px] rounded-[10px]">
      <Plus
        size={20}
        className="absolute m-[8px] cursor-pointer rotate-[-45deg] right-0 top-0"
      />
      <div
        style={{ backgroundColor: eventColor }}
        className="w-[60px] text-m-p lg:text-p lg:w-[80px] mb-[5px] rounded-[4px] h-[20px] lg:h-[25px] flex items-center justify-center"
      >
        {eventType}
      </div>
      <p className="line-clamp-2 text-ellipsis text-m-p lg:text-p mb-[5px]">
        {name}
      </p>
      <p className="text-m-p lg:text-p text-gray-500 mb-[5px]">{teacherName}</p>
      <p className="font-light text-p-light lg:text-m-p">{time}</p>
    </div>
  );
};

export default ScheduleCard;
