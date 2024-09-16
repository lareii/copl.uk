import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { editComment } from '@/lib/api/comments';

const formSchema = z.object({
  content: z
    .string()
    .min(1, 'içerik 1-2000 karakter uzunluğunda olmalıdır.')
    .max(500, 'içerik 1-2000 karakter uzunluğunda olmalıdır.')
});

export default function UpdateModal({ comment, setComment, setIsOpen }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: comment.content
    }
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    const response = await editComment({
      post_id: comment.post,
      id: comment.id,
      content: values.content
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

    setComment((prevComment) => ({
      ...prevComment,
      content: values.content,
      updated_at: response.data.comment.updated_at
    }));
    setIsSubmitting(false);
    setIsOpen(false);
    toast({
      title: 'başarılı!',
      description: 'yorum başarıyla düzenlendi.',
      duration: 3000
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>yorumu düzenle</DialogTitle>
        <DialogDescription>
          lütfen{' '}
          <Link href='/content' className='underline'>
            içerik politikasına
          </Link>{' '}
          uygun bir şekilde yorumunuzu düzenleyin.
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
                  <Textarea {...field} />
                </FormControl>
                <FormDescription className='text-xs'>
                  * markdown destekliyor
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-5' disabled={isSubmitting}>
            {isSubmitting && (
              <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
            )}
            düzenle
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
