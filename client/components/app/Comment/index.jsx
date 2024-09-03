import { useState } from 'react';
import UserHoverCard from '@/components/app/HoverCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/app/Comment/Dropdown';
import LikeButton from '@/components/app/Comment/LikeButton';

export default function Comment({ comment: initialComment, onDelete }) {
  const [comment, setComment] = useState(initialComment);

  return (
    <div>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-start'>
          <div className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></div>
          <div className='flex flex-col mr-2'>
            {comment ? (
              <>
                <UserHoverCard user={comment.author} />
                <div className='text-xs text-zinc-400'>@{comment.author.username}</div>
              </>
            ) : (
              <>
                <Skeleton className='w-20 h-4 mb-1' />
                <Skeleton className='w-10 h-3' />
              </>
            )}
          </div>
        </div>
        <Dropdown comment={comment} setComment={setComment} onDelete={onDelete} />
      </div>
      <div className='text-zinc-400 text-sm'>
        {comment ? comment.content : <Skeleton className='w-full h-5' />}
      </div>
      <div className='mt-4'>
        {comment ? <LikeButton comment={comment} setComment={setComment} /> : <Skeleton className='w-7 h-5' />}
      </div>
    </div>
  );
}