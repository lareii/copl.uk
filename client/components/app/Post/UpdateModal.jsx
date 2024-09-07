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
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { editPost } from '@/lib/api/posts';

const formSchema = z.object({
  content: z.string().min(1, 'içerik boş bırakılamaz')
});

export default function UpdateModal({ post, setPost, setIsOpen }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: post.content
    }
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    const response = await editPost({ id: post.id, content: values.content });
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
    setPost((prevPost) => ({
      ...prevPost,
      content: values.content
    }));
    setIsSubmitting(false);
    setIsOpen(false);
    toast({
      title: 'başarılı!',
      description: 'çöp başarıyla düzenlendi.',
      duration: 3000
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>çöpü düzenle</DialogTitle>
        <DialogDescription>
          lütfen çöp kurallarına uygun bir şekilde çöpünüzü düzenleyin.
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-5' disabled={isSubmitting}>
            {isSubmitting && (
              <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
            )}
            düzenliyorum
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
