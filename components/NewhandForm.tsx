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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "./providers/auth-provider";
import { HandValues, HandFormSchema } from "@/lib/validations/schema";

export function NewHandForm({ groupId }: { groupId: string }) {
  const { data: session } = useAuth();
  const form = useForm<HandValues>({
    resolver: zodResolver(HandFormSchema),
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

  const onSubmit = async (values: HandValues) => {
    try {
      if (!session?.session?.token) {
        toast.error("Non authentifié");
        return;
      }

      await addHand({
        userId: session.user.id as Id<"users">,
        groupId: groupId as Id<"groups">,
        stackSize: Number(values.stackSize),
        actions: [values.action],
        vilainInfo: values.villainInfo,
        result: values.result,
        notes: values.notes,
        sessionToken: session.session.token,
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
