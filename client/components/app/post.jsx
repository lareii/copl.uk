import { Leaf, Ellipsis, Trash, X } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Post({ className }) {
  return (
    <div className="p-5 rounded-[var(--radius)] bg-zinc-900 border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-start">
          <div className="mr-3 w-10 h-10 rounded-lg bg-zinc-800"></div>
          <div className="flex flex-col mr-2">
            <div className="text-sm">emirhan</div>
            <div className="text-xs text-zinc-400">@larei</div>
          </div>
          <div className="flex items-center gap-1 py-1 px-2 w-fit rounded-md bg-zinc-800 text-xs text-zinc-400">
            <Leaf className="w-3 h-3 mr-0.5" />
            <div>nerv</div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="flex items-center text-red-500">
              <X className="h-4 w-4 mr-2" />
              <div>çöpü kaldır</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-zinc-400 text-sm">
        hello world.
      </div>
      <div className="mt-3 flex gap-3">
        <Button variant="ghost" className="px-1.5 h-7 text-xs">
          <Trash className="w-3 h-3 mr-2" />
          123
        </Button>
      </div>
    </div>
  );
}