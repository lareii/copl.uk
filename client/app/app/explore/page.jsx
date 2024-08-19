import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Posts from '@/app/app/explore/components/Posts';

export default function Page() {
  return (
    <div className='flex flex-col gap-2'>
      <Tabs defaultValue='posts' >
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='posts'>çöpler</TabsTrigger>
          <TabsTrigger value='guilds'>çöplükler</TabsTrigger>
          <TabsTrigger value='users'>çöpçüler</TabsTrigger>
        </TabsList>
        <TabsContent value='posts'>
          <Posts />
        </TabsContent>
        <TabsContent value='guilds'>2</TabsContent>
        <TabsContent value='users'>3</TabsContent>
      </Tabs>
    </div>
  );
}


