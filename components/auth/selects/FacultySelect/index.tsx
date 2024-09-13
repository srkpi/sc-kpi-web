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

interface FacultySelectProps {
  setValue: SetValueTypeProps;
  setSelectedFaculty: (faculty: IFacultyData) => void;
  selectedFaculty: IFacultyData | undefined;
  registerProps: UseFormRegisterReturn;
  clearErrors: UseFormClearErrors<RegisterFormData | ChangeProfileFormData>;
  avoidCollisions?: boolean;
}
const FacultySelect = ({
  setValue,
  setSelectedFaculty,
  selectedFaculty,
  registerProps,
  clearErrors,
  avoidCollisions = false,
}: FacultySelectProps) => {
  const [open, setOpen] = useState(false);
  const { data: faculties } = useSWR<IFacultyData[]>(
    '/subdivision/faculty',
    axiosCampusFetcher,
    {
      fallbackData: [],
      revalidateOnFocus: false,
    },
  );
  const handleFacultyChange = (facultyName: IFacultyData) => {
    setSelectedFaculty(facultyName);
    setValue('faculty', facultyName.nameShort);
    clearErrors('faculty');
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
          className={`justify-between text-wrap relative gap-[5px] p-[10px] overflow-hidden ${avoidCollisions && 'border-white'}`}
        >
          {selectedFaculty ? selectedFaculty?.name : 'Оберіть факультет'}
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
        className={`py-0 px-2 border-none bg-transparent rounded-[10px] w-full max-w-[calc(100vw-40px)] md:max-w-[calc(100vw-80px)] lg:max-w-[calc(100vw-140px)] ${avoidCollisions && 'px-2'}`}
        side="bottom"
        align={avoidCollisions ? 'center' : 'start'}
        avoidCollisions={avoidCollisions}
      >
        <Command className="bg-transparent">
          <CommandInput placeholder="Пошук" />
          <CommandList className="mt-[5px] bg-dark border-white border-[1px] no-scrollbar rounded-b-[10px] max-h-[30vh]">
            <CommandEmpty className="bg-dark p-2 text-m-p md:text-p">
              Факультет не знайдено
            </CommandEmpty>
            <CommandGroup>
              {faculties?.map(faculty => (
                <CommandItem
                  key={faculty.id}
                  value={faculty.name}
                  onSelect={() => handleFacultyChange(faculty)}
                >
                  {faculty.name}
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

export default FacultySelect;
