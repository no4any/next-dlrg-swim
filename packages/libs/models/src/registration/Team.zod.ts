import z from "zod";
import { RegistrationType } from "./RegistrationType.zod.ts";
import { MongoId } from "../MongoId.zod.ts";

export const Team = (z.object({
    _id: MongoId.optional(),
    type: z.literal(RegistrationType.enum.TEAM),
    email: z.email(),
    name: z.string().min(3).max(255),
    manager: z.string().min(1),
    optIn: z.boolean().optional(),
}))

export type Team = z.infer<typeof Team>;