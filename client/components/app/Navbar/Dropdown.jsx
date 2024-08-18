import Link from 'next/link';
import { User, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/stores/auth';
import { logout } from '@/lib/api/auth';

export default function Dropdown({ router, pathname }) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
    setUser('loading');
    router.push('/login');
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={pathname === `/app/users/${user?.username}` ? 'secondary' : 'ghost'} className='justify-start flex justify-between items-center'>
          <div className='flex items-center'>
            <User className='mr-5 h-4 w-4' />
            profilim
          </div>
          <ChevronUp className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='flex items-start'>
          <div className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></div>
          <div className='flex flex-col'>
            {user != 'loading' ? (
              <>
                <div className='font-medium text-sm'>{user.name}</div>
                <div className='text-zinc-400 text-xs'>@{user.username}</div>
              </>
            ) : (
              <>
                <Skeleton className='w-20 h-4 mb-1' />
                <Skeleton className='w-10 h-3' />
              </>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={'/app/users/' + user?.username}>profile git</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          çıkış yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}