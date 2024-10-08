'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { login } from '@/lib/api/auth';

const formSchema = z.object({
  username: z
    .string({ required_error: 'kullanıcı adı boş bırakılamaz.' })
    .min(3, 'kullanıcı adınız 3–25 karakter uzunluğunda olmalıdır.')
    .max(25, 'kullanıcı adınız 3-25 karakter uzunluğunda olmalıdır.')
    .regex(
      /^[a-zA-Z0-9._]+$/,
      'kullanıcı adınız sadece harf, rakam, nokta ve alt çizgi içerebilir.'
    ),
  password: z
    .string({ required_error: 'parola boş bırakılamaz.' })
    .min(8, 'parolanız 8-50 karakter uzunluğunda olmalıdır.')
    .max(50, 'parolanız 8-50 karakter uzunluğunda olmalıdır.')
});

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    const response = await login(values.username, values.password);
    if (!response) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description: 'bir hata oluştu. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    }
    if (response.status === 401) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description: 'kullanıcı adı veya parola yanlış.',
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.push('/app');
    router.refresh();
  }

  return (
    <div className='flex max-md:flex-col justify-between items-start gap-5 h-full'>
      <div className='basis-1/2 mt-10'>
        <div className='text-2xl font-bold'>oturum açın</div>
        <div className='text-sm'>
          copl.uk&apos;e giriş yapmak için lütfen bilgilerinizi girin.
        </div>
        <div className='text-muted-foreground text-xs mt-5'>
          henüz bir hesabın yok mu?{' '}
          <Link href='/register' className='underline'>
            yeni bir tane oluştur!
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='basis-1/2 py-10 flex flex-col justify-center gap-y-5 w-full h-full'
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
                  <FormLabel>parola</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting && (
              <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
            )}
            giriş yap
          </Button>
        </form>
      </Form>
    </div>
  );
}
