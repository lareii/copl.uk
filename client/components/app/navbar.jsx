"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { Home, Compass, Bell, User, Menu } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";

import { usePathname } from 'next/navigation';

export default function Navbar({ className }) {
  const pathname = usePathname();
  const isActive = (route) => pathname === route;

  return (
    <>
      <div className="flex justify-between items-center gap-2 lg:hidden">
        <Image src="/copluk.png" alt="copl.uk logo" width={100} height={100} className='w-32' />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="mt-5 mb-3 font-medium text-xs text-muted-foreground">genel</div>
            <div className="flex flex-col">
              <Button variant={isActive("/app") ? "secondary" : "ghost"} className="justify-start" asChild>
                <Link href="/app">
                  <Home className="mr-5 h-4 w-4" />
                  akış
                </Link>
              </Button>
              <Button variant={isActive("/app/explore") ? "secondary" : "ghost"} className="justify-start" asChild>
                <Link href="/app/explore">
                  <Compass className="mr-5 h-4 w-4" />
                  keşfet
                </Link>
              </Button>
              <Button variant={isActive("/app/notifications") ? "secondary" : "ghost"} className="justify-start" asChild>
                <Link href="/app/notifications">
                  <Bell className="mr-5 h-4 w-4" />
                  bildirimler
                </Link>
              </Button>
              <Button disabled variant="ghost" className="justify-start">
                <User className="mr-5 h-4 w-4" />
                profilim
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className={`max-lg:hidden flex flex-col gap-5 ${className}`}>
        <div className='mb-10'>
          <Image src="/copluk.png" alt="copl.uk logo" width={100} height={100} className='w-40 mb-1' />
          <div className="font-medium text-xs text-muted-foreground">zihin çöplüğün, kafana göre...</div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="mb-3 font-medium text-xs text-muted-foreground">genel</div>
          <div className="flex flex-col">
            <Button variant={isActive("/app") ? "secondary" : "ghost"} className="justify-start" asChild>
              <Link href="/app">
                <Home className="mr-5 h-4 w-4" />
                akış
              </Link>
            </Button>
            <Button variant={isActive("/app/explore") ? "secondary" : "ghost"} className="justify-start" asChild>
              <Link href="/app/explore">
                <Compass className="mr-5 h-4 w-4" />
                keşfet
              </Link>
            </Button>
            <Button variant={isActive("/app/notifications") ? "secondary" : "ghost"} className="justify-start" asChild>
              <Link href="/app/notifications">
                <Bell className="mr-5 h-4 w-4" />
                bildirimler
              </Link>
            </Button>
            <Button disabled variant="ghost" className="justify-start">
              <User className="mr-5 h-4 w-4" />
              profilim
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}