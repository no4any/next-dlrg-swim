import { z } from "zod";

export const MongoObjectId = z.union([
    z.string(),
    z.object({ toString: z.function().output(z.string()) })
]);

export type MongoObjectId = z.infer<typeof MongoObjectId>;