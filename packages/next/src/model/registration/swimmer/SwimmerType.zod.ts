import { z } from "zod";

export const SwimmerType = z.enum([
    "SELF_MANAGED",
    "MANAGED"
]);

export type SwimmerType = z.infer<typeof SwimmerType>;