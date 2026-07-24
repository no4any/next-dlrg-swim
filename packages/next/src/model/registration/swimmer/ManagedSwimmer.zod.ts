import z from "zod";
import { SwimmerData } from "./SwimmerData.zod";
import { SwimmerType } from "./SwimmerType.zod";
import { MongoObjectId } from "../../MongoObjectId.zod";

export const ManagedSwimmer = SwimmerData.extend({
    type: z.literal(SwimmerType.enum.MANAGED),
    email: z.email().optional(),
    team: MongoObjectId
})

export type ManagedSwimmer = z.infer<typeof ManagedSwimmer>;