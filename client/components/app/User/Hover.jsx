import Link from 'next/link';
import { CalendarFold, Sparkle, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import Avatar from '@/components/app/User/Avatar';

export default function Hover({ user }) {
  return (
    <HoverCard>
      <HoverCardTrigger
        className='text-sm hover:underline flex items-center gap-2'
        asChild
      >
        <Link
          href={`/app/users/${user.username}`}
          className='flex items-center gap-2'
        >
          <div>{user.display_name}</div>
          {user.role === 'admin' && (
            <Badge className='rounded-sm py-[1px] px-1 pointer-events-none'>
              admin
            </Badge>
          )}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className='flex flex-col w-fit' align='start'>
        <div className='flex items-start'>
          <Avatar user={user} className='mr-3 w-10 h-10' />
          <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
              <div className='text-sm'>{user.display_name}</div>
              {user.role === 'admin' && (
                <Badge className='rounded-sm py-[1px] px-1 pointer-events-none'>
                  admin
                </Badge>
              )}
            </div>
            <div className='text-xs text-zinc-400'>@{user.username}</div>
          </div>
        </div>
        <div className='mt-3'>
          <div className='text-sm mb-2'>{user.about}</div>
          <div className='text-xs'>
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
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
