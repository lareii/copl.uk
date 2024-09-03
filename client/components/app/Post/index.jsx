import { useState } from 'react';
import Dropdown from '@/components/app/Post/Dropdown';
import { Skeleton } from '@/components/ui/skeleton';
import UserHoverCard from '@/components/app/HoverCard';
import LikeButton from '@/components/app/Post/LikeButton';
import CommentButton from '@/components/app/Post/CommentButton';

export default function Post({ post: initialPost, onDelete, onNewComment }) {
  const [post, setPost] = useState(initialPost);

  return (
    <div className='p-5 bg-zinc-900 rounded-lg'>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-start'>
          <div className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></div>
          <div className='flex flex-col mr-2'>
            {post ? (
              <>
                <UserHoverCard user={post.author} />
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
        <Dropdown post={post} setPost={setPost} onDelete={onDelete} />
      </div>
      <div className='text-zinc-400 text-sm'>
        {post ? post.content : <Skeleton className='w-full h-5' />}
      </div>
      <div className='mt-4 flex gap-2'>
        {post ? (
          <>
            <LikeButton post={post} setPost={setPost} />
            <CommentButton post={post} setPost={setPost} onNewComment={onNewComment} />
          </>
        ) : (
          <>
            <Skeleton className='w-7 h-5' />
            <Skeleton className='w-7 h-5' />
          </>
        )}
      </div>
    </div>
  );
}