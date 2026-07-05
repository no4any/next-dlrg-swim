import z from "zod";
import { SwimmerData } from "./SwimmerData.zod";
import { SwimmerType } from "./SwimmerType.zod";

export const SelfManagedSwimmer = SwimmerData.extend({
    type: z.literal(SwimmerType.enum.SELF_MANAGED),
    email: z.email(),
    team: z.string().optional()
})

export type SelfManagedSwimmer = z.infer<typeof SelfManagedSwimmer>;