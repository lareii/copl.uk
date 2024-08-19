'use client';

import { useState, useEffect } from 'react';
import { CalendarFold, SearchX } from 'lucide-react';
import { getUser } from '@/lib/api/users';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page({ params }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(params);
      setUser(response.data.user);

      if (response.status === 404) {
        setUser(404);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {user != 404 ? (
        <div className='flex flex-col'>
          <div className='relative w-full h-72'>
            <div className='rounded-[var(--radius)] bg-zinc-900 h-60'></div>
            <div className='left-14 bottom-1 absolute w-28 h-28 rounded-[var(--radius)] bg-zinc-900 outline outline-4 outline-zinc-950'></div>
          </div>
          {user ? (
            <>
              <div className='mt-3 mb-5'>
                <div className='flex gap-2'>
                  <div className='text-xl font-bold'>{user.name}</div>
                  {/* <div className='flex items-center gap-1 py-1 px-2 w-fit rounded-md bg-zinc-800 text-xs text-zinc-400'>
                <Leaf className='w-3 h-3 mr-0.5' />
                <div>nerv</div>
              </div> */}
                </div>
                <div className='text-zinc-400 text-sm'>@{user.username}</div>
              </div>
              <div>
                <div className='text-sm mb-2'>{user.about}</div>
                <div className='text-xs'>
                  <div className='text-zinc-400 flex items-center mb-0.5'>
                    <CalendarFold className='w-4 h-4 mr-1' />
                    {new Date(user.created_at.T * 1000).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='mt-3 mb-5'>
                <div className='flex gap-2 mb-1'>
                  <Skeleton className='w-24 h-6' />
                  {/* <Skeleton className='w-14 h-6' /> */}
                </div>
                <Skeleton className='w-16 h-4' />
              </div>
              <Skeleton className='w-96 h-4 mb-1' />
              <Skeleton className='w-24 h-4' />
            </>
          )
          }
          <div className='mt-10'>
            <div className='text-xs text-zinc-400 mb-5'>gönderiler</div>
            <div className='text-sm text-center'>henüz bir gönderi yok.</div>
          </div>
        </div>
      ) : (
        <div className='h-full flex flex-col justify-center items-center'>
          <div>maalesef böyle bir kullanıcı yok.</div>
        </div>
      )
      }
    </>
  )
}