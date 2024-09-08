import { useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Post from '@/components/app/Post';

export default function PostList({ fetchPosts }) {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(10);
  const [hasMorePost, setHasMorePost] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const loadMorePosts = async () => {
    if (!hasMorePost) return;

    const response = await fetchPosts(offset);
    if (!response) {
      toast({
        title: 'hay aksi, bir şeyler ters gitti!',
        description:
          'sunucudan yanıt alınamadı. lütfen daha sonra tekrar deneyin.',
        duration: 3000
      });
      return;
    }

    const newPosts = response.data.posts || [];

    if (newPosts.length > 10) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts.slice(0, 10)]);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMorePost(false);
    }

    setOffset((prevOffset) => prevOffset + 10);
  };

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true);
      const response = await fetchPosts(0);
      setLoading(false);

      if (!response) {
        toast({
          title: 'hay aksi, bir şeyler ters gitti!',
          description:
            'sunucudan yanıt alınamadı. Lütfen daha sonra tekrar deneyin.',
          duration: 3000
        });
        return;
      }

      const initialPosts = response.data.posts || [];

      if (initialPosts.length > 10) {
        setPosts(initialPosts.slice(0, 10));
      } else {
        setPosts(initialPosts);
        setHasMorePost(false);
      }
    };

    fetchInitialPosts();
  }, [fetchPosts, toast]);

  return (
    <div className='flex flex-col gap-2'>
      {loading && (
        <LoaderCircle className='mt-3 w-4 h-4 animate-spin self-center' />
      )}
      {!loading && posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} onDelete={handleDelete} />
          ))}
          {hasMorePost && (
            <Button onClick={loadMorePosts} className='w-full'>
              daha fazla göster
            </Button>
          )}
        </>
      ) : (
        !loading && (
          <div className='flex flex-col items-center justify-center text-sm'>
            buralar şimdilik sessiz.
          </div>
        )
      )}
    </div>
  );
}
