import { Card, CardTitle, CardHeader, CardFooter } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import SignupForm from './signin-form'
import Link from 'next/link'

export default function SignupPage() {
  return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Connexion</CardTitle>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
            <CardFooter>
                <p className='text-sm text-muted-foreground'>Vous n&apos;avez pas de compte ?{" "}
                    <Link href="/auth/signup" className='text-blue-500 hover:underline'>
                        Inscription
                    </Link>
                </p>
            </CardFooter>
        </Card>
  )
}
