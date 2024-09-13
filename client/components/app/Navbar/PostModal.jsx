'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { createPost } from '@/lib/api/posts';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Plus, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  content: z
    .string()
    .min(1, 'içerik 1-2000 karakter uzunluğunda olmalıdır.')
    .max(2000, 'içerik 1-2000 karakter uzunluğunda olmalıdır.')
});

export default function PostModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ''
    }
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    const response = await createPost({ content: values.content });
    if (!response) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description: 'bir hata oluştu. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      setIsSubmitting(false);
      return;
    }

    form.reset();
    setIsOpen(false);
    setIsSubmitting(false);
    router.push(`/app/posts/${response.data.post.id}`);
    router.refresh();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='justify-start'>
          <Plus className='mr-5 h-4 w-4' />
          yeni çöp
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>yeni çöp</DialogTitle>
          <DialogDescription>
            lütfen çöp kurallarına uygun bir şekilde çöpünüzü oluşturun.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>içerik</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="copl.uk'u cok seviyorum!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-zinc-400 text-xs'>* markdown destekliyor</div>
            <Button type='submit' className='mt-5' disabled={isSubmitting}>
              {isSubmitting && (
                <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
              )}
              gönderiyorum
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
