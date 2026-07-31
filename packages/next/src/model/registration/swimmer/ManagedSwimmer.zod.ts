import z from "zod";
import { SwimmerData } from "./SwimmerData.zod";
import { SwimmerType } from "./SwimmerType.zod";
import { MongoObjectId } from "../../MongoObjectId.zod";
import { SwimmerInput } from "./Swimmer.zod";

export const ManagedSwimmer = SwimmerData.extend({
    type: z.literal(SwimmerType.enum.MANAGED),
    email: z.email({ error: "Keine valide E-Mail" })
        .trim()
        .max(255, { error: "E-Mail ist zu lang. Maximal 255 Zeichen sind zulässig." })
        .toLowerCase()
        .nullish(),
    teamId: MongoObjectId
})

export type ManagedSwimmer = z.infer<typeof ManagedSwimmer>;