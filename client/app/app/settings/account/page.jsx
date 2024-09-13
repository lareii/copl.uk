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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuthStore } from '@/stores/auth';
import { updateMe } from '@/lib/api/auth';

export default function Page() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const emailForm = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email('geçerli bir e-posta adresi girin')
      })
    ),
    defaultValues: {
      email: user.email
    }
  });

  const passwordForm = useForm({
    resolver: zodResolver(
      z
        .object({
          password: z
            .string()
            .min(8, 'parolanız 8-50 karakter uzunluğunda olmalıdır.')
            .max(50, 'parolanız 8-50 karakter uzunluğunda olmalıdır.'),
          passwordConfirmation: z.string()
        })
        .refine((data) => data.password === data.passwordConfirmation, {
          message: 'parolalar eşleşmiyor',
          path: ['passwordConfirmation']
        })
    )
  });

  async function onEmailSubmit(values) {
    setIsSubmitting(true);

    const response = await updateMe(values);

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
        description:
          'bu e-posta zaten kullanılıyor! lütfen başka bir e-posta deneyin.',
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
      description: 'e-postanız başarıyla güncellendi.',
      duration: 3000
    });
    setUser(response.data.user);
    setIsSubmitting(false);
  }

  async function onPasswordSubmit(values) {
    setIsSubmitting(true);

    const response = await updateMe({ password: values.password });

    if (!response || response.status !== 200) {
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
      description: 'parolanız başarıyla güncellendi.',
      duration: 3000
    });
    setIsSubmitting(false);
  }

  return (
    <div className='flex flex-col gap-5'>
      <Form {...emailForm}>
        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
          <FormField
            control={emailForm.control}
            name='email'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>e-posta</FormLabel>
                <FormControl>
                  <div className='flex max-sm:flex-col gap-3'>
                    <Input placeholder='copcu1337@copl.uk' {...field} />
                    <Button type='submit' disabled={isSubmitting}>
                      {isSubmitting && (
                        <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
                      )}
                      güncelle
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  hesabınıza bağlı e-posta adresi.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className='flex flex-col gap-3 text-sm'>
        <div>
          <div className='font-medium'>parola</div>
          <div className='text-muted-foreground'>
            kimsenin bilmediği süper gizli parolanız. 👀
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='w-fit'>parola değiştir</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>parola değiştir</DialogTitle>
              <DialogDescription>
                yeni ve güvenli bir parola belirleyin.
              </DialogDescription>
            </DialogHeader>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className='flex flex-col gap-3'
              >
                <FormField
                  control={passwordForm.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='space-y-1'>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='yeni parola'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name='passwordConfirmation'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='yeni parola tekrarı'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={isSubmitting} className='mt-5'>
                  {isSubmitting && (
                    <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
                  )}
                  değiştir
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
