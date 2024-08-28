'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import FacultySelect from '@/components/auth/selects/FacultySelect';
import GroupSelect from '@/components/auth/selects/GroupSelect';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';
import useAuth from '@/hooks/useAuth';
import { IFacultyData } from '@/types/faculty.interface';
import { IGroupData } from '@/types/group.interface';

import { RegisterFormData, registerSchema } from './validation';

const RegisterPage = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<IFacultyData>();
  const [selectedGroup, setSelectedGroup] = useState<IGroupData>();
  const { register: registerAuth } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = form;

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
          toast({
            variant: 'destructive',
            title: 'Трапилась помилка',
            description: error,
          });
          break;
      }
      return;
    }
    router.push('/');
    toast({
      title: 'Ви успішно зареєструвалися',
    });
  };

  return (
    <>
      <div className="w-full md:w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] my-[60px] flex items-center justify-center">
        <div className="flex items-center justify-center max-w-[450px] md:max-w-[580px] flex-col w-full">
          <Form {...form}>
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
                    className={`${errors.email && 'border-destructive focus-visible:border-destructive'}`}
                  />
                  {errors.email && (
                    <span className="text-destructive text-m-p md:text-p">
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
                    className={`${errors.lastName && 'border-destructive focus-visible:border-destructive'}`}
                  />
                  {errors.lastName && (
                    <span className="text-destructive text-m-p md:text-p">
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
                      className={` ${errors.firstName && 'border-destructive focus-visible:border-destructive'}`}
                    />
                    {errors.firstName && (
                      <span className="text-destructive text-m-p md:text-p">
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
                      className={`${errors.middleName && 'border-destructive focus-visible:border-destructive'}`}
                    />
                    {errors.middleName && (
                      <span className="text-destructive text-m-p md:text-p">
                        {errors.middleName.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 md:gap-3 lg:gap-5 flex-nowrap md:flex-wrap xl:flex-nowrap">
                  <div className="flex flex-col gap-1 w-[calc(50%-4px)] md:w-full xl:w-[calc(50%-10px)]">
                    <FacultySelect
                      setValue={setValue}
                      setSelectedFaculty={setSelectedFaculty}
                      selectedFaculty={selectedFaculty}
                      register={register}
                      clearErrors={form.clearErrors}
                    />
                    {errors.faculty && (
                      <span className="text-destructive text-m-p md:text-p">
                        {errors.faculty.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-[calc(50%-4px)] md:w-full xl:w-[calc(50%-10px)]">
                    <GroupSelect
                      setValue={setValue}
                      selectedFaculty={selectedFaculty}
                      selectedGroup={selectedGroup}
                      setSelectedGroup={setSelectedGroup}
                      register={register}
                      clearErrors={form.clearErrors}
                    />
                    {errors.group && (
                      <span className="text-destructive text-m-p md:text-p">
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
                    className={`${errors.password && 'border-destructive focus-visible:border-destructive'} select-none`}
                  />
                  {errors.password && (
                    <span className="text-destructive text-m-p md:text-p">
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
                    className={`${errors.password && 'border-destructive focus-visible:border-destructive'} select-none`}
                  />
                  {errors.confirmPassword && (
                    <span className="text-destructive text-m-p md:text-p">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <div className="flex flex-col gap-1 w-full mb-5 lg:mb-10">
                      <FormItem className="flex flex-row items-center space-y-0 gap-2 md:gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel
                          className={`font-normal ${errors.terms && 'text-destructive'}`}
                        >
                          <span className="text-m-p md:text-p">
                            Даю згоду на обробку персональних даних
                          </span>
                        </FormLabel>
                      </FormItem>
                      {errors.terms && (
                        <span className="text-destructive text-m-p md:text-p">
                          {errors.terms.message}
                        </span>
                      )}
                    </div>
                  )}
                />
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
          </Form>
        </div>
      </div>
      <div className="w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] hidden md:flex items-center justify-center fixed right-0 min-h-screen-dvh">
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
