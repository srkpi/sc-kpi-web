'use client';
import { useState } from 'react';
import { KeyRound, User as UserIcon } from 'lucide-react';
import Link from 'next/link';

import { deleteUser, logout } from '@/app/[locale]/actions/auth.actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast/use-toast';
import { useProfileStore } from '@/store/profile-store';
import { User } from '@/types/auth/user';

interface Props {
  user: User | null;
}

export function Sidebar({ user }: Props) {
  const [dialogDeleteAccountOpen, setDialogDeleteAccountOpen] = useState(false);
  const { isProfileMenuActive, setIsProfileMenuActive } = useProfileStore(
    state => state,
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Помилка виходу з акаунту',
        description: 'Спробуйте ще раз',
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Помилка видалення акаунту',
        description: 'Спробуйте ще раз',
      });
    }
  };

  return (
    <div
      className={`flex flex-col gap-[30px] sm:gap-[65px] max-w-full md:max-w-[240px] w-full sm:w-1/3 sm:max-h-[430px] min-h-[400px] sm:min-h-[300px] ${!isProfileMenuActive && 'hidden'} sm:flex`}
    >
      <div className="flex gap-5">
        <img
          src="/images/sad-cat.gif"
          alt="sad cat"
          className="rounded-full h-[66px] w-[66px] aspect-square"
        />
        <div>
          <h3 className="font-medium leading-[22px]">{user?.lastName}</h3>
          <h3 className="leading-[22px]">
            {user?.firstName} {user?.middleName}
          </h3>
          <p className="text-[var(--gray)] leading-[22px]">
            {user?.faculty}, {user?.group}
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
          variant="outline"
          className="w-full"
          onClick={handleLogout}
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
              className="sm:self-start w-full px-12"
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
  );
}
