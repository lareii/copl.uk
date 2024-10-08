import Link from 'next/link';
import { useState, useEffect } from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import UserInfo from '@/components/app/User/Info';
import { getFollows } from '@/lib/api/users';

function FollowDialog({ option, user, fetchUsers }) {
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(10);
  const [hasMoreUser, setHasMoreUser] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadMoreUsers = async () => {
    if (!hasMoreUser) return;

    const response = await fetchUsers(option, offset);
    if (!response || response.status === 429) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description:
          'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      return;
    }

    const newUsers = response.data.users;

    if (newUsers.length > 10) {
      setUsers((prevUsers) => [...prevUsers, ...newUsers.slice(0, 10)]);
    } else {
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setHasMoreUser(false);
    }

    setOffset((prevOffset) => prevOffset + 10);
  };

  useEffect(
    () => {
      if (isOpen) {
        const fetchInitialUsers = async () => {
          setLoading(true);

          const response = await fetchUsers(option, 0);

          if (!response || response.status === 429) {
            toast({
              title: 'hay aksi, bir şeyler ters gitti!',
              description:
                'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
              duration: 3000
            });
            return;
          }

          const initialUsers = response.data.users || [];

          if (initialUsers.length > 10) {
            setUsers(initialUsers.slice(0, 10));
          } else {
            setUsers(initialUsers);
            setHasMoreUser(false);
          }

          setLoading(false);
        };

        fetchInitialUsers();
      } else {
        setUsers([]);
        setOffset(10);
        setHasMoreUser(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='text-sm text-muted-foreground'>
        {option === 'followers' ? (
          <>
            <span className='text-primary'>{user.followers.length}</span>
            {' takipçi'}
          </>
        ) : (
          <>
            <span className='text-primary'>{user.following.length}</span>
            {' takip edilen'}
          </>
        )}
      </DialogTrigger>
      <DialogContent className='overflow-y-scroll max-h-80'>
        <DialogHeader>
          <DialogTitle>
            {option === 'followers' ? 'takipçiler' : 'takip edilenler'}
          </DialogTitle>
          <DialogDescription>
            kullanıcının{' '}
            {option === 'followers' ? 'takipçileri' : 'takip ettikleri'}{' '}
            listeleniyor.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3'>
          {loading && (
            <>
              <div className='flex items-center gap-3'>
                <Skeleton className='w-10 h-10 rounded-lg bg-zinc-800'></Skeleton>
                <div>
                  <Skeleton className='w-20 h-4 mb-1' />
                  <Skeleton className='w-10 h-4' />
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Skeleton className='w-10 h-10 rounded-lg bg-zinc-800'></Skeleton>
                <div>
                  <Skeleton className='w-20 h-4 mb-1' />
                  <Skeleton className='w-10 h-4' />
                </div>
              </div>
            </>
          )}
          {!loading && users.length > 0 ? (
            <>
              {users.map((user) => (
                <div
                  key={user.id}
                  className='flex justify-between items-center'
                >
                  <UserInfo user={user} />
                  <Button variant='ghost' size='icon' asChild>
                    <Link href={`/app/users/${user.username}`}>
                      <SquareArrowOutUpRight className='w-4 h-4' />
                    </Link>
                  </Button>
                </div>
              ))}
              {hasMoreUser && (
                <Button onClick={loadMoreUsers} className='w-full'>
                  daha fazla göster
                </Button>
              )}
            </>
          ) : (
            !loading && (
              <div className='flex flex-col items-center justify-center text-sm'>
                kimsecikler yok.
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Follows({ user }) {
  const fetchUsers = async (option, offset) => {
    return await getFollows(user.username, option, 11, offset);
  };

  return (
    <div className='flex gap-2'>
      <FollowDialog option='followers' user={user} fetchUsers={fetchUsers} />
      {' · '}
      <FollowDialog option='following' user={user} fetchUsers={fetchUsers} />
    </div>
  );
}
