'use client';

import { useState, useEffect } from 'react';
import { CalendarFold, Sparkle, Trash } from 'lucide-react';
import { getUser, getUserPosts } from '@/lib/api/users';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import PostList from '@/components/app/Post/List';
import Follows from '@/components/app/User/Follows';
import { followUser } from '@/lib/api/users';
import { useAuthStore } from '@/stores/auth';

export default function Page({ params }) {
  const me = useAuthStore((state) => state.user);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const handleFollow = async (e, user) => {
    e.preventDefault();

    const response = await followUser(user.username);
    if (!response || response.status === 429) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description:
          'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      return;
    }

    const followersList = user.followers || [];

    setUser({
      ...user,
      followers: followersList.includes(me.id)
        ? followersList.filter((id) => id !== me.id)
        : [...followersList, me.id]
    });
  };

  const fetchPosts = async (offset) => {
    return await getUserPosts(params.slug, 11, offset);
  };

  useEffect(
    () => {
      const fetchUser = async () => {
        const response = await getUser(params);
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
          setUser(404);
          return;
        }

        setUser(response.data.user);
      };

      fetchUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      {user !== 404 ? (
        <div className='flex flex-col'>
          <div className='relative w-full h-72'>
            <div className='rounded-[var(--radius)] bg-zinc-900 h-60'></div>
            <div className='left-14 bottom-1 absolute w-28 h-28 rounded-[var(--radius)] bg-zinc-900 outline outline-4 outline-zinc-950'></div>
          </div>
          {user ? (
            <>
              <div className='mt-3 mb-5'>
                <div className='flex justify-between gap-3'>
                  <div>
                    <div className='flex flex-wrap-reverse items-center gap-x-2'>
                      <div className='text-xl font-bold'>
                        {user.display_name}
                      </div>
                      {user.role === 'admin' && (
                        <Badge className='rounded-sm pointer-events-none'>
                          admin
                        </Badge>
                      )}
                    </div>
                    <div className='text-zinc-400 text-sm'>
                      @{user.username}
                    </div>
                  </div>
                  {me.id !== user.id && (
                    <Button
                      variant={
                        (user.followers || []).includes(me.id)
                          ? 'secondary'
                          : ''
                      }
                      onClick={(e) => handleFollow(e, user)}
                    >
                      {(user.followers || []).includes(me.id)
                        ? 'takipten çık'
                        : 'takip et'}
                    </Button>
                  )}
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                  <div className='text-sm'>{user.about}</div>
                  <div className='flex items-center gap-2 text-xs text-zinc-400'>
                    <div className='flex'>
                      <CalendarFold className='w-4 h-4 mr-1' />
                      {new Date(user.created_at.T * 1000).toLocaleDateString(
                        'tr-TR',
                        { year: 'numeric', month: 'long', day: 'numeric' }
                      )}
                    </div>
                    {' · '}
                    <div className='text-yellow-500 relative'>
                      <Sparkle className='w-2.5 h-2.5 absolute right-10 -bottom-1 text-yellow-500 fill-yellow-500 animate-sparkle1' />
                      <Sparkle className='w-2 h-2 absolute right-2 -top-1 text-yellow-500 fill-yellow-500 animate-sparkle2' />
                      <Sparkle className='w-3 h-3 absolute -right-2.5 -bottom-1 text-yellow-500 fill-yellow-500 animate-sparkle3' />
                      <div className='flex'>
                        <Trash className='w-4 h-4 mr-1' />
                        <div className='static'>{user.points} çöp puanı</div>
                      </div>
                    </div>
                  </div>
                </div>
                <Follows user={user} />
              </div>
            </>
          ) : (
            <>
              <div className='mt-3 mb-5'>
                <div className='flex gap-2 mb-1'>
                  <Skeleton className='w-24 h-6' />
                </div>
                <Skeleton className='w-16 h-4' />
              </div>
              <Skeleton className='w-96 h-4 mb-1' />
              <Skeleton className='w-24 h-4' />
            </>
          )}
          <div className='mt-10'>
            <div className='text-xs text-zinc-400 mb-3'>çöpler</div>
            <PostList fetchPosts={fetchPosts} />
          </div>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <div className='text-sm'>maalesef böyle bir çöpçü yok.</div>
        </div>
      )}
    </>
  );
}
