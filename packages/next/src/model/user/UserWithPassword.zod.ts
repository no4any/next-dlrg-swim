import {z} from "zod";
import { User } from "./User.zod";

export const UserWithPassword = User.extend({ 
  password: z.string()
});

export type UserWithPassword = z.infer<typeof UserWithPassword>;