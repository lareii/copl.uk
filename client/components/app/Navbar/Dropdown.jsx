import Link from 'next/link';
import {
  User,
  ChevronUp,
  LoaderCircle,
  SquareArrowOutUpRight,
  LogOut,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import UserInfo from '@/components/app/User/Info';
import { useAuthStore } from '@/stores/auth';
import { logout } from '@/lib/api/auth';

export default function Dropdown({ router, pathname }) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const isProfilePage =
    pathname === `/app/users/${user?.username}` || pathname.startsWith('/app/settings');

  const handleLogout = async (e) => {
    e.preventDefault();

    setUser('loading');
    await logout();
    router.push('/login');
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isProfilePage ? 'secondary' : 'ghost'}
          className='justify-start flex justify-between items-center'
        >
          <div className='flex items-center'>
            <User className='mr-5 h-4 w-4' />
            profilim
          </div>
          <ChevronUp className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='font-normal'>
          {user != 'loading' ? (
            <UserInfo user={user} />
          ) : (
            <div className='flex items-center'>
              <div className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></div>
              <div>
                <Skeleton className='w-20 h-4 mb-1' />
                <Skeleton className='w-14 h-3' />
              </div>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={'/app/users/' + user?.username}>
            <SquareArrowOutUpRight className='w-4 h-4 mr-2' />
            profile git
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/app/settings/'}>
            <Settings className='w-4 h-4 mr-2' />
            ayarlar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={user === 'loading'}
          className='text-red-500'
        >
          {user === 'loading' ? (
            <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            <LogOut className='w-4 h-4 mr-2' />
          )}
          çıkış yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
