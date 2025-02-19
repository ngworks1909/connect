import Link from "next/link";
import { getServerSession } from "next-auth";
import { Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DropDownItems from "./DropDownItems";


export default async function Navbar() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white bg-opacity-80 backdrop-blur-[5px] border-b shadow-sm">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Headset className="h-6 w-6 text-gray-700" />
              <span className="text-xl font-bold text-gray-700">CONNECT</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {session && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    
                  <div className="inline-flex items-center justify-center rounded-full bg-gray-200 p-0.5">
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage 
                          src={session.user.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"} 
                          alt={session.user.name || "User"} 
                        />
                        <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                  </div>

                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="flex flex-col items-start">
                    <div className="text-sm font-medium">Signed in as</div>
                    <div className="text-xs text-gray-500 truncate w-full">{session.user.email}</div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropDownItems />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}