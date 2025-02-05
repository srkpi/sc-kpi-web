'use client';

import * as React from 'react';
import { FC } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
import { useScheduleStore } from '@/store/schedule-store';
import { Group } from '@/types/group';

interface GroupsDropdownProps {
  groups: Group[];
}

export const GroupsDropdown: FC<GroupsDropdownProps> = ({ groups }) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { groupName, setGroupName, setGroupId } = useScheduleStore();

  const handleChooseGroup = (curGroup: string) => {
    const selectedGroup = groups.find(group => group.name === curGroup);
    setOpen(false);
    setGroupName(selectedGroup?.name || '');
    setGroupId(selectedGroup?.id || '');
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
          {groupName || 'Оберіть групу'}
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
};
