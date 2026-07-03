import {z} from "zod";

export const User = z.object({ 
  username: z.string(),
  isAdmin: z.optional(z.boolean())
});

export type User = z.infer<typeof User>;