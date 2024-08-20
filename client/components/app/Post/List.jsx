'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Post from '@/components/app/Post';

export default function PostList({ fetchPosts }) {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(10);
  const [hasMorePost, setHasMorePost] = useState(true);

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const loadMorePosts = async () => {
    if (!hasMorePost) return;

    const response = await fetchPosts(offset);
    const newPosts = response.data.posts || [];

    if (newPosts.length > 10) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts.slice(0, 10)]);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMorePost(false);
    }

    setOffset((prevOffset) => prevOffset + 10);
  };

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const response = await fetchPosts(0);
      const initialPosts = response.data.posts || [];

      if (initialPosts.length > 10) {
        setPosts(initialPosts.slice(0, 10));
      } else {
        setPosts(initialPosts);
        setHasMorePost(false);
      }
    };

    fetchInitialPosts();
  }, [fetchPosts]);

  return (
    <div className='flex flex-col gap-3'>
      {posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} onDelete={handleDelete} />
          ))}
          {hasMorePost && (
            <Button onClick={loadMorePosts} className='w-full'>
              daha fazla göster
            </Button>
          )}
        </>
      ) : (
        <div className='flex flex-col items-center justify-center text-sm'>buralar şimdilik sessiz.</div>
      )}
    </div>
  );
};