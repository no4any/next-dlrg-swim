import z from "zod";
import { RegistrationType } from "../RegistrationType.zod";
import { SwimmerData } from "./SwimmerData.zod";

export const ManagedSwimmer = SwimmerData.extend({
    type: z.literal(RegistrationType.enum.MANAGED),
    email: z.email().optional(),
})

export type ManagedSwimmer = z.infer<typeof ManagedSwimmer>;