import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { likePost } from '@/lib/api/posts';
import useAuthStore from '@/stores/auth';

export default function LikeButton({ post, setPost }) {
  const user = useAuthStore((state) => state.user);
  const isLiked = post.likes?.includes(user.id);

  const handleLike = async (e, isLiked) => {
    e.preventDefault();

    const response = await likePost({ id: post.id, like: !isLiked });
    if (response && response.status === 200) {
      setPost((prevPost) => {
        const currentLikes = prevPost.likes || [];

        return {
          ...prevPost,
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
      <Heart className='w-3 h-3 mr-2' />
      {post.likes ? post.likes.length : 0}
    </Button>
  );
}
