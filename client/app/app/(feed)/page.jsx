'use client';

import PostList from '@/components/app/Post/List';
import { getFeed } from '@/lib/api/auth';

export default function Page() {
  const fetchPosts = async (offset) => {
    return await getFeed(11, offset);
  };

  return (
    <PostList fetchPosts={fetchPosts} />
  );
}