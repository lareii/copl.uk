import { useState } from 'react';
import Markdown from 'react-markdown';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Dropdown from '@/components/app/Comment/Dropdown';
import LikeButton from '@/components/app/Comment/LikeButton';
import UserInfo from '@/components/app/User/Info';

export default function Comment({ comment: initialComment, onDelete }) {
  const [comment, setComment] = useState(initialComment);

  return (
    <div>
      <div className='flex items-center justify-between mb-3'>
        <UserInfo user={comment.author} />
        <Dropdown
          comment={comment}
          setComment={setComment}
          onDelete={onDelete}
        />
      </div>
      <Markdown className='md'>{comment.content}</Markdown>
      <div className='mt-4 flex justify-between'>
        <LikeButton comment={comment} setComment={setComment} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className='text-xs text-zinc-400'>
                {new Date(comment.created_at.T * 1000).toLocaleDateString(
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
                {new Date(comment.created_at.T * 1000).toLocaleDateString(
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
                {new Date(comment.updated_at.T * 1000).toLocaleDateString(
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
