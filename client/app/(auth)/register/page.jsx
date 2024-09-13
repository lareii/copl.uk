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
import { register } from '@/lib/api/auth';

const formSchema = z
  .object({
    email: z.string().email('geçerli bir e-posta adresi girin.'),
    display_name: z
      .string()
      .min(1, 'görünen isminiz 1-25 karakter uzunluğunda olmalıdır.')
      .max(25, 'görünen isminiz 1-25 karakter uzunluğunda olmalıdır.'),
    username: z
      .string()
      .min(1, 'kullanıcı adınız 3-25 karakter uzunluğunda olmalıdır.')
      .max(25, 'kullanıcı adınız 3-25 karakter uzunluğunda olmalıdır.')
      .regex(
        /^[a-zA-Z0-9._]+$/,
        'kullanıcı adınız sadece harf, rakam, nokta ve alt çizgi içerebilir.'
      ),
    password: z
      .string()
      .min(8, 'parolanız 8-50 karakter uzunluğunda olmalıdır.')
      .max(50, 'parolanız 8-50 karakter uzunluğunda olmalıdır.'),
    passwordConfirmation: z.string()
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'parolalar eşleşmiyor',
    path: ['passwordConfirmation']
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

    const response = await register({
      email: values.email,
      display_name: values.display_name,
      username: values.username,
      password: values.password
    });

    if (!response) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description: 'bir hata oluştu. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    }
    if (response.status === 409) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description: 'bu e-posta adresi veya kullanıcı adı zaten kullanımda.',
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    router.push('/login');
    router.refresh();
  }

  return (
    <div className='flex max-md:flex-col justify-between items-start gap-5 h-full'>
      <div className='basis-1/2 mt-10'>
        <div className='text-2xl font-bold'>kayıt olun</div>
        <div className='text-sm'>
          copl.uk{"'"}e katılmak için lütfen bilgilerinizi girin.
        </div>
        <div className='text-muted-foreground text-xs mt-5'>
          hali hazırda bir hesabın var mı?{' '}
          <Link href='/login' className='underline'>
            giriş yap
          </Link>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='basis-1/2 flex flex-col gap-y-5 justify-center w-full h-full'
        >
          <div className='flex flex-col gap-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>e-posta</FormLabel>
                  <FormControl>
                    <Input placeholder='copcu1337@copl.uk' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-x-2'>
              <FormField
                control={form.control}
                name='display_name'
                render={({ field }) => (
                  <FormItem className='space-y-1 w-full'>
                    <FormLabel>görünen isim</FormLabel>
                    <FormControl>
                      <Input placeholder='çöpçü' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='space-y-1 w-full'>
                    <FormLabel>kullanıcı adı</FormLabel>
                    <FormControl>
                      <Input placeholder='copcu1337' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-x-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='space-y-1 w-full'>
                    <FormLabel>parola</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='passwordConfirmation'
                render={({ field }) => (
                  <FormItem className='space-y-1 w-full'>
                    <FormLabel>parola tekrarı</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting && (
              <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
            )}
            kayıt oluyorum
          </Button>
        </form>
      </Form>
    </div>
  );
}
