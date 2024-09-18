'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoaderCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Avatar from '@/components/app/User/Avatar';
import { useAuthStore } from '@/stores/auth';
import { updateMe } from '@/lib/api/me';

const formSchema = z.object({
  display_name: z
    .string()
    .min(1, 'görünen isminiz 1-25 karakter uzunluğunda olmalıdır.')
    .max(25, 'görünen isminiz 1-25 karakter uzunluğunda olmalıdır.'),
  username: z
    .string()
    .min(3, 'kullanıcı adınız 3-25 karakter uzunluğunda olmalıdır.')
    .max(25, 'kullanıcı adınız 3-25 karakter uzunluğunda olmalıdır.')
    .regex(
      /^[a-zA-Z0-9._]+$/,
      'kullanıcı adınız sadece harf, rakam, nokta ve alt çizgi içerebilir.'
    ),
  about: z.string().max(200, 'hakkında kısmı 200 karakterden fazla olamaz.')
});

export default function Page() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: user.display_name,
      username: user.username,
      about: user.about
    }
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    const response = await updateMe(values);

    if (!response || response.status === 429) {
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
        description:
          'kullanıcı adı zaten alınmış! lütfen başka bir kullanıcı adı deneyin.',
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    } else if (response.status !== 200) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description: 'bir hata oluştu. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: 'başarılı!',
      description: 'profiliniz başarıyla güncellendi.',
      duration: 3000
    });
    setUser(response.data.user);
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col mb-5 gap-y-5'>
          <div className='flex flex-wrap justify-between gap-5'>
            <div className='text-sm flex flex-col justify-between'>
              <div className='grow'>
                <div className='font-medium'>profil fotoğrafı</div>
                <div className='text-muted-foreground'>
                  herkese açık profil fotoğrafınız.
                </div>
              </div>
              <div>
                <Input type='file' />
                <div className='text-xs text-muted-foreground'>
                  maksimum 2MB boyutunda olmalıdır.
                </div>
              </div>
            </div>
            <Avatar user={user} className='w-32 h-32 rounded-lg' />
          </div>
          <div className='flex flex-wrap justify-between gap-5'>
            <div className='text-sm flex flex-col justify-between'>
              <div className='grow'>
                <div className='font-medium'>profil afişi</div>
                <div className='text-muted-foreground'>
                  herkese açık profil afişi.
                </div>
              </div>
              <div>
                <Input type='file' />
                <div className='text-xs text-muted-foreground'>
                  maksimum 2MB boyutunda olmalıdır.
                </div>
              </div>
            </div>
            <div className='w-64 h-32 rounded-lg bg-zinc-800'></div>
          </div>
        </div>
        <div className='flex flex-col gap-y-5'>
          <FormField
            control={form.control}
            name='display_name'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>görünen isim</FormLabel>
                <FormControl>
                  <Input placeholder='copcu1337' {...field} />
                </FormControl>
                <FormDescription>herkese gösterilen isminiz.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>kullanıcı adı</FormLabel>
                <FormControl>
                  <Input placeholder='copcu1337' {...field} />
                </FormControl>
                <FormDescription>benzersiz kullanıcı adınız.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='about'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>hakkımda</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='ben bir copl.uk kullanıcısıyım.'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  kendiniz hakkında kısa bir açıklama.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='mt-5' disabled={isSubmitting}>
          {isSubmitting && (
            <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
          )}
          güncelle
        </Button>
      </form>
    </Form>
  );
}
