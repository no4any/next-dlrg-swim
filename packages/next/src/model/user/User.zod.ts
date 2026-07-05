import {z} from "zod";
import { MongoObjectId } from "../MongoObjectId.zod";

export const User = z.object({
  _id: MongoObjectId.optional(),
  username: z.string(),
  isAdmin: z.optional(z.boolean())
});

export type User = z.infer<typeof User>;