"use client";

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormMessage } from '@/components/ui/form';
import { FormControl, FormField, FormItem, FormLabel, Form } from '@/components/ui/form';
import { SignUpValues } from '@/lib/validations/schema'
import { SignUpFormSchema } from '@/lib/validations/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error-translations';

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpValues) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await signUp.email({
        email: values.email,
        name: values.name,
        password: values.password,
    }, {
        onRequest: () => {
            toast.loading('Inscription en cours...')
            form.reset()
        },
        onSuccess: () => {
            toast.dismiss()
            router.push('/auth')
            toast.success('Inscription réussie')
        },
        onError: (error) => {
            toast.dismiss()
            const translatedMessage = getErrorMessage(error.error.code);
            toast.error(translatedMessage || error.error.message)
        }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />        
        <Button type="submit">S'inscrire</Button>
      </form>
    </Form>
  )
}
