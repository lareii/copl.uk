import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <div className='h-screen flex flex-col max-w-screen-xl mx-auto px-5'>
      <nav className='py-5 flex justify-between items-center'>
        <Image src='/copluk.svg' alt='logo' width={128} height={128} className='select-none' />
        <div className='gap-3'>
          <Button variant='ghost' asChild>
            <Link href='/login'>oturum aç</Link>
          </Button>
          <Button>
            <Link href='/register'>kayıt ol</Link>
          </Button>
        </div>
      </nav>
      <div className='h-full mb-10 py-20 bg-gradient-to-b from-zinc-900 rounded-2xl px-5'>
        <div className='text-center'>
          <Badge variant='outline' className='mb-5'>
            copl.uk artık beta aşamasında!
          </Badge>
          <h1 className='text-5xl font-black'>zihin çöplüğün, kafana göre.</h1>
          <p className='text-muted-foreground font-medium mt-3'>
            copl.uk; düşüncelerini, fikirlerini ve notlarını paylaşabileceğin
            yazı tabanlı bir sosyal medya platformudur.
          </p>
        </div>
        <div className='mt-20 flex justify-center'>
          <div className='pointer-events-none w-[35rem]'>
            <Post post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}
