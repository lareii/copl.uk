'use client';

import { useState, useEffect } from 'react'
import Post from '@/components/app/Post';
import { useToast } from '@/components/ui/use-toast';
import { getPost } from '@/lib/api/posts';

export default function Page({ params }) {
  const [post, setPost] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getPost(params);

      if (!response) {
        toast({
          title: 'hay aksi, bir şeyler ters gitti!',
          description: 'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
          duration: 3000
        });
        return;
      }

      setPost(response.data.post);
    };

    fetchUser();
  }, []);

  return (
    <>
      {post ? (
        <div>
          <Post post={post} />
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center text-sm'>
          maalesef böyle bir gönderi yok.
        </div>
      )}
    </>
  );
}