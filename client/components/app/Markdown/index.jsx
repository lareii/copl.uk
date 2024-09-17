import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SquareArrowOutUpRight } from 'lucide-react';

export default function MarkdownContent({ content }) {
  const customRenderers = {
    img: ({ src, alt }) => (
      <Link href={src} target='_blank' className='flex items-center w-fit'>
        {alt || src}
        <SquareArrowOutUpRight className='w-3 h-3 ml-1' />
      </Link>
    ),
    a: ({ node, children }) => (
      <Link
        href={node.properties.href}
        target='_blank'
        className='flex items-center w-fit'
      >
        {children || node.properties.href}
        <SquareArrowOutUpRight className='w-3 h-3 ml-1' />
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
    <Markdown
      components={customRenderers}
      remarkPlugins={[remarkGfm]}
      className='md'
    >
      {content}
    </Markdown>
  );
}
