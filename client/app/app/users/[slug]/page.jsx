"use client";

import { Suspense, useState, useEffect } from "react";
import { Cake, Info, Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

import { getUser } from "@/lib/api/users/get";
import { Post, PostSkeleton } from "@/components/app/post";

import { Skeleton } from "@/components/ui/skeleton";

export default function Page({ params }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(params);
      setUser(response.data.user);
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-72">
        <div className="rounded-[var(--radius)] bg-zinc-900 h-60"></div>
        <div className="left-14 bottom-1 absolute w-28 h-28 rounded-[var(--radius)] bg-zinc-900 outline outline-4 outline-zinc-950"></div>
      </div>
      {user ? (
        <>
          <div className="mt-3 mb-5">
            <div className="flex gap-2">
              <div className="text-xl font-bold">{user.name}</div>
              <div className="flex items-center gap-1 py-1 px-2 w-fit rounded-md bg-zinc-800 text-xs text-zinc-400">
                <Leaf className="w-3 h-3 mr-0.5" />
                <div>nerv</div>
              </div>
            </div>
            <div className="text-zinc-400 text-sm">@{user.username}</div>
          </div>
          <div>
            <div className="mb-5">
              <div className="text-zinc-400 text-xs flex items-center">
                <Info className="w-4 h-4 mr-1" />
                hakkında
              </div>
              <div className="text-sm">{user.about}</div>
            </div>
            <div className="text-xs">
              <div className="text-zinc-400 flex items-center mb-0.5">
                <Cake className="w-4 h-4 mr-1" />
                şu tarihte katıldı
              </div>
              {new Date(user.created_at.T * 1000).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 mb-5">
            <div className="flex gap-2 mb-1">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-14 h-6" />
            </div>
            <Skeleton className="w-16 h-4" />
          </div>
          <div className="mb-5">
            <Skeleton className="w-16 h-3 mb-1" />
            <Skeleton className="w-36 h-4" />
          </div>
          <div>
            <Skeleton className="w-32 h-3 mb-1" />
            <Skeleton className="w-28 h-3" />
          </div>
        </>
      )
      }
      <div className="mt-7 flex flex-col gap-y-3">
        <div className="text-xs text-zinc-400">gönderiler</div>
        <Suspense fallback={<PostSkeleton />}>
          <Post />
        </Suspense>
        <Suspense fallback={<PostSkeleton />}>
          <Post />
        </Suspense>
      </div>
    </div>
  )
}