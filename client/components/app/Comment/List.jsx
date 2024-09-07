import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Comment from '@/components/app/Comment';
import { Button } from '@/components/ui/button';
import { getComments } from '@/lib/api/comments';

export default function CommentList({ post_id, comments, setComments, setPost }) {
  const [offset, setOffset] = useState(10);
  const [hasMoreComment, setHasMoreComment] = useState(true);
  const { toast } = useToast();

  const handleDelete = (commentId) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments - 1
    }));

    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const loadMoreComments = async () => {
    if (!hasMoreComment) return;

    const response = await getComments(post_id, 11, offset);
    if (!response) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description:
          'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      return;
    }

    const newComments = response.data.comments || [];

    if (newComments.length > 10) {
      setComments((prevComments) => [
        ...prevComments,
        ...newComments.slice(0, 10)
      ]);
    } else {
      setComments((prevComments) => [...prevComments, ...newComments]);
      setHasMoreComment(false);
    }

    setOffset((prevOffset) => prevOffset + 10);
  };

  useEffect(
    () => {
      const fetchInitialComments = async () => {
        const response = await getComments(post_id, 11, 0);
        if (!response) {
          toast({
            title: 'hay aksi, bir şeyler ters gitti!',
            description:
              'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
            duration: 3000
          });
          return;
        }

        const initialComments = response.data.comments || [];

        if (initialComments.length > 10) {
          setComments(initialComments.slice(0, 10));
        } else {
          setComments(initialComments);
          setHasMoreComment(false);
        }
      };

      fetchInitialComments();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className='flex flex-col gap-5'>
      {comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onDelete={handleDelete}
            />
          ))}
          {hasMoreComment && (
            <Button onClick={loadMoreComments} className='w-full'>
              daha fazla yorum yükle
            </Button>
          )}
        </>
      ) : (
        <div className='flex flex-col items-center justify-center text-sm'>
          buralar şimdilik sessiz.
        </div>
      )}
    </div>
  );
}
