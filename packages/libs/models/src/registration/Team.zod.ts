import z from "zod";
import { RegistrationType } from "./RegistrationType.zod.ts";

export const Team = z.object({
    type: z.literal(RegistrationType.enum.TEAM),
    email: z.email(),
})

export type Team = z.infer<typeof Team>;