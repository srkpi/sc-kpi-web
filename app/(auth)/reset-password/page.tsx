'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { recoveryPassword } from '@/lib/api/api.auth';

import { ResetPasswordFormData, resetPasswordSchema } from './_validation';

const ResetPassword = () => {
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const { error, success } = await recoveryPassword(data.email);
    if (error && !success) {
      switch (error) {
        case 'Request failed with status code 429':
        case 'Suspicious activity has been detected. Please try again later':
          setError('email', {
            type: 'manual',
            message: 'Забагато запитів. Спробуйте пізніше',
          });
          break;
        default:
          setError('email', {
            type: 'manual',
            message: error,
          });
          break;
      }
      return;
    } else {
      setIsShowSuccess(true);
    }
  };
  return (
    <>
      <div className="w-full md:w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] my-[70px] flex items-center justify-center">
        <div className="flex items-center justify-center max-w-[450px] md:max-w-[580px] flex-col w-full">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold text-center mb-2 md:mb-5">
            Відновити пароль
          </h2>
          {!isShowSuccess && (
            <p className="mb-5 md:mb-10 text-m-p md:text-p text-center">
              Введіть адресу електронної пошти, пов'язану з вашим обліковим
              записом. Та вам надійде повідомлення з паролем, і ви зможете його
              скинути
            </p>
          )}
          <form
            className="flex flex-col w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {isShowSuccess ? (
              <div className="w-full border-[1px] border-blue p-3 md:p-5 rounded-[10px] mb-5">
                <h4 className="font-p text-center relative">
                  Вам на пошту має надійти форма для зміни паролю
                </h4>
              </div>
            ) : (
              <div className="flex flex-col gap-5 mb-5 md:mb-10">
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="Пошта"
                    className={`${errors.email && 'border-destructive focus-visible:border-destructive'}`}
                  />
                  {errors.email && (
                    <span className="text-destructive text-m-p md:text-p">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>
            )}
            <Button
              className="py-2 md:py-4"
              disabled={isSubmitting || isShowSuccess}
              type="submit"
            >
              Відправити
            </Button>
            <p className="text-m-p font-light text-center md:hidden mt-[10px] select-none">
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
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold text-center mb-5">
            Повернутися до входу
          </h2>
          <p className="mb-5 md:mb-10 text-m-p md:text-p">
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
