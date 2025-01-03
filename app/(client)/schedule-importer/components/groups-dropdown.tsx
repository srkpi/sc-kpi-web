'use client';

import * as React from 'react';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { WeekType } from '@/app/(client)/schedule-importer/types';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Group } from '@/types/group';

interface GroupsDropdownProps {
  week: WeekType;
  groups: Group[];
  group: Group | null;
  setGroup: Dispatch<SetStateAction<Group | null>>;
}

const GroupsDropdown: FC<GroupsDropdownProps> = memo(
  ({ week, groups, group, setGroup }) => {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const router = useRouter();

    const handleChooseGroup = (curGroup: string) => {
      const selectedGroup = groups.find(group => group.name === curGroup);
      setGroup(selectedGroup || null);
      setOpen(false);
      router.replace(
        `/schedule-importer?id=${selectedGroup?.id}&name=${selectedGroup?.name}&week=${week || 'first'}`,
      );
    };

    const filteredGroups = groups.filter(curGroup =>
      curGroup.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className="justify-between gap-[5px] p-[10px] w-[140px] md:w-[180px]"
          >
            {group ? group?.name : 'Оберіть групу'}
            {!open ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          style={{ WebkitOverflowScrolling: 'unset', scrollbarWidth: 'none' }}
          className="max-h-[180px] p-0 border-none rounded-[10px] w-[140px] md:w-[180px]"
        >
          <Command>
            <CommandInput
              placeholder="Пошук"
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandEmpty>Групу не знайдено</CommandEmpty>
            <CommandList className="mt-[5px] bg-dark border-white border-[1px] no-scrollbar rounded-b-[10px]">
              <CommandGroup>
                {filteredGroups.map(curGroup => (
                  <CommandItem
                    key={curGroup.id}
                    value={curGroup.name}
                    onSelect={() => handleChooseGroup(curGroup.name)}
                  >
                    {curGroup?.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

export default GroupsDropdown;
