import { ObjectId } from "mongodb";
import z from "zod";

export const WithMongoId = z.object({
    _id: z.union([z.string(), z.instanceof(ObjectId)]).optional()
})

export type WithMongoId = z.infer<typeof WithMongoId>;