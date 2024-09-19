import { Skeleton } from '@/components/ui/skeleton';

export default function NotificationSkeleton() {
  return (
    <div className='p-5 flex flex-col'>
      <div className='flex items-center'>
        <Skeleton className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></Skeleton>
        <div>
          <Skeleton className='w-20 h-4 mb-1' />
          <Skeleton className='w-10 h-4' />
        </div>
      </div>
      <Skeleton className='mt-3 w-1/2 h-4'></Skeleton>
    </div>
  );
}
