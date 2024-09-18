import Link from 'next/link';
import { CalendarFold, Trash, SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hover from '@/components/app/User/Hover';
import Avatar from '@/components/app/User/Avatar';

export default function Card({ index, user }) {
  return (
    <div
      className={
        index === 0
          ? 'p-[2px] rounded-lg bg-yellow-500'
          : index === 1
          ? 'p-[2px] rounded-lg bg-zinc-400'
          : index === 2
          ? 'p-[2px] rounded-lg bg-amber-700'
          : ''
      }
    >
      <div className='p-5 bg-zinc-900/85 rounded-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-start'>
            <Avatar user={user} className='mr-3 w-10 h-10' />
            <div className='flex flex-col mr-2'>
              <Hover user={user} />
              <div className='text-xs text-zinc-400'>@{user.username}</div>
            </div>
          </div>
          <Button variant='ghost' size='icon' asChild>
            <Link href={`/app/users/${user.username}`}>
              <SquareArrowOutUpRight className='w-4 h-4' />
            </Link>
          </Button>
        </div>
        <div className='mt-2 mb-3 text-sm'>{user.about}</div>
        <div className='mt-2 flex items-center gap-2 text-xs text-zinc-400'>
          <div className='flex'>
            <CalendarFold className='w-4 h-4 mr-1' />
            {new Date(user.created_at.T * 1000).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          {' · '}
          <div className='flex items-center'>
            <Trash className='w-4 h-4 mr-1' />
            <div className='static'>{user.points} çöp puanı</div>
          </div>
        </div>
      </div>
    </div>
  );
}
