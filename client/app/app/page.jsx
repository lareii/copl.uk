import { Suspense } from 'react';

import { Post, PostSkeleton } from "@/components/app/post";

export const metadata = {
  title: "akış"
};

export default function Page() {
  return (
    <div className='flex flex-col gap-y-3'>
      <Suspense fallback={<PostSkeleton />}>
        <Post />
      </Suspense>
    </div>
  );
}