import { Badge } from '@/components/ui/badge';
import Post from '@/components/app/Post';

const post = {
  created_at: { T: 1726319475 },
  updated_at: { T: 1726319475 },
  author: {
    id: '66e4c26822421e10603c9d71',
    created_at: { T: 1726268008, I: 0 },
    role: 'user',
    display_name: 'emirhan',
    username: 'larei',
    about: 'ben bir copl.uk kullanıcısıyım.',
    points: 0
  },
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptatum, doloribus velit rem a quo delectus temporibus cumque similique odio corrupti excepturi veniam explicabo ullam nesciunt ea aliquid nisi aliquam!',
  likes: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10],
  comments: 3
};

export default function Page() {
  return (
    <div className='grow py-20 bg-gradient-to-b from-zinc-900 rounded-2xl px-5'>
      <div className='text-center'>
        <Badge variant='outline' className='mb-5'>
          copl.uk artık beta aşamasında!
        </Badge>
        <h1 className='text-5xl font-black'>zihin çöplüğün, kafana göre.</h1>
        <p className='text-muted-foreground font-medium mt-3'>
          copl.uk; düşüncelerini, fikirlerini ve notlarını paylaşabileceğin yazı
          tabanlı bir sosyal medya platformudur.
        </p>
      </div>
      <div className='mt-20 flex justify-center'>
        <div className='pointer-events-none w-[35rem]'>
          <Post post={post} />
        </div>
      </div>
    </div>
  );
}
