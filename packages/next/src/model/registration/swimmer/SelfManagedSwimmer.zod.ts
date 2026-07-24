import z from "zod";
import { SwimmerData } from "./SwimmerData.zod";
import { SwimmerType } from "./SwimmerType.zod";
import { MongoObjectId } from "../../MongoObjectId.zod";

export const SelfManagedSwimmer = SwimmerData.extend({
    type: z.literal(SwimmerType.enum.SELF_MANAGED),
    email: z.email(),
    team: MongoObjectId.optional()
})

export type SelfManagedSwimmer = z.infer<typeof SelfManagedSwimmer>;