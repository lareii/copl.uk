'use client';

import { useState, useEffect } from 'react';
import Post from '@/components/app/Post';
import CommentList from '@/components/app/Comment/List';
import PostSkeleton from '@/components/app/Post/Skeleton';
import CommentSkeleton from '@/components/app/Comment/Skeleton';
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
          <PostSkeleton />
          <CommentSkeleton />
        </>
      )}
    </div>
  ) : (
    <div className='flex flex-col justify-center items-center text-sm'>
      maalesef böyle bir çöp yok.
    </div>
  );
}
