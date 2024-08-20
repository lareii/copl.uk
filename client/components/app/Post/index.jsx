'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Ellipsis, X, Trash, MessageCircle, LoaderCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { deletePost } from '@/lib/api/posts';

export default function Post({ post, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();

    setIsDeleting(true);
    const response = await deletePost({ id: post.id });
    if (response && response.status === 200) {
      if (pathname.startsWith('/app/posts')) {
        router.push('/app');
        router.refresh();
        return;
      }
      onDelete(post.id);
    }
  }

  return (
    <div className='p-5 bg-zinc-900 rounded-lg'>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-start'>
          <div className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></div>
          <div className='flex flex-col mr-2'>
            {post ? (
              <>
                <div className='text-sm'>{post.author.name}</div>
                <div className='text-xs text-zinc-400'>@{post.author.username}</div>
              </>
            ) : (
              <>
                <Skeleton className='w-20 h-4 mb-1' />
                <Skeleton className='w-10 h-3' />
              </>
            )}
          </div>
          {/* <div className='flex items-center gap-1 py-1 px-2 w-fit rounded-md bg-zinc-800 text-xs text-zinc-400'>
            <Leaf className='w-3 h-3 mr-0.5' />
            <div>nerv</div>
          </div> */}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Ellipsis className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='flex items-center text-red-500' onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
              ) : (
                <X className='w-4 h-4 mr-2' />
              )}
              çöpü kaldır
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='text-zinc-400 text-sm'>
        {post ? post.content : <Skeleton className='w-full h-5' />}
      </div>
      <div className='mt-4 flex gap-2'>
        <Button variant='ghost' className='px-2 h-7 text-xs'>
          <Trash className='w-3 h-3 mr-2' />
          {post ? post.likes : <Skeleton className='w-7 h-5' />}
        </Button>
        <Button variant='ghost' className='px-2 h-7 text-xs'>
          <MessageCircle className='w-3 h-3 mr-2' />
          {post ? post.comments : <Skeleton className='w-7 h-5' />}
        </Button>
      </div>
    </div>
  );
}