import Link from 'next/link';
import { useState } from 'react';
import { Mail, MailOpen, SquareArrowOutUpRight } from 'lucide-react';
import UserInfo from '@/components/app/User/Info';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { updateNotification } from '@/lib/api/me';

function typeContent(notification) {
  switch (notification.type) {
    case 'user_followed':
      return {
        href: `/app/users/${notification.type_content}`,
        message: 'seni takip etmeye başladı.'
      };
    case 'post_liked':
      return {
        href: `/app/posts/${notification.type_content}`,
        message: 'gönderini beğendi.'
      };
    case 'comment_created':
      return {
        href: `/app/posts/${notification.type_content}`,
        message: 'gönderine yorum yaptı.'
      };
    case 'comment_liked':
      return {
        href: `/app/posts/${notification.type_content}`,
        message: 'yorumunu beğendi.'
      };
  }
}

export default function Notification({ notification }) {
  const [isRead, setIsRead] = useState(notification.read);
  const { toast } = useToast();

  const markAsRead = async ({ read }) => {
    const response = await updateNotification({
      id: notification.id,
      read: !read
    });
    if (!response || response.status === 429) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description:
          'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      return;
    }

    setIsRead(!read);
  };

  return (
    <div className={`p-5 rounded-lg ${isRead ? '' : 'bg-zinc-900'}`}>
      <div className='flex justify-between items-center mb-3'>
        <UserInfo user={notification.source_user} />
        <div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => markAsRead({ read: isRead })}
          >
            {isRead ? (
              <MailOpen className='w-4 h-4' />
            ) : (
              <Mail className='w-4 h-4' />
            )}
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <Link href={typeContent(notification).href}>
              <SquareArrowOutUpRight className='w-4 h-4' />
            </Link>
          </Button>
        </div>
      </div>
      <div className='text-sm text-muted-foreground'>
        <span className='text-primary'>
          {notification.source_user.display_name} (
          {notification.source_user.username})
        </span>{' '}
        {typeContent(notification).message}
      </div>
    </div>
  );
}
