import { z } from "zod";

export const SignInFormSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});

export const SignUpFormSchema = z.object({
    name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
    confirmPassword: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export const HandFormSchema = z.object({
    heroPosition: z.string().min(2, "Indique une position"),
    stackSize: z.string().min(1, "Stack requis"),
    blindLevel: z.string().optional(),
    action: z.string().min(5, "Décris l'action"),
    villainInfo: z.string().optional(),
    result: z.string().optional(),
    notes: z.string().optional(),
  });

export type SignInValues = z.infer<typeof SignInFormSchema>; 
export type SignUpValues = z.infer<typeof SignUpFormSchema>;
export type HandValues = z.infer<typeof HandFormSchema>;