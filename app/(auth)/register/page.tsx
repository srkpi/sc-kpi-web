'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAuth from '@/hooks/useAuth';
import { fetcher } from '@/lib/swr/fetcher';
import { IFacultyData } from '@/types/faculty.interface';
import { IGroupData, IGroupsResponse } from '@/types/group.interface';

import { RegisterFormData, registerSchema } from './validation';

const RegisterPage = () => {
  const [groups, setGroups] = useState<IGroupData[]>([]);
  const [generalError, setGeneralError] = useState<null | string>(null);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const { register: registerAuth } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { data: faculties } = useSWR<IFacultyData[]>(
    'https://api.campus.kpi.ua/subdivision/faculty',
    fetcher,
    {
      fallbackData: [],
      revalidateOnFocus: false,
    },
  );
  const { data: allGroups } = useSWR<IGroupsResponse>(
    ['https://api.campus.kpi.ua/schedule/groups'],
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    const filteredGroups =
      allGroups?.data.filter(group => group.faculty === selectedFaculty) || [];

    setGroups(filteredGroups);
  }, [selectedFaculty, allGroups]);

  const handleFacultyChange = (facultyName: string) => {
    setSelectedFaculty(facultyName);
    setValue('faculty', facultyName);
  };

  const handleGroupChange = (groupName: string) => {
    setValue('group', groupName);
  };

  const onSubmit = async (data: RegisterFormData) => {
    const dto = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      faculty: data.faculty,
      group: data.group,
      ...(data.middleName && { middleName: data.middleName }),
    };

    const { error, success } = await registerAuth(dto);
    if (!success && error) {
      switch (error) {
        case 'User with this email already exists':
          setError('email', {
            type: 'manual',
            message: 'Користувач з такою поштою вже існує',
          });
          break;
        case 'password is not strong enough':
          setError('password', {
            type: 'manual',
            message: 'Пароль не достатньо надійний',
          });
          break;
        default:
          setGeneralError(error);
          break;
      }
      return;
    }
    router.push('/');
  };

  return (
    <>
      <div className="w-full md:w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] my-[70px] flex items-center justify-center">
        <div className="flex items-center justify-center max-w-[450px] md:max-w-[580px] flex-col w-full">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold mb-5 lg:mb-10 text-center">
            Ласкаво просимо
          </h2>
          <form
            className="flex flex-col w-full"
            method="POST"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-5 mb-2 md:mb-3.5">
              <div className="flex flex-col gap-1 w-full">
                <Input
                  {...register('email', { required: true })}
                  type="email"
                  name="email"
                  placeholder="Пошта"
                  className={`${errors.email && 'border-red-500 focus-visible:border-red-500'}`}
                />
                {errors.email && (
                  <span className="text-red-500 text-m-p md:text-p">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Input
                  {...register('lastName', { required: true })}
                  type="text"
                  name="lastName"
                  placeholder="Прізвище"
                  className={`${errors.lastName && 'border-red-500 focus-visible:border-red-500'}`}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-m-p md:text-p">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
              <div className="flex gap-2  md:gap-3 lg:gap-5 flex-nowrap md:flex-wrap xl:flex-nowrap">
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    {...register('firstName', { required: true })}
                    type="text"
                    name="firstName"
                    placeholder="Ім'я"
                    className={` ${errors.firstName && 'border-red-500 focus-visible:border-red-500'}`}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-m-p md:text-p">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    {...register('middleName', { required: true })}
                    type="text"
                    name="middleName"
                    placeholder="По батькові"
                    className={`${errors.middleName && 'border-red-500 focus-visible:border-red-500'}`}
                  />
                  {errors.middleName && (
                    <span className="text-red-500 text-m-p md:text-p">
                      {errors.middleName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 md:gap-3 lg:gap-5 flex-nowrap md:flex-wrap xl:flex-nowrap">
                <div className="flex flex-col gap-1 w-full">
                  <Select onValueChange={handleFacultyChange}>
                    <SelectTrigger className="text-m-p md:text-p leading-[14px] md:leading-[16px] p-3 md:px-[23px] md:py-[22px] rounded-[10px] min-h-[40px] md:min-h-[65px] bg-dark">
                      <SelectValue placeholder="Факультет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {faculties?.map(faculty => (
                          <SelectItem
                            key={faculty.id}
                            value={faculty.nameShort}
                          >
                            {faculty.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.faculty && (
                    <span className="text-red-500 text-m-p md:text-p">
                      {errors.faculty.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <Select onValueChange={handleGroupChange}>
                    <SelectTrigger className="text-m-p md:text-p leading-[14px] md:leading-[16px] p-3 md:px-[23px] md:py-[22px] rounded-[10px] min-h-[40px] md:min-h-[65px] bg-dark">
                      <SelectValue placeholder="Група" />
                    </SelectTrigger>
                    <SelectContent>
                      {!groups.length ? (
                        <div className="text-m-p md:text-p leading-[14px] md:leading-[16px] p-2 md:px-5 md:py-4">
                          Спершу оберіть факультет
                        </div>
                      ) : (
                        <SelectGroup>
                          {groups.map(group => (
                            <SelectItem key={group.id} value={group.name}>
                              {group.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.group && (
                    <span className="text-red-500 text-m-p md:text-p">
                      {errors.group.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Input
                  {...register('password', { required: true })}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  className={`${errors.password && 'border-red-500 focus-visible:border-red-500'}`}
                />
                {errors.password && (
                  <span className="text-red-500 text-m-p md:text-p">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Input
                  {...register('confirmPassword', { required: true })}
                  type="password"
                  name="confirmPassword"
                  placeholder="Підтвердіть пароль"
                  className={`${errors.password && 'border-red-500 focus-visible:border-red-500'}`}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-m-p md:text-p">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              {generalError && (
                <span className="text-red-500 text-m-p md:text-p">
                  {generalError}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center mb-5 lg:mb-10">
              <label
                htmlFor="remember"
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <Checkbox id="remember" />
                <span className="text-m-p font-light">Запам'ятати мене</span>
              </label>
            </div>
            <Button
              className="py-2 md:py-4"
              disabled={isSubmitting}
              type="submit"
            >
              Зареєструватися
            </Button>
            <p className="text-m-p font-light text-center md:hidden mt-[10px] select-none">
              Вже маєте обліковий запис?{' '}
              <Link className="hover:text-[#99a5fc] transition" href="/login">
                Увійти
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] hidden md:flex items-center justify-center fixed right-0 min-h-[100vh]">
        <div className="flex flex-col items-center text-center justify-center h-full max-w-[580px]  w-full">
          <h2 className="mb-3 md:mb-5 text-m-h1 md:text-h3 lg:text-h1 font-semibold">
            Вже маєте обліковий запис?
          </h2>
          <p className="mb-5 md:mb-10 text-m-p md:text-p">
            Увідіть в акаунт. Тут ви зможете переглянути та завантажити розклад,
            переглянути гуртки та опис до них
          </p>
          <Link className="self-stretch" href="/login">
            <Button className="min-w-[200px] max-w-[580px] w-full bg-dark border-dark py-2 md:py-4">
              Увійти
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
