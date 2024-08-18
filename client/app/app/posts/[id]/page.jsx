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
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Post post={post} />
    </div>
  );
}