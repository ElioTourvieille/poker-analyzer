import { auth } from "@/lib/auth";

// components/AuthButton.tsx
import Link from "next/link";
import { getUser } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOutIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const user = await getUser();

  if (!user) {
    return (
      <Button>
        <Link href="/auth/signup">Connexion</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar>
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">{user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <form>
            <button className="flex items-center gap-2 w-full" formAction={async () => {
              "use server";

              await auth.api.signOut({
                headers: await headers()
              })

              redirect("/auth/signin")
            }}>
              <LogOutIcon className="mr-2 size-4" />
              <span>Déconnexion</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}