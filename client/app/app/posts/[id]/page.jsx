'use client';

import { useState, useEffect } from 'react'
import Post from '@/components/app/Post';
import { getPost } from '@/lib/api/posts';

export default function Page({ params }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getPost(params);
      setPost(response.data.post);

      if (response.status === 404) {
        setPost(404);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {post != 404 ? (
        <div>
          <Post post={post} />
        </div>
      ) : (
        <div className='h-full flex flex-col justify-center items-center text-sm'>
          maalesef böyle bir gönderi yok.
        </div>
      )}
    </>
  );
}