import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  Ellipsis,
  X,
  LoaderCircle,
  SquareArrowOutUpRight,
  Pencil
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import UpdateModal from '@/components/app/Post/UpdateModal';
import { deletePost } from '@/lib/api/posts';
import useAuthStore from '@/stores/auth';

export default function Dropdown({ post, setPost, onDelete }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    const response = await deletePost({ id: post.id });
    if (!response) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description: 'çöp kaldıralamadı.',
        duration: 3000
      });
      setIsDeleting(false);
      return;
    }
    if (pathname.startsWith('/app/posts')) {
      toast({
        title: 'başarılı!',
        description: 'çöp başarıyla kaldırıldı.',
        duration: 3000
      });
      router.push('/app');
      router.refresh();
      return;
    }

    toast({
      title: 'başarılı!',
      description: 'çöp başarıyla kaldırıldı.',
      duration: 3000
    });
    setIsDeleting(false);
    onDelete(post.id);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <Ellipsis className='w-4 h-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={`/app/posts/${post.id}`}>
              <SquareArrowOutUpRight className='w-4 h-4 mr-2' />
              çöpe git
            </Link>
          </DropdownMenuItem>
          {(user.id === post.author.id || user.role === 'admin') && (
            <DropdownMenuSeparator />
          )}
          {user.id === post.author.id && (
            <DropdownMenuItem>
              <DialogTrigger className='flex items-center cursor-default'>
                <Pencil className='w-4 h-4 mr-2' />
                çöpü düzenle
              </DialogTrigger>
            </DropdownMenuItem>
          )}
          {(user.id === post.author.id || user.role === 'admin') && (
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isDeleting}
              className='flex items-center text-red-500'
            >
              {isDeleting ? (
                <LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
              ) : (
                <X className='w-4 h-4 mr-2' />
              )}
              çöpü kaldır
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateModal post={post} setPost={setPost} setIsOpen={setIsModalOpen} />
    </Dialog>
  );
}
