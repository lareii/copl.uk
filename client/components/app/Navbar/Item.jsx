import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getUnreadNotificationsCount } from '@/lib/api/me';

export default function Item({ pathname, href, icon: Icon, label }) {
  const isActive =
    pathname === href || (href !== '/app' && pathname.startsWith(href));

  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(
    () => {
      const fetchUnreadNotificationsCount = async () => {
        const response = await getUnreadNotificationsCount();
        if (response) {
          setUnreadNotificationsCount(response.data.unreads);
        }
      };

      fetchUnreadNotificationsCount();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      className='justify-start'
      asChild
    >
      <Link href={href} className='flex gap-5'>
        <Icon className=' h-4 w-4' />
        {href === '/app/notifications' && unreadNotificationsCount ? (
          <div className='flex justify-between items-center grow'>
            {label}
            <Badge>{unreadNotificationsCount}</Badge>
          </div>
        ) : (
          label
        )}
      </Link>
    </Button>
  );
}
