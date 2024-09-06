import Hover from '@/components/app/UserCard/Hover';

export default function UserCard({ user }) {
  return (
    <div className='flex items-start'>
      <div className='mr-3 w-10 h-10 rounded-lg bg-zinc-800'></div>
      <div className='flex flex-col mr-2'>
        <Hover user={user} />
        <div className='text-xs text-zinc-400'>@{user.username}</div>
      </div>
      {/* <div className='flex items-center gap-1 py-1 px-2 w-fit rounded-md bg-zinc-800 text-xs text-zinc-400'>
            <Leaf className='w-3 h-3 mr-0.5' />
            <div>nerv</div>
          </div> */}
    </div>
  );
}
