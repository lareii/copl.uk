import Link from 'next/link';
import { useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getUnreadNotificationsCount } from '@/lib/api/me';
import { useNotificationStore } from '@/stores/notification';

export default function NotificationButton({ pathname }) {
  const isActive = pathname === '/app/notifications';

  const notificationCount = useNotificationStore(
    (state) => state.notificationCount
  );
  const setNotificationCount = useNotificationStore(
    (state) => state.setNotificationCount
  );

  useEffect(() => {
    const fetchUnreadNotificationsCount = async () => {
      const response = await getUnreadNotificationsCount();
      if (!response) return;

      setNotificationCount(response.data.unreads);
    };

    fetchUnreadNotificationsCount();
  }, [setNotificationCount]);

  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      className='justify-start'
      asChild
    >
      <Link href='/app/notifications'>
        <Bell className='mr-5 h-4 w-4' />
        <div className='flex items-center justify-between grow'>
          bildirimler
          {notificationCount > 0 && (
            <Badge className='rounded-md'>{notificationCount}</Badge>
          )}
        </div>
      </Link>
    </Button>
  );
}
