'use client';
import { useCallback, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { KeyRound, Layers, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

import { BreadcrumbItemType, Breadcrumbs } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast/use-toast';
import useAuth from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { useProfileStore } from '@/store/profile-store';
import { User } from '@/types/auth/user';

const BREADCRUMBS_ITEMS: BreadcrumbItemType[] = [
  {
    icon: Layers,
    href: '/',
    label: 'Головна',
  },
  {
    icon: UserIcon,
    href: '/profile',
    label: 'Персональний аккаунт',
  },
];

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dialogDeleteAccountOpen, setDialogDeleteAccountOpen] = useState(false);
  const [errors, setErrors] = useState(null);
  const { userData, setUserData, isProfileMenuActive, setIsProfileMenuActive } =
    useProfileStore(state => state);
  const { loggedIn, logout } = useAuth();

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await api.get<User>('/user');
      setUserData(data);
      setErrors(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors(error.response?.data.message || 'Сталася помилка');
      }
    }
  }, [setUserData]);

  useEffect(() => {
    if (loggedIn) {
      fetchUser();
    }
  }, [loggedIn, setUserData, fetchUser]);

  const handleDeleteUser = async () => {
    try {
      await api.delete('/auth/user');
      toast({
        variant: 'default',
        title: 'Акаунт успішно видалено',
        description: 'Ви будете перенаправлені на головну сторінку',
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Помилка видалення акаунту',
        description: 'Спробуйте ще раз',
      });
    }
  };

  if (errors) {
    return (
      <section className="min-h-[300px] flex justify-center items-center flex-col gap-3">
        <h1 className="text-blue sm:text-[24px] font-bold">
          Упс... Сталася неочікувана помилка
        </h1>
        <p>
          Спробуйте перезавантажити сторінку або зробити запит на дані ще раз
        </p>
        <div className="flex gap-6">
          <Button size="sm" onClick={() => fetchUser()} variant="outline">
            Зробити запит ще раз
          </Button>
          <Button size="sm" variant="outline">
            <Link href="/">Головна</Link>
          </Button>
        </div>
      </section>
    );
  }

  if (!userData) {
    return (
      <section className="min-h-[300px] flex justify-center items-center text-blue font-bold sm:text-[24px]">
        Завантаження персональних даних...
      </section>
    );
  }

  return (
    <section className="_container sm:mt-6 mb-24">
      <div className="w-full flex flex-col md:flex-row md:justify-start md:items-center mb-12">
        <Breadcrumbs items={BREADCRUMBS_ITEMS} />
      </div>
      <div className="flex gap-5 flex-col sm:flex-row items-center sm:items-stretch">
        <div
          className={`flex flex-col gap-[30px] sm:gap-[65px] max-w-[420px] w-full sm:w-1/3 sm:max-h-[430px] min-h-[400px] sm:min-h-[300px] ${!isProfileMenuActive && 'hidden'} sm:flex`}
        >
          <div className="flex gap-5">
            <img
              src="/images/sad-cat.gif"
              alt="sad cat "
              className="rounded-full h-[66px] w-[66px] aspect-square"
            />
            <div>
              <h3 className="font-medium leading-[22px]">
                {userData.lastName}
              </h3>
              <h3 className="leading-[22px]">
                {userData.firstName} {userData.middleName}
              </h3>
              <p className="text-[var(--gray)] leading-[22px]">
                {userData.faculty}, {userData.group}
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-[22px] flex-auto">
            <li>
              <Link
                className="flex items-center gap-2 text-p font-medium"
                onClick={() => setIsProfileMenuActive(false)}
                href="/profile"
              >
                <UserIcon />
                Персональні дані
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 text-p font-medium"
                onClick={() => setIsProfileMenuActive(false)}
                href="/profile/change-password"
              >
                <KeyRound />
                Змінити пароль
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-6">
            <Button
              className="sm:hidden"
              variant="outline"
              onClick={() => logout()}
              size="sm"
            >
              Вийти
            </Button>
            <Dialog
              open={dialogDeleteAccountOpen}
              onOpenChange={state => setDialogDeleteAccountOpen(state)}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  className="sm:self-start px-12"
                >
                  Видалити акаунт
                </Button>
              </DialogTrigger>
              <DialogContent className="pt-[42px] px-[42px] pb-[20px] sm:px-[72px] sm:pt-[72px] sm:pb-[55px] flex items-center gap-[25px] sm:gap-[47px] justify-center flex-col sm:min-w-[608px] border-none max-w-[calc(100vw-50px)] sm:w-auto rounded-xl">
                <DialogTitle className="text-destructive">
                  <h1 className="font-m-h1 sm:font-h1 text-center">
                    Ви впевнені, що хочете видалити аккаунт?
                  </h1>
                </DialogTitle>
                <DialogFooter className="flex gap-6 flex-row">
                  <Button
                    size="sm"
                    onClick={handleDeleteUser}
                    type="submit"
                    variant="destructive"
                    className="py-2 px-8 font-regular"
                  >
                    Видалити
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setDialogDeleteAccountOpen(false)}
                    className="py-2 px-8 font-regular"
                  >
                    Відмінити
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
