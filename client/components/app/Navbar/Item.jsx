import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Item({ pathname, href, icon: Icon, label }) {
  const isActive =
    pathname === href || (href !== '/app' && pathname.startsWith(href));

  return (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      className='justify-start'
      asChild
    >
      <Link href={href}>
        <Icon className='mr-5 h-4 w-4' />
        {label}
      </Link>
    </Button>
  );
}
