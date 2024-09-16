import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Card from '@/components/app/User/Card';
import UserSkeleton from '@/components/app/User/Skeleton';

export default function UserList({ fetchUsers }) {
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(10);
  const [hasMoreUser, setHasMoreUser] = useState(true);
  const { toast } = useToast();

  const loadMoreUsers = async () => {
    if (!hasMoreUser) return;

    const response = await fetchUsers(offset);
    if (!response) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description:
          'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      return;
    }

    const newUsers = response.data.users || [];

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
      const fetchInitialUsers = async () => {
        const response = await fetchUsers(0);
        if (!response) {
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
      };

      fetchInitialUsers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className='flex flex-col gap-2'>
      {/* {users.map((user, index) => (
        <Card key={user.id} index={index} user={user} />
      ))}
      {hasMoreUser && (
        <Button onClick={loadMoreUsers} className='w-full'>
          daha fazla göster
        </Button>
      )} */}
      {users.length > 10 ? (
        <>
          {users.map((user, index) => (
            <Card key={user.id} index={index} user={user} />
          ))}
          {hasMoreUser && (
            <Button onClick={loadMoreUsers} className='w-full'>
              daha fazla göster
            </Button>
          )}
        </>
      ) : (
        <>
          <UserSkeleton />
          <UserSkeleton />
        </>
      )}
    </div>
  );
}
