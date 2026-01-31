'use client';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, User as UserIcon } from 'lucide-react';

import FacultySelect from '@/components/auth/selects/FacultySelect';
import GroupSelect from '@/components/auth/selects/GroupSelect';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { useProfileStore } from '@/store/profile-store';
import { User } from '@/types/auth/user';
import { Faculty } from '@/types/faculty';
import { Group } from '@/types/group';

import { changeDataSchema, ChangeProfileFormData } from '../_validation';

interface Props {
  user: User | null;
}

export const PersonalPage: FC<Props> = ({ user }) => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | undefined>(
    user?.faculty ? { id: 0, name: user.faculty } : undefined,
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(
    user?.group
      ? { id: '', name: user.group, faculty: user.faculty || '' }
      : undefined,
  );
  const { isProfileMenuActive, setIsProfileMenuActive } = useProfileStore(
    state => state,
  );
  const { toast } = useToast();

  const form = useForm<ChangeProfileFormData>({
    resolver: zodResolver(changeDataSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      middleName: user?.middleName,
      faculty: user?.faculty,
      group: user?.group,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ChangeProfileFormData) => {
    try {
      await api.patch('/user', data);

      toast({
        variant: 'default',
        title: 'Ваші дані успішно оновлено!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Помилка при оновленні даних',
      });
    }
  };

  return (
    <div
      className={`w-full max-w-[420px] sm:w-2/3 sm:max-w-[700px] ${isProfileMenuActive && 'hidden'} sm:block`}
    >
      <div className="flex items-center justify-between">
        <button
          className="sm:hidden w-fit"
          onClick={() => setIsProfileMenuActive(true)}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
          <UserIcon className="sm:hidden" size={21} />
          <UserIcon className="hidden sm:block" size={44} />
          <h1 className="text-m-h1 font-bold sm:text-h1 flex items-center gap-2 ">
            Персональні дані
          </h1>
        </div>
      </div>
      <Form {...form}>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 md:mb-6">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Введіть своє прізвище" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-3 md:gap-6 mb-3 md:mb-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Введіть своє ім'я" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Введіть своє по батькові" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3 md:gap-6 mb-[50px]">
            <div className="flex flex-auto flex-col gap-1">
              <FacultySelect
                setValue={setValue}
                setSelectedFaculty={setSelectedFaculty}
                selectedFaculty={selectedFaculty}
                registerProps={register('faculty')}
                clearErrors={form.clearErrors}
                avoidCollisions={true}
              />
              {errors.faculty && (
                <span className="text-destructive text-m-p md:text-p">
                  {errors.faculty.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 min-w-[164px]">
              <GroupSelect
                setValue={setValue}
                selectedFaculty={selectedFaculty}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                registerProps={register('group')}
                clearErrors={form.clearErrors}
                avoidCollisions={true}
              />
              {errors.group && (
                <span className="text-destructive text-m-p md:text-p">
                  {errors.group.message}
                </span>
              )}
            </div>
          </div>
          <Button
            className="w-full sm:w-auto"
            type="submit"
            size="sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Оновлення' : 'Зберегти'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
