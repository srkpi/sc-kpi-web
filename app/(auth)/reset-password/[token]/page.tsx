'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { resetPassword } from '@/app/actions/auth.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';

import { ResetPasswordFormData, resetPasswordSchema } from './_validation';

const ResetPassword = () => {
  const { token } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const onSubmit = async (data: ResetPasswordFormData) => {
    const validToken = token instanceof Array ? token[0] : token;
    try {
      await resetPassword({
        newPassword: data.password,
        token: validToken || '',
      });

      router.push('/login');
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Сталася помилка',
      });
    }
  };
  return (
    <>
      <div className="w-full md:w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] my-[70px] flex items-center justify-center">
        <div className="flex items-center justify-center max-w-[450px] md:max-w-[580px] flex-col w-full">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold text-center mb-2 md:mb-5">
            Відновити пароль
          </h2>
          <p className="mb-5 md:mb-10 text-m-p md:text-p text-center">
            Введіть новий пароль та підтвердіть його
          </p>
          <form
            className="flex flex-col gap-2 md:gap-3 lg:gap-5 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1 w-full">
              <Input
                {...register('password', { required: true })}
                type="password"
                name="password"
                placeholder="Пароль"
                className={`${errors.password && 'border-destructive focus-visible:border-destructive'}`}
              />
              {errors.password && (
                <span className="text-destructive text-m-p md:text-p">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full mb-2">
              <Input
                {...register('confirmPassword', { required: true })}
                type="password"
                name="confirmPassword"
                placeholder="Підтвердіть пароль"
                className={`${errors.password && 'border-destructive focus-visible:border-destructive'}`}
              />
              {errors.confirmPassword && (
                <span className="text-destructive text-m-p md:text-p">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button
              className="py-2 md:py-4"
              disabled={isSubmitting}
              type="submit"
            >
              Відправити
            </Button>
            <p className="text-m-p font-light text-center md:hidden select-none">
              Пам’ятаєте пароль?{' '}
              <Link className="hover:text-[#99a5fc] transition" href="/login">
                Увійти
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden md:block w-1/2 h-auto p-[70px]">
        <div className="flex flex-col items-center text-center justify-center h-full">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold text-center mb-2 md:mb-5">
            Повернутися до входу
          </h2>
          <p className="mb-5 md:mb-10 text-m-p md:text-p text-center">
            Якщо ви пам’ятаєте пароль - поверніться до сторінки входу
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

export default ResetPassword;
