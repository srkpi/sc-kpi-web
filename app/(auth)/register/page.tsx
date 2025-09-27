'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { signUp } from '@/app/actions/auth.actions';
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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';
import { Faculty } from '@/types/faculty';
import { Group } from '@/types/group';

import { RegisterFormData, registerSchema } from './_validation';

const RegisterPage = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty>();
  const [selectedGroup, setSelectedGroup] = useState<Group>();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      group: '',
      faculty: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  const [submitError, setSubmitError] = useState<string | null>(null);
  const onSubmit = async (data: RegisterFormData) => {
    setSubmitError(null);
    try {
      await signUp(data);
      toast({
        title: 'Ви успішно зареєструвалися',
      });
      router.push('/profile/personal-data');
    } catch (error) {
      const e = error as Error;
      setSubmitError(e.message || 'Сталася помилка. Спробуйте ще раз.');
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] my-[60px] flex items-center justify-center">
        <div className="flex items-center justify-center max-w-[450px] md:max-w-[580px] flex-col w-full">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold mb-5 lg:mb-10 text-center">
            Ласкаво просимо
          </h2>
          <Form {...form}>
            <form
              className="flex flex-col w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2 md:gap-3 lg:gap-5 mb-2 md:mb-3.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Пошта" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Прізвище" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 md:gap-3 lg:gap-5 flex-nowrap md:flex-wrap xl:flex-nowrap">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder="Ім'я" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder="По батькові" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2 md:gap-3 lg:gap-5 flex-nowrap md:flex-wrap xl:flex-nowrap">
                  <div className="flex flex-col gap-1 w-[calc(50%-4px)] md:w-full xl:w-[calc(50%-10px)]">
                    <FacultySelect
                      setValue={setValue}
                      setSelectedFaculty={setSelectedFaculty}
                      selectedFaculty={selectedFaculty}
                      registerProps={register('faculty')}
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
                      registerProps={register('group')}
                      clearErrors={form.clearErrors}
                    />
                    {errors.group && (
                      <span className="text-destructive text-m-p md:text-p">
                        {errors.group.message}
                      </span>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Пароль"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Підтвердіть пароль"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <FormLabel className="text-m-p md:text-p">
                          Даю згоду на обробку персональних даних
                        </FormLabel>
                      </FormItem>
                      <FormMessage />
                    </div>
                  )}
                />
                {submitError && (
                  <div className="text-destructive text-center mb-2 text-m-p md:text-p">
                    {submitError}
                  </div>
                )}
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
            Увідіть в акаунт. Тут ви зможете переглянути студентські об'єднання
            та опис до них
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
