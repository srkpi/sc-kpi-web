'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { ChevronLeft, User } from 'lucide-react';

import FacultySelect from '@/components/auth/selects/FacultySelect';
import GroupSelect from '@/components/auth/selects/GroupSelect';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';
import useAuth from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useProfileStore } from '@/store/profile-store';
import { IUser } from '@/types/auth/user.interface';
import { IFacultyData } from '@/types/faculty.interface';
import { IGroupData } from '@/types/group.interface';

import { changeDataSchema, ChangeProfileFormData } from './_validation';

const PersonalData = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<IFacultyData>();
  const [selectedGroup, setSelectedGroup] = useState<IGroupData>();
  const { userData, setUserData, isProfileMenuActive, setIsProfileMenuActive } =
    useProfileStore(state => state);
  const { toast } = useToast();
  const { loggedIn } = useAuth();

  const form = useForm<ChangeProfileFormData>({
    resolver: zodResolver(changeDataSchema),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    if (!loggedIn) return;
    const fetchUser = async () => {
      try {
        api.get<IUser>('/user').then(res => {
          setUserData(res.data);
          setSelectedFaculty({ name: res.data.faculty } as IFacultyData);
          setValue('faculty', res.data.faculty);
          setSelectedGroup({ name: res.data.group } as IGroupData);
          setValue('group', res.data.group);
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            variant: 'destructive',
            title: 'Стала помилка при завантаженні даних',
            description: error.response?.data.message || 'Сталася помилка',
          });
        }
      }
    };
    fetchUser();
  }, [setValue, loggedIn, setUserData, toast]);

  const onSubmit = async (data: ChangeProfileFormData) => {
    const isDataChanged =
      data.lastName !== userData?.lastName ||
      data.firstName !== userData?.firstName ||
      data.middleName !== userData?.middleName ||
      data.faculty !== userData?.faculty ||
      data.group !== userData?.group;

    if (!isDataChanged) {
      toast({
        variant: 'default',
        title: 'Зміни не були внесені',
        description: 'Жодні дані не було змінено',
      });
      return;
    }

    try {
      const dto = {
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName || '',
        faculty: data.faculty,
        group: data.group,
      };
      await api.patch('/user', dto);

      toast({
        variant: 'default',
        title: 'Ваші дані успішно оновлено!',
      });
      const userUpdatedData = {
        ...userData,
        ...dto,
        email: userData?.email || '',
        createdAt: userData?.createdAt || '',
      };
      setUserData(userUpdatedData);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Помилка при оновленні даних',
      });
    }
  };

  if (!userData) return null;

  return (
    <div
      className={`w-full max-w-[420px] sm:w-2/3 sm:max-w-[700px] ${isProfileMenuActive && 'hidden'} sm:block`}
    >
      <Form {...form}>
        <h1 className="text-m-h1 font-bold sm:text-h1 flex items-center gap-2 mb-10">
          <button
            className="sm:hidden flex-auto"
            onClick={() => setIsProfileMenuActive(true)}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="block sm:hidden mb-1">
            <User size={21} />
          </div>
          <div className="hidden sm:block">
            <User size={44} />
          </div>
          Персональні дані
        </h1>
        <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 md:mb-6">
            <Input
              {...register('lastName', { required: true })}
              type="text"
              placeholder="Введіть своє прізвище"
              name="lastName"
              defaultValue={userData.lastName}
            />
            {errors.lastName && (
              <span className="text-destructive text-m-p md:text-p">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 w-full gap-3 md:gap-6 mb-3 md:mb-6">
            <div>
              <Input
                {...register('firstName', { required: true })}
                type="text"
                name="firstName"
                placeholder="Введіть своє ім'я"
                defaultValue={userData.firstName}
              />
              {errors.firstName && (
                <span className="text-destructive text-m-p md:text-p">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div>
              <Input
                {...register('middleName', { required: true })}
                type="text"
                name="middleName"
                placeholder="Введіть своє по батькові"
                defaultValue={userData.middleName}
              />
              {errors.middleName && (
                <span className="text-destructive text-m-p md:text-p">
                  {errors.middleName.message}
                </span>
              )}
            </div>
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

export default PersonalData;
