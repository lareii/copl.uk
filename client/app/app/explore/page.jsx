'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Post from '@/components/app/Post';
import { getPosts } from '@/lib/api/posts';

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(10); // posts per page
  const [hasMorePost, setHasMorePost] = useState(true);

  const loadMorePosts = async () => {
    if (!hasMorePost) return;

    const response = await getPosts({ limit: 10, offset });
    if (!response.data.posts) {
      setHasMorePost(false);
      return;
    }

    setPosts([...posts, ...response.data.posts]);
    setOffset(offset + 10);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts({ limit: 10, offset: 0 });
      if (!response.data.posts) return;
      setPosts(response.data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className='flex flex-col gap-3 h-full'>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => <Post key={post.id} post={post} />)}
          {hasMorePost ? (
            <Button onClick={loadMorePosts} className='w-full'>
              daha fazla göster
            </Button>
          ) : (
            <div className='text-center text-sm'>sona ulaştın. 👀</div>
          )
          }
        </>
      ) : (
        <div className='h-full flex flex-col items-center justify-center text-sm'>buralar şimdilik sessiz.</div>
      )}
    </div>
  );
}