import { betterAuth } from "better-auth";
import { convexAdapter } from "@better-auth-kit/convex";
import { ConvexHttpClient } from "convex/browser";
import { jwt } from "better-auth/plugins";
 
const convexClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");
 
export const auth = betterAuth({
  database: convexAdapter(convexClient),
  plugins: [jwt()],
  emailAndPassword: {  
    enabled: true
},
});