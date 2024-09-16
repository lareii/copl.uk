import { useState } from 'react';
import Markdown from 'react-markdown';
import Dropdown from '@/components/app/Comment/Dropdown';
import LikeButton from '@/components/app/Comment/LikeButton';
import UserInfo from '@/components/app/User/Info';
import DateTooltip from '@/components/app/Tooltip/Date';

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
        <DateTooltip created_at={comment.created_at} updated_at={comment.updated_at} />
      </div>
    </div>
  );
}
