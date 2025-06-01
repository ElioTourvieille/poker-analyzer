"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
  heroPosition: z.string().min(2, "Indique une position"),
  stackSize: z.string().min(1, "Stack requis"),
  blindLevel: z.string().optional(),
  action: z.string().min(5, "Décris l'action"),
  villainInfo: z.string().optional(),
  result: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function NewHandForm({ groupId }: { groupId: string }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroPosition: "",
      stackSize: "",
      blindLevel: "",
      action: "",
      villainInfo: "",
      result: "",
      notes: "",
    },
  });

  const addHand = useMutation(api.Hands.createHand);

  const onSubmit = async (values: FormValues) => {
    try {
      await addHand({
        userId: "TODO", // You'll need to get the actual user ID
        groupId: groupId as Id<"groups">,
        stackSize: Number(values.stackSize),
        actions: [values.action],
        vilainInfo: values.villainInfo,
        result: values.result,
        notes: values.notes,
      });
      form.reset();
      toast.success("Main enregistrée");
    } catch (err) {
      toast.error("Impossible d'enregistrer la main");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="heroPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="BTN, CO, HJ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stackSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stack size</FormLabel>
              <FormControl>
                <Input placeholder="ex: 23bb" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="blindLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau de blindes</FormLabel>
              <FormControl>
                <Input placeholder="ex: 100/200/200" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <FormControl>
                <Textarea placeholder="Déroulé de la main..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="villainInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Info Villain</FormLabel>
              <FormControl>
                <Input placeholder="Profil, dynamique, tells..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="result"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Résultat</FormLabel>
              <FormControl>
                <Input placeholder="Gagné, perdu, showdown..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Réflexion / Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Ce que tu aurais pu faire autrement..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Enregistrer la main</Button>
      </form>
    </Form>
  );
}
