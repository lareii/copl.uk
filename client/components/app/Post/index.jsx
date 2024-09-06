import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Markdown from 'react-markdown';
import Dropdown from '@/components/app/Post/Dropdown';
import UserHoverCard from '@/components/app/HoverCard';
import LikeButton from '@/components/app/Post/LikeButton';
import CommentButton from '@/components/app/Post/CommentButton';

export default function Post({ post: initialPost, onDelete, onNewComment }) {
  const pathname = usePathname();
  const [post, setPost] = useState(initialPost);

  return (
    <div className='p-5 bg-zinc-900 rounded-lg'>
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-start'>
          <div className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></div>
          <div className='flex flex-col mr-2'>
            <UserHoverCard user={post.author} />
            <div className='text-xs text-zinc-400'>@{post.author.username}</div>
          </div>
          {/* <div className='flex items-center gap-1 py-1 px-2 w-fit rounded-md bg-zinc-800 text-xs text-zinc-400'>
            <Leaf className='w-3 h-3 mr-0.5' />
            <div>nerv</div>
          </div> */}
        </div>
        <Dropdown post={post} setPost={setPost} onDelete={onDelete} />
      </div>
      <div className='relative'>
        <Markdown
          className={`md ${
            pathname.includes('/app/posts/') || post.content.length <= 100
              ? ''
              : 'h-32 overflow-hidden'
          }`}
        >
          {post.content}
        </Markdown>
        {!pathname.includes('/app/posts/') && post.content.length > 100 && (
          <div className='absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-zinc-900 from-4%'></div>
        )}
      </div>
      <div className='mt-4 flex gap-2'>
        <LikeButton post={post} setPost={setPost} />
        <CommentButton
          post={post}
          setPost={setPost}
          onNewComment={onNewComment}
        />
      </div>
    </div>
  );
}
