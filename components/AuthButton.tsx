"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AuthButton() {
  const { data } = useSession();

  if (!data?.user) {
    return (
      <Button asChild>
        <Link href="/auth/signup">Connexion</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar>
            <AvatarFallback>{data.user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">{data.user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <button
            className="flex items-center gap-2 w-full"
            onClick={() => {
              authClient.signOut();
              window.location.href = "/auth/signin";
            }}
          >
            <LogOutIcon className="mr-2 size-4" />
            <span>Déconnexion</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
