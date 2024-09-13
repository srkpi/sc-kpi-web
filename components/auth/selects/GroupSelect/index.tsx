'use client';
import React, { useState } from 'react';
import { UseFormClearErrors, UseFormRegisterReturn } from 'react-hook-form';
import { ChevronDown, ChevronUp } from 'lucide-react';
import useSWR from 'swr';

import { RegisterFormData } from '@/app/(auth)/register/validation';
import { ChangeProfileFormData } from '@/app/(client)/profile/_validation';
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
import { axiosCampusFetcher } from '@/lib/swr/fetcher';
import { IFacultyData } from '@/types/faculty.interface';
import { IGroupData, IGroupsResponse } from '@/types/group.interface';

type SetValueTypeProps = (
  name: 'faculty' | 'group',
  value: string,
  options?:
    | Partial<{
        shouldValidate: boolean;
        shouldDirty: boolean;
        shouldTouch: boolean;
      }>
    | undefined,
) => void;

interface GroupSelectProps {
  setValue: SetValueTypeProps;
  setSelectedGroup: (group: IGroupData) => void;
  selectedGroup: IGroupData | undefined;
  selectedFaculty: IFacultyData | undefined;
  registerProps: UseFormRegisterReturn;
  clearErrors: UseFormClearErrors<RegisterFormData | ChangeProfileFormData>;
  avoidCollisions?: boolean;
}

const GroupSelect = ({
  setValue,
  selectedGroup,
  setSelectedGroup,
  registerProps,
  clearErrors,
  avoidCollisions = false,
}: GroupSelectProps) => {
  const [open, setOpen] = useState(false);
  const { data: allGroups } = useSWR<IGroupsResponse>(
    '/schedule/groups',
    axiosCampusFetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const handleGroupChange = (group: IGroupData) => {
    setValue('group', group.name);
    setSelectedGroup(group);
    clearErrors('group');
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="text-m-p md:text-p leading-[14px] md:leading-[16px] p-3 md:px-[23px] md:py-[22px] rounded-[10px] min-h-[40px] md:min-h-[65px] bg-dark"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="sm"
          className={`justify-between relative gap-[5px] p-[10px] overflow-hidden ${avoidCollisions && 'border-white'}`}
        >
          {selectedGroup ? selectedGroup?.name : 'Оберіть групу'}
          {!open ? (
            <ChevronDown
              className="w-3 md:w-5 flex-grow-0 flex-shrink-0"
              size={20}
            />
          ) : (
            <ChevronUp
              className="w-3 md:w-5 flex-grow-0 flex-shrink-0"
              size={20}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ WebkitOverflowScrolling: 'unset', scrollbarWidth: 'none' }}
        className={`p-0 bg-transparent border-none rounded-[10px] w-full max-w-[calc(50vw-24px)] md:max-w-[calc(50vw-44px)] lg:max-w-[calc(50vw-74px)] ${avoidCollisions && 'px-2'}`}
        side="bottom"
        align={avoidCollisions ? 'center' : 'start'}
        avoidCollisions={avoidCollisions}
      >
        <Command className="bg-transparent">
          <CommandInput placeholder="Пошук" />
          <CommandList className="mt-[5px] bg-dark border-white border-[1px] no-scrollbar rounded-b-[10px]">
            <CommandEmpty className="bg-dark p-2 text-m-p md:text-p">
              Групу не знайдено
            </CommandEmpty>
            <CommandGroup className="bg-dark">
              {allGroups?.data.map(group => (
                <CommandItem
                  key={group.id}
                  value={group.name}
                  onSelect={() => handleGroupChange(group)}
                >
                  {group.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      <input type="hidden" {...registerProps} />
    </Popover>
  );
};

export default GroupSelect;
