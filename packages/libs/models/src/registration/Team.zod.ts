import z from "zod";
import { RegistrationType } from "./RegistrationType.zod.ts";

export const Team = z.object({
    type: z.literal(RegistrationType.enum.TEAM),
    email: z.email(),
    optIn: z.boolean().optional(),
})

export type Team = z.infer<typeof Team>;