'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { ChevronLeft, KeyRoundIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast/use-toast';
import useAuth from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useProfileStore } from '@/store/profile-store';

import { ChangePasswordFormData, changePasswordSchema } from './_validation';

const ChangePassword = () => {
  const { loggedIn } = useAuth();
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });
  const isProfileMenuActive = useProfileStore(
    state => state.isProfileMenuActive,
  );
  const setIsProfileMenuActive = useProfileStore(
    state => state.setIsProfileMenuActive,
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!loggedIn) return;
    const dto = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    const changePassword = async () => {
      try {
        await api.put('/auth/password', dto);

        toast({
          variant: 'default',
          title: 'Пароль було успішно змінено',
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 403) {
            setError('oldPassword', {
              type: 'manual',
              message: 'Неправильний старий пароль',
            });
          } else if (
            error.response?.data.message === 'New password should be different'
          ) {
            setError('newPassword', {
              type: 'manual',
              message: 'Новий пароль повинен відрізнятися від старого',
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Помилка зміни паролю',
            });
          }
        }
      }
    };
    changePassword();
  };

  return (
    <div
      className={`w-full max-w-[420px] sm:w-2/3 sm:max-w-[700px] ${isProfileMenuActive && 'hidden'} sm:block`}
    >
      <Form {...form}>
        <h1 className="text-m-h1 font-bold sm:text-h1 flex items-center gap-2 mb-10">
          <Link
            className="sm:hidden flex-auto"
            onClick={() => setIsProfileMenuActive(true)}
            href="/profile"
          >
            <ChevronLeft size={24} />
          </Link>
          <div className="block sm:hidden mb-1">
            <KeyRoundIcon size={21} />
          </div>
          <div className="hidden sm:block">
            <KeyRoundIcon size={44} />
          </div>
          Змінити пароль
        </h1>
        <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 md:mb-6">
            <Label
              className="font-regular mb-[7px] inline-block"
              htmlFor="oldPassword"
            >
              Старий пароль
            </Label>
            <Input
              {...register('oldPassword', { required: true })}
              type="password"
              name="oldPassword"
              id="oldPassword"
            />
            {errors.oldPassword && (
              <span className="text-destructive text-m-p md:text-p">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div className="mb-3 md:mb-6">
            <Label
              className="font-regular mb-[7px] inline-block"
              htmlFor="newPassword"
            >
              Новий пароль
            </Label>
            <Input
              {...register('newPassword', { required: true })}
              type="password"
              name="newPassword"
              id="newPassword"
            />
            {errors.newPassword && (
              <span className="text-destructive text-m-p md:text-p">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="mb-[46px]">
            <Label
              className="font-regular mb-[7px] inline-block"
              htmlFor="newPassword"
            >
              Підтвердити пароль
            </Label>
            <Input
              {...register('confirmPassword', { required: true })}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
            {errors.confirmPassword && (
              <span className="text-destructive text-m-p md:text-p">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <Button
            className="w-full sm:w-auto"
            type="submit"
            size="sm"
            disabled={isSubmitting}
          >
            Зберегти
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;