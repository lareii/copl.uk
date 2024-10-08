'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <Image
        src='/copluk.svg'
        alt='copl.uk logo'
        width={170}
        height={170}
        className='mb-3 select-none'
      />
      <div className='text-sm'>
        sayfa bulunamadı.{' '}
        <Link className='underline' href='/'>
          ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}
