'use client';

import PostList from '@/components/app/Post/List';
import { getPosts } from '@/lib/api/posts';

export default function Page() {
  const fetchPosts = async (offset) => {
    return await getPosts(11, offset);
  };

  return (
    <PostList fetchPosts={fetchPosts} />
  );
}