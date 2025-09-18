'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { login } from '@/app/actions/auth.actions';
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

const loginSchema = z.object({
  email: z.string().email('Некоректна пошта'),
  password: z.string().min(8, 'Пароль має містити не менше 8 символів'),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const success = await login(data.email, data.password, data.rememberMe);
      if (success) {
        router.push('/profile/personal-data');
      } else {
        toast({
          title: 'Помилка входу',
          variant: 'destructive',
        });
      }
      router.push('/profile');
    } catch (error) {
      switch (error) {
        case 'Unauthorized':
          form.setError('password', {
            type: 'manual',
            message: 'Неправильний логін або пароль',
          });
          break;
        default:
          form.setError('password', {
            type: 'manual',
            message: 'Трапилась помилка',
          });
          break;
      }
      return;
    }
  };

  return (
    <>
      <div className="hidden md:flex items-center justify-center md:w-1/2 h-auto p-[20px] md:p-[40px] lg:p-[70px] my-[70px]">
        <div className="flex flex-col items-center text-center justify-center h-full">
          <h2 className="text-m-h1 md:text-h3 lg:text-h1 font-semibold mb-5 text-center">
            Немає облікового запису?
          </h2>
          <p className="mb-5 md:mb-10 text-m-p md:text-p">
            Приєднуйтесь до сайту студради! Тут ви зможетепереглянути
            студентські об'єднання та опис до них
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
            З Поверненням!
          </h2>
          <Form {...form}>
            <form
              className="flex flex-col w-full"
              onSubmit={form.handleSubmit(onSubmit)}
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
              </div>
              <div className="flex justify-between items-center mb-5 lg:mb-10">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 gap-2 md:gap-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-m-p md:text-p">
                        Запам'ятати мене
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link className="text-m-p font-light" href="/reset-password">
                  Забули пароль?
                </Link>
              </div>
              <Button
                className="py-2 md:py-4"
                disabled={form.formState.isSubmitting}
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
          </Form>
        </div>
      </div>
    </>
  );
}
