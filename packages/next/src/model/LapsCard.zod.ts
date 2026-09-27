import z from "zod"
import { MongoObjectId } from "./MongoObjectId.zod";

export const LapsCard = z.object({
    _id: MongoObjectId.nullish(),
    id: z.number().min(0),
    laps: z.number().min(1),
    swimmerId: MongoObjectId,
    isNightCup: z.boolean().nullish(),
    editor: z.string()
})

export type LapsCard = z.infer<typeof LapsCard>;