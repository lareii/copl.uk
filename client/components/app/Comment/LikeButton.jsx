import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { likeComment } from '@/lib/api/comments';
import useAuthStore from '@/stores/auth';

export default function LikeButton({ comment, setComment }) {
  const user = useAuthStore((state) => state.user);
  const isLiked = comment.likes?.includes(user.id);

  const handleLike = async (e, isLiked) => {
    e.preventDefault();

    const response = await likeComment({
      post_id: comment.post,
      id: comment.id,
      like: !isLiked
    });
    if (response && response.status === 200) {
      setComment((prevComment) => {
        const currentLikes = prevComment.likes || [];

        return {
          ...prevComment,
          likes: isLiked
            ? currentLikes.filter((like) => like !== user.id)
            : [...currentLikes, user.id]
        };
      });
    }
  };

  return (
    <Button
      variant={isLiked ? '' : 'ghost'}
      className='px-2 h-7 text-xs'
      onClick={(e) => handleLike(e, isLiked)}
    >
      <Trash className='w-3 h-3 mr-2' />
      {comment.likes ? comment.likes.length : 0}
    </Button>
  );
}
