'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';
import useAuth from '@/hooks/useAuth';
import { forgetMe, getRememberedEmail, rememberMe } from '@/lib/utils/auth';

import { LoginFormData, loginSchema } from './_validation';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isRememberMe, setIsRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const dto = {
      email: data.email,
      password: data.password,
    };
    const { error, success } = await login(dto);
    if (error && !success) {
      switch (error) {
        case 'Unauthorized':
          setError('password', {
            type: 'manual',
            message: 'Неправильний логін або пароль',
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
    isRememberMe ? rememberMe(data.email) : forgetMe();
    router.push('/');
    toast({
      title: 'Ви успішно увійшли до системи',
    });
  };

  return (
    <>
      <div className="hidden md:flex items-center justify-center md:w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] my-[70px]">
        <div className="flex flex-col items-center text-center justify-center h-full">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold mb-5 text-center">
            Немає облікового запису?
          </h2>
          <p className="mb-5 md:mb-10 text-m-p md:text-p">
            Приєднуйтесь до сайту студради! Тут ви зможете переглянути та
            імпортувати розклад, переглянути студентські об'єднання та опис до
            них
          </p>
          <Link className="self-stretch" href="/register">
            <Button className="min-w-[200px] max-w-[580px] w-full bg-dark border-dark py-2 md:py-4">
              Зареєструватися
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] my-[70px] flex items-center justify-center">
        <div className="flex items-center justify-center max-w-[450px] md:max-w-[580px] flex-col w-full">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold mb-5 lg:mb-10 text-center">
            З Поверненням
          </h2>
          <form
            className="flex flex-col w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2 md:gap-3 lg:gap-5 mb-2 md:mb-3.5">
              <div className="flex flex-col gap-1 w-full">
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Пошта"
                  defaultValue={getRememberedEmail() ?? ''}
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
                  {...register('password')}
                  type="password"
                  placeholder="Пароль"
                  className={`${errors.password && 'border-destructive focus-visible:border-destructive'}`}
                />
                {errors.password && (
                  <span className="text-destructive text-m-p md:text-p">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mb-5 lg:mb-10">
              <label
                htmlFor="remember"
                className="flex items-center gap-3 cursor-pointer select-none"
              >
                <Checkbox
                  id="remember"
                  defaultChecked={isRememberMe}
                  onCheckedChange={(value: boolean) => setIsRememberMe(value)}
                />
                <span className="text-m-p font-light">Запам'ятати мене</span>
              </label>
              <Link className="text-m-p font-light" href="/reset-password">
                Забули пароль?
              </Link>
            </div>
            <Button
              className="py-2 md:py-4"
              disabled={isSubmitting}
              type="submit"
            >
              Увійти
            </Button>
            <p className="text-m-p font-light text-center md:hidden mt-[10px] select-none">
              Немає акаунту?{' '}
              <Link
                className="hover:text-[#99a5fc] transition"
                href="/register"
              >
                Зареєструватися
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
