import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Cookie from '@/components/app/Cookie';
import '@/styles/main.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: 'copl.uk - %s',
    default: 'copl.uk'
  },
  description: 'zihin çöplüğün, kafana göre.',
  keywords: ['copluk', 'copl.uk', 'çöplük'],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    site_name: 'copl.uk',
    url: 'https://copl.uk',
    title: 'copl.uk',
    description: 'zihin çöplüğün, kafana göre.',
    images: [
      {
        url: '/og-image.png',
        width: 1280,
        height: 640,
        alt: 'copl.uk'
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang='tr' translate='no'>
      <body className={inter.className}>
        {children}
        <Toaster />
        <Cookie />
      </body>
    </html>
  );
}
