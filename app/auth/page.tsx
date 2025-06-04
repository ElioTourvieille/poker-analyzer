"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/auth-client';
import { unauthorized } from 'next/navigation';

export default async function AuthPage() {
    const user = await getUser();

    if (!user) return unauthorized();

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
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm">{user.email}</span>
                </div>
            </div>
            </CardContent>
        </Card>
    )
}
