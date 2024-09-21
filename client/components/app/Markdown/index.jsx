import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SquareArrowOutUpRight } from 'lucide-react';

export default function MarkdownContent({ content }) {
  const isPostPage = usePathname().includes('/app/posts/');

  const [isExpanded, setIsExpanded] = useState(false);

  const contentLines = content.split('\n');
  const contentLength = content.length;
  const lineCount = contentLines.length;

  const isLong = lineCount > 5 || contentLength > 500;

  const truncatedContent =
    lineCount > 5
      ? contentLines.slice(0, 5).join('\n') + '...'
      : contentLength > 500
      ? content.substring(0, 500) + '...'
      : content;

  const contentToShow = isExpanded || isPostPage ? content : truncatedContent;

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
        className='md'
      >
        {contentToShow}
      </Markdown>

      {!isPostPage && isLong && (
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
