import z from "zod";
import { RegistrationType } from "../RegistrationType.zod.ts";
import { SwimmerData } from "./SwimmerData.zod.ts";

export const ManagedSwimmer = SwimmerData.extend({
    type: z.literal(RegistrationType.enum.MANAGED),
    email: z.email().optional(),
})

export type ManagedSwimmer = z.infer<typeof ManagedSwimmer>;