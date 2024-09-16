'use client';

import { useState, useEffect } from 'react';
import Post from '@/components/app/Post';
import CommentList from '@/components/app/Comment/List';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { getPost } from '@/lib/api/posts';

export default function Page({ params }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { toast } = useToast();

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  useEffect(
    () => {
      const fetchPost = async () => {
        const response = await getPost(params);
        if (!response) {
          toast({
            title: 'hay aksi, bir şeyler ters gitti!',
            description:
              'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
            duration: 3000
          });
          return;
        }

        if (response.status === 404) {
          setPost(404);
          return;
        }

        setPost(response.data.post);
      };
      fetchPost();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return post !== 404 ? (
    <div className='flex flex-col'>
      {post ? (
        <>
          <Post post={post} onNewComment={handleNewComment} />
          <div className='mt-10 mb-3 font-medium text-xs text-muted-foreground'>
            yorumlar
          </div>
          <CommentList
            post_id={post.id}
            comments={comments}
            setComments={setComments}
            setPost={setPost}
          />
        </>
      ) : (
        <>
          <div className='bg-zinc-900 w-full rounded-lg p-5 flex flex-col'>
            <div className='flex items-center'>
              <Skeleton className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></Skeleton>
              <div>
                <Skeleton className='w-20 h-4 mb-1' />
                <Skeleton className='w-10 h-4' />
              </div>
            </div>
            <Skeleton className='mt-4 w-full h-4'></Skeleton>
            <Skeleton className='mt-2 w-1/2 h-4'></Skeleton>
            <div className='mt-5 flex gap-3'>
              <Skeleton className='w-10 h-6'></Skeleton>
              <Skeleton className='w-10 h-6'></Skeleton>
            </div>
          </div>
          <div className='mt-10 flex flex-col gap-7'>
            <div>
              <div className='flex items-center'>
                <Skeleton className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></Skeleton>
                <div>
                  <Skeleton className='w-20 h-4 mb-1' />
                  <Skeleton className='w-10 h-4' />
                </div>
              </div>
              <Skeleton className='mt-4 w-full h-4'></Skeleton>
              <Skeleton className='mt-2 w-1/2 h-4 mb-1' />
              <Skeleton className='mt-5 w-10 h-6'></Skeleton>
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <div className='flex flex-col justify-center items-center text-sm'>
      maalesef böyle bir çöp yok.
    </div>
  );
}
