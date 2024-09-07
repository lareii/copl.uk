import { useState } from 'react';
import { Ellipsis, X, LoaderCircle, Pencil } from 'lucide-react';
import useAuthStore from '@/stores/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import UpdateModal from '@/components/app/Comment/UpdateModal';
import { deleteComment } from '@/lib/api/comments';

export default function Dropdown({ comment, setComment, onDelete }) {
  const user = useAuthStore((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    const response = await deleteComment({
      post_id: comment.post,
      id: comment.id
    });
    if (!response) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description: 'yorum kaldıralamadı.',
        duration: 3000
      });
      setIsDeleting(false);
      return;
    }

    toast({
      title: 'başarılı!',
      description: 'yorum başarıyla kaldırıldı.',
      duration: 3000
    });
    setIsDeleting(false);
    onDelete(comment.id);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu>
        {(user.id === comment.author.id || user.role === 'admin' ) && (
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Ellipsis className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent>
          <DropdownMenuItem>
            <DialogTrigger className='flex items-center cursor-default'>
              <Pencil className='w-4 h-4 mr-2' />
              yorumu düzenle
            </DialogTrigger>
          </DropdownMenuItem>
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
            yorumu kaldır
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateModal
        comment={comment}
        setComment={setComment}
        setIsOpen={setIsModalOpen}
      />
    </Dialog>
  );
}
