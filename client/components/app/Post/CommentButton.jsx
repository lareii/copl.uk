import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MessageCircle, LoaderCircle } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogTrigger,
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
import { createComment } from '@/lib/api/comments';

const formSchema = z.object({
  content: z.string().min(1, 'içerik boş bırakılamaz')
});

export default function CommentButton({ post, setPost, onNewComment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pathname = usePathname();
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

    const response = await createComment({
      post_id: post.id,
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

    form.reset();
    setIsOpen(false);
    setIsSubmitting(false);

    if (pathname === `/app/posts/${post.id}`) {
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments + 1
      }));
      onNewComment(response.data.comment);
      return;
    }

    router.push(`/app/posts/${post.id}`);
    router.refresh();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='px-2 h-7 text-xs'>
          <MessageCircle className='w-3 h-3 mr-2' />
          {post.comments}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>yeni yorum</DialogTitle>
          <DialogDescription>
            lütfen çöp kurallarına uygun bir şekilde yorumunuzu oluşturun.
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
