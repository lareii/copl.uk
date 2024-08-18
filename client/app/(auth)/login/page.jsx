'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { login } from '@/lib/api/auth';

const formSchema = z.object({
  username: z.string().min(1, 'kullanıcı adı boş bırakılamaz'),
  password: z.string().min(1, 'şifre boş bırakılamaz'),
});

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    const response = await login(values.username, values.password);

    if (!response) {
      toast({
        title: 'Hay aksi, bir şeyler ters gitti!',
        description: 'Sunucudan yanıt alınamadı. Lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      return;
    }

    if (response.status === 200) {
      router.push('/app');
      router.refresh();
    } else if (response.status === 401) {
      toast({
        title: 'Hay aksi, bir şeyler ters gitti!',
        description: 'Kullanıcı adı veya şifre yanlış.',
        duration: 3000
      });
    } else {
      toast({
        title: 'Hay aksi, bir şeyler ters gitti!',
        description: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
    }
  }

  return (
    <>
      <div className='flex max-sm:flex-col justify-between items-start gap-10'>
        <div className='basis-1/2'>
          <div className='text-2xl font-bold'>oturum açın</div>
          <div className='text-sm'>
            çöplüğe giriş yapmak için lütfen bilgilerinizi girin.
          </div>
          <div className='text-muted-foreground text-xs mt-5'>
            henüz bir hesabın yok mu? {' '}
            <Link href='/register' className='underline'>
              yeni bir tane oluştur!
            </Link>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-y-5 basis-1/2 w-full'
          >
            <div className='flex flex-col gap-y-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>kullanıcı adı</FormLabel>
                    <FormControl>
                      <Input placeholder='copcu1337' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>şifre</FormLabel>
                    <FormControl>
                      <Input type='password' className='text-xs' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              giriş yapıyorum
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}