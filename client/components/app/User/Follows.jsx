export default function Follows({ user }) {
  return (
    <div className='flex gap-2 text-sm text-muted-foreground'>
      <div>
        <span className='text-primary'>
          {user.followers ? user.followers.length : 0}
        </span>{' '}
        takipçi
      </div>
      {' · '}
      <div>
        <span className='text-primary'>
          {user.following ? user.following.length : 0}
        </span>{' '}
        takip edilen
      </div>
    </div>
  );
}
