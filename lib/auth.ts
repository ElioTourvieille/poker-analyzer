import { convexAdapter } from "@better-auth-kit/convex";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { ConvexHttpClient } from "convex/browser";

const convexClient = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL || ""
);

export const auth = betterAuth({
  database: convexAdapter(convexClient),
  socialProviders: {
    discord: { 
        clientId: process.env.DISCORD_CLIENT_ID as string, 
        clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt()],
  emailAndPassword: {
    enabled: true,
  },
});
