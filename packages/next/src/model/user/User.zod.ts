import {z} from "zod";
import { MongoObjectId } from "../MongoObjectId.zod";

export const User = z.object({
  _id: MongoObjectId.nullish(),
  email: z.string().trim().toLowerCase(),
  isAdmin: z.boolean().nullish()
});

export type User = z.infer<typeof User>;