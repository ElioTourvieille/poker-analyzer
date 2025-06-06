"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { unauthorized } from "next/navigation";

export default function AuthPage() {
  const { data, isPending } = useSession();

  if (isPending) {
    return <Loader2Icon className="w-20 h-20 animate-spin text-primary" />;
  }

  if (!data?.user) {
    return unauthorized();
  }

  const user = data.user;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Profil</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Nom</span>
            <span className="text-sm">{user.name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Email</span>
            {user.emailVerified ? <CheckIcon className="w-4 h-4" /> : null}
            </div>
            <span className="text-sm">{user.email}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
