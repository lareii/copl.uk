import { Skeleton } from '@/components/ui/skeleton';

export default function CommentSkeleton() {
  return (
    <div className='mt-10 flex flex-col gap-7'>
      <div>
        <div className='flex items-center'>
          <Skeleton className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></Skeleton>
          <div>
            <Skeleton className='w-20 h-4 mb-1' />
            <Skeleton className='w-10 h-4' />
          </div>
        </div>
        <Skeleton className='mt-4 w-full h-4'></Skeleton>
        <Skeleton className='mt-2 w-1/2 h-4 mb-1' />
        <Skeleton className='mt-5 w-10 h-6'></Skeleton>
      </div>
    </div>
  );
}
