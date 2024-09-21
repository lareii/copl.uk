import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SquareArrowOutUpRight } from 'lucide-react';

export default function MarkdownContent({ content }) {
  const isPostPage = usePathname().includes('/app/posts/');

  const [isExpanded, setIsExpanded] = useState(isPostPage);

  const customRenderers = {
    img: ({ src, alt }) => (
      <Link href={src} target='_blank'>
        {alt || src}
        <SquareArrowOutUpRight className='w-3 h-3 ml-1 inline-block' />
      </Link>
    ),
    a: ({ href, children }) => (
      <Link href={href} target='_blank'>
        {children || href}
        <SquareArrowOutUpRight className='w-3 h-3 ml-1 inline-block' />
      </Link>
    ),
    table: ({ children }) => children,
    thead: ({ children }) => children,
    tbody: ({ children }) => children,
    tr: ({ children }) => children,
    th: ({ children }) => children,
    td: ({ children }) => children
  };

  return (
    <div>
      <Markdown
        components={customRenderers}
        remarkPlugins={[remarkGfm]}
        className={`md ${isExpanded ? 'line-clamp-none' : 'line-clamp-5'}`}
      >
        {content}
      </Markdown>
      {!isPostPage && (
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className='text-xs cursor-pointer w-fit'
        >
          {isExpanded ? 'gizle' : 'devamını oku'}
        </div>
      )}
    </div>
  );
}
