import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Markdown from 'react-markdown';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Dropdown from '@/components/app/Post/Dropdown';
import LikeButton from '@/components/app/Post/LikeButton';
import CommentButton from '@/components/app/Post/CommentButton';
import UserInfo from '@/components/app/User/Info';

export default function Post({ post: initialPost, onDelete, onNewComment }) {
  const [post, setPost] = useState(initialPost);
  const pathname = usePathname();

  return (
    <div className='p-5 bg-zinc-900 rounded-lg'>
      <div className='flex items-center justify-between mb-3'>
        <UserInfo user={post.author} />
        <Dropdown post={post} setPost={setPost} onDelete={onDelete} />
      </div>
      <div className='relative'>
        <Markdown className='md'>
          {pathname.includes('/app/posts/') || post.content.length <= 200
            ? post.content
            : post.content.slice(0, 200) + '...'}
        </Markdown>
        {!pathname.includes('/app/posts/') && post.content.length > 200 && (
          <div className='absolute bottom-0 right-0 bg-gradient-to-b from-transparent to-zinc-900 w-full h-full'></div>
        )}
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div className='flex gap-2'>
          <LikeButton post={post} setPost={setPost} />
          <CommentButton
            post={post}
            setPost={setPost}
            onNewComment={onNewComment}
          />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='text-xs text-zinc-400'>
                {new Date(post.created_at.T * 1000).toLocaleDateString(
                  'tr-TR',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className='text-xs text-zinc-400'>
              <div>
                oluşturuldu:{' '}
                {new Date(post.created_at.T * 1000).toLocaleDateString(
                  'tr-TR',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  }
                )}
              </div>
              <div>
                güncellendi:{' '}
                {new Date(post.updated_at.T * 1000).toLocaleDateString(
                  'tr-TR',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                  }
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
