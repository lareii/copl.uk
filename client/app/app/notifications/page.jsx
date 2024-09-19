'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Notification from '@/components/app/Notification';
import NotificationSkeleton from '@/components/app/Notification/Skeleton';
import { getNotifications } from '@/lib/api/me';

export default function Page() {
  const [notifications, setNotifications] = useState([]);
  const [offset, setOffset] = useState(10);
  const [hasMoreNotification, setHasMoreNotification] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadMoreNotifications = async () => {
    if (!hasMoreNotification) return;

    const response = await getNotifications(11, offset);
    if (!response || response.status === 429) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description:
          'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      return;
    }

    const newNotifications = response.data.notifications || [];

    if (newNotifications.length > 10) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...newNotifications.slice(0, 10)
      ]);
    } else {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...newNotifications
      ]);
      setHasMoreNotification(false);
    }

    setOffset((prevOffset) => prevOffset + 10);
  };

  useEffect(
    () => {
      const fetchInitialNotifications = async () => {
        setLoading(true);
        const response = await getNotifications(11, 0);

        if (!response || response.status === 429) {
          toast({
            title: 'hay aksi, bir şeyler ters gitti!',
            description:
              'sunucudan yanıt alınamadı. Lütfen daha sonra tekrar deneyin.',
            duration: 3000
          });
          return;
        }

        const initialNotifications = response.data.notifications || [];

        if (initialNotifications.length > 10) {
          setNotifications(initialNotifications.slice(0, 10));
        } else {
          setNotifications(initialNotifications);
          setHasMoreNotification(false);
        }

        setLoading(false);
      };

      fetchInitialNotifications();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className='flex flex-col gap-2'>
      {loading && (
        <>
          <NotificationSkeleton />
          <NotificationSkeleton />
        </>
      )}
      {!loading && notifications.length > 0 ? (
        <>
          {notifications.map((notification) => (
            <Notification key={notification.id} notification={notification} />
          ))}
          {hasMoreNotification && (
            <Button onClick={loadMoreNotifications} className='w-full'>
              daha fazla bildirim yükle
            </Button>
          )}
        </>
      ) : (
        !loading && (
          <div className='flex flex-col items-center justify-center text-sm'>
            buralar şimdilik sessiz.
          </div>
        )
      )}
    </div>
  );
}
