'use client';

import UserList from '@/components/app/User/List';
import { getUsers } from '@/lib/api/users';

export default function Page() {
  const fetchUsers = async (offset) => {
    return await getUsers(11, offset);
  };

  return <UserList fetchUsers={fetchUsers} />;
}
