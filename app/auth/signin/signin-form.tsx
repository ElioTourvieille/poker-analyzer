"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormMessage } from '@/components/ui/form';
import { FormControl, FormField, FormItem, FormLabel, Form } from '@/components/ui/form';
import { SignInValues } from '@/lib/validations/schema'
import { SignInFormSchema } from '@/lib/validations/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { getErrorMessage } from '@/lib/error-translations';

export default function SigninForm() {
  const router = useRouter();
  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await signIn.email({
        email: values.email,
        password: values.password,
    }, {
        onRequest: () => {
            toast.loading('Connexion en cours...')
            form.reset()
        },
        onSuccess: () => {
            toast.dismiss()
            router.push('/auth')
            router.refresh()
            toast.success('Connexion réussie')
        },
        onError: (error) => {
          toast.dismiss()
          const translatedMessage = getErrorMessage(error.error.code);
          toast.error(translatedMessage || error.error.message)
        }
    })
  }

  async function onDiscordSignIn() {
     await signIn.social(
      { 
        provider: "discord", 
        callbackURL: "/auth" 
      }, {
        onSuccess: () => {},
        onError: (error) => {
          toast.error(error.error.message)
      }
    })
  }

  return (
    <div className='flex flex-col items-center gap-4'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full'>Connexion</Button>
      </form>
      <p className='text-sm text-muted-foreground'>Ou</p>
      <Button 
        variant="outline"
        onClick={() => onDiscordSignIn()}
        className="bg-[#5865F2] hover:bg-[#5865F2]/80 text-white"
      >
        <DiscordLogoIcon className='w-4 h-4 mr-2' /> Connexion avec Discord
      </Button>
    </Form>
    </div>
  )
}
