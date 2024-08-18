'use client';

import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: '404',
};

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <Image src='/copluk.png' alt='copl.uk logo' width={170} height={170} className='mb-3' />
      <div className='text-sm'>
        sayfa bulunamadı. {' '}
        <Link className='underline' href='/'>ana sayfaya dön</Link>
      </div>
    </div>
  );
}