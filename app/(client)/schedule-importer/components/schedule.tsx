'use client';

import { FC, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CoursesDropdown from '@/app/(client)/schedule-importer/components/courses-dropdown';
import GroupsDropdown from '@/app/(client)/schedule-importer/components/groups-dropdown';
import { WeekType } from '@/app/(client)/schedule-importer/types';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { User } from '@/types/auth/user';
import { Group } from '@/types/group';

interface ScheduleProps {
  groups: Group[];
}

const Schedule: FC<ScheduleProps> = ({ groups }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialGroup = groups.find(
    group => group.id === searchParams.get('id'),
  );
  const [group, setGroup] = useState<Group | null>(initialGroup || null);
  const week = searchParams.get('week') as WeekType;

  const handleWeekChange = (selectedWeek: WeekType) => {
    if (!group) return;
    router.replace(
      `${pathname}?id=${group.id}&name=${group.name}&week=${selectedWeek}`,
    );
  };

  useEffect(() => {
    const fetchUserGroup = async () => {
      try {
        const { data: user } = await api.get<User>('/user');
        if (!user.group) {
          return;
        }
        const groupFromUser = groups.find(group => group.name === user.group);
        if (!groupFromUser) {
          return;
        }
        setGroup(groupFromUser);
        router.replace(
          `${pathname}?id=${groupFromUser.id}&name=${user.group}&week=${week || 'first'}`,
        );
      } catch (error) {
        console.error('Не вдалося завантажити дані користувача:', error);
      }
    };

    if (!group) {
      fetchUserGroup();
    }
  }, [group, pathname, router, week, groups]);

  return (
    <div className="flex flex-col px-[20px] sm:px-[50px] lg:px-[100px] justify-center items-center">
      <h1 className="text-m-h1 lg:text-h1 font-semibold mb-[30px]">
        Імпортер розкладу занять КПІ
      </h1>
      <div className="flex mb-[30px]">
        <Button
          variant={week === 'first' ? 'default' : 'outline'}
          style={{ borderRadius: '6px 0px 0px 6px' }}
          size="sm"
          onClick={() => handleWeekChange('first')}
        >
          Перший тиждень
        </Button>
        <Button
          variant={week === 'second' ? 'default' : 'outline'}
          style={{ borderRadius: '0px 6px 6px 0px' }}
          size="sm"
          onClick={() => handleWeekChange('second')}
        >
          Другий тиждень
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-[10px]">
        <GroupsDropdown
          week={week}
          groups={groups}
          group={group}
          setGroup={setGroup}
        />
        <CoursesDropdown />
      </div>
    </div>
  );
};

export default Schedule;
