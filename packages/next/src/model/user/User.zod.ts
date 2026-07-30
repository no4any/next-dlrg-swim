import {z} from "zod";
import { MongoObjectId } from "../MongoObjectId.zod";

export const User = z.object({
  _id: MongoObjectId.nullish(),
  email: z.string(),
  isAdmin: z.optional(z.boolean())
});

export type User = z.infer<typeof User>;