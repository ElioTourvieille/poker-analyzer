import { Card, CardTitle, CardHeader, CardFooter } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import SignupForm from './signup-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SignupPage() {
  return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Inscription</CardTitle>
            </CardHeader>
            <CardContent>
                <SignupForm />
            </CardContent>
            <CardFooter>
                <p className='text-sm text-muted-foreground'>Vous avez déjà un compte ?{" "}
                    <Link href="/auth/signin" className='text-blue-500'>
                        <Button variant="link" className='p-0 text-sm text-blue-500'>Connexion</Button>
                    </Link>
                </p>
            </CardFooter>
        </Card>
  )
}
