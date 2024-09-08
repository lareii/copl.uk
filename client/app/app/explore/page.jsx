'use client';

import PostList from '@/components/app/Post/List';
import UserList from '@/components/app/User/List';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPosts } from '@/lib/api/posts';
import { getUsers } from '@/lib/api/users';

export default function Page() {
  const fetchUsers = async (offset) => {
    return await getUsers(11, offset);
  };

  const fetchPosts = async (offset) => {
    return await getPosts(11, offset);
  };

  return (
    <div className='flex flex-col gap-2'>
      <Tabs defaultValue='posts'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='posts'>çöpler</TabsTrigger>
          <TabsTrigger value='guilds'>çöplükler</TabsTrigger>
          <TabsTrigger value='users'>çöpçüler</TabsTrigger>
        </TabsList>
        <TabsContent value='posts'>
          <PostList fetchPosts={fetchPosts} />
        </TabsContent>
        <TabsContent value='guilds'>2</TabsContent>
        <TabsContent value='users'>
          <UserList fetchUsers={fetchUsers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
