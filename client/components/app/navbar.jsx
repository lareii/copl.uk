"use client";

import React, { useState, useEffect } from 'react';
import { Home, Compass, Bell, User, Menu, ChevronUp } from "lucide-react";
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { me } from '@/lib/api/auth/me';
import { logout } from '@/lib/api/auth/logout';

const NavItem = ({ href, icon: Icon, label, isActive }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
    router.refresh();
  };

  return (
    <Button variant={isActive ? "secondary" : "ghost"} className="justify-start" onClick={handleClick}>
      <Icon className="mr-5 h-4 w-4" />
      {label}
    </Button>
  );
};

export default function Navbar({ className }) {
  const router = useRouter();
  const pathname = usePathname();
  const [icon, setIcon] = useState(<Home className='h-4 w-4' />);
  const [user, setUser] = useState(null);
  const isActive = (route) => pathname === route;

  useEffect(() => {
    if (pathname === "/app") {
      setIcon(<Home className='h-4 w-4' />);
    } else if (pathname === "/app/explore") {
      setIcon(<Compass className='h-4 w-4' />);
    } else if (pathname === "/app/notifications") {
      setIcon(<Bell className='h-4 w-4' />);
    } else {
      setIcon(<Menu className='h-4 w-4' />);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await me();
      setUser(response.data.user);
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center gap-2 lg:hidden">
        <Image src="/copluk.png" alt="copl.uk logo" width={120} height={120} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              {/* <Menu className="h-4 w-4" /> */}
              {icon}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col justify-between">
            <div className="mt-5">
              <div className="mb-3 font-medium text-xs text-muted-foreground">genel</div>
              <div className="flex flex-col">
                <NavItem href="/app" icon={Home} label="akış" isActive={isActive("/app")} />
                <NavItem href="/app/explore" icon={Compass} label="keşfet" isActive={isActive("/app/explore")} />
                <NavItem href="/app/notifications" icon={Bell} label="bildirimler" isActive={isActive("/app/notifications")} />
              </div>
            </div>
            <div className="flex flex-col">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="justify-start flex justify-between items-center">
                    <div className="flex items-center">
                      <User className="mr-5 h-4 w-4" />
                      profilim
                    </div>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex items-start">
                    <div className="mr-3 w-10 h-10 rounded-lg bg-zinc-800"></div>
                    <div className="flex flex-col mr-2">
                      <div className="text-sm">user.name</div>
                      <div className="text-xs text-zinc-400">@{user ? user.username : "user.username"}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>profile git</DropdownMenuItem>
                  <DropdownMenuItem onClick={
                    async (e) => {
                      e.preventDefault();
                      const response = await logout();

                      if (!response) {
                        toast({
                          title: "Hay aksi, bir şeyler ters gitti!",
                          description: "Sunucudan yanıt alınamadı. Lütfen daha sonra tekrar deneyin.",
                          duration: 3000
                        });
                        return;
                      }

                      router.push("/login");
                      router.refresh();
                    }
                  }>
                    çıkış yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <hr className="mb-5 mt-3" />
              <div>
                <Image src="/copluk.png" alt="copl.uk logo" width={120} height={120} />
                <div className="text-zinc-400 text-xs mt-3">
                  <div>copl.uk GNU GPL v3 lisansı altında lisanslanmıştır.</div>
                  <Link href="#" className="underline">hakkında</Link>{" "}
                  <Link href="#" className="underline">gizlilik politikası</Link>{" "}
                  <Link href="#" className="underline">kaynak kodları</Link>{" "}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className={`max-lg:hidden flex flex-col gap-5 ${className}`}>
        <div className='mb-5'>
          <Image src="/copluk.png" alt="copl.uk logo" width={170} height={170} className='mb-1' />
          <div className="font-medium text-xs text-muted-foreground">zihin çöplüğün, kafana göre...</div>
        </div>
        <div className="flex flex-col justify-between grow">
          <div>
            <div className="mb-3 font-medium text-xs text-muted-foreground">genel</div>
            <div className="flex flex-col">
              <NavItem href="/app" icon={Home} label="akış" isActive={isActive("/app")} />
              <NavItem href="/app/explore" icon={Compass} label="keşfet" isActive={isActive("/app/explore")} />
              <NavItem href="/app/notifications" icon={Bell} label="bildirimler" isActive={isActive("/app/notifications")} />
            </div>
          </div>
          <div className="flex flex-col">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="justify-start flex justify-between items-center">
                  <div className="flex items-center">
                    <User className="mr-5 h-4 w-4" />
                    profilim
                  </div>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-start">
                  <div className="mr-3 w-10 h-10 rounded-lg bg-zinc-800"></div>
                  <div className="flex flex-col mr-2">
                    {user ? (
                      <>
                        <div className="text-sm">{user.name}</div>
                        <div className="text-xs text-zinc-400">@{user.username}</div>
                      </>
                    ) : (
                      <>
                        <Skeleton className="w-20 h-4 mb-1 bg-zinc-800" />
                        <Skeleton className="w-10 h-3 bg-zinc-800" />
                      </>
                    )
                    }
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>profile git</DropdownMenuItem>
                <DropdownMenuItem onClick={
                  async (e) => {
                    e.preventDefault();
                    logout();
                    router.push("/login");
                    router.refresh();
                  }
                }>
                  çıkış yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <hr className="mb-3 mt-2" />
            <div className="text-zinc-400 text-xs">
              <div>copl.uk GNU GPL v3 lisansı altında lisanslanmıştır.</div>
              <Link href="#" className="underline">hakkında</Link>{" "}
              <Link href="#" className="underline">gizlilik politikası</Link>{" "}
              <Link href="#" className="underline">kaynak kodları</Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}