'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Dropdown from '@/components/app/Post/Dropdown';
import LikeButton from '@/components/app/Post/LikeButton';
import CommentButton from '@/components/app/Post/CommentButton';
import UserInfo from '@/components/app/User/Info';
import DateTooltip from '@/components/app/Tooltip/Date';
import MarkdownContent from '@/components/app/Markdown';

export default function Post({ post: initialPost, onDelete, onNewComment }) {
  const [post, setPost] = useState(initialPost);
  const isPostPage = usePathname().includes('/app/posts/');

  const [isExpanded, setIsExpanded] = useState(false);

  const lines = post.content.split('\n');
  const isLong = lines.length > 5 || post.content.length > 200;
  const content =
    isLong && !isPostPage
      ? isExpanded
        ? post.content
        : lines.slice(0, 5).join('\n')
      : post.content;

  return (
    <div className='p-5 bg-zinc-900 rounded-lg'>
      <div className='flex items-center justify-between mb-3'>
        <UserInfo user={post.author} />
        <Dropdown post={post} setPost={setPost} onDelete={onDelete} />
      </div>
      <div className='relative'>
        <MarkdownContent isPostPage={isPostPage} content={content} />
        {!isPostPage && isLong && (
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className='text-xs cursor-pointer w-fit'
          >
            {isExpanded ? 'gizle' : 'devamını oku'}
          </div>
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
        <DateTooltip
          created_at={post.created_at}
          updated_at={post.updated_at}
        />
      </div>
    </div>
  );
}
