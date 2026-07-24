import z from "zod";
import { TeamType } from "./TeamType.zod";
import { MongoObjectId } from "../../MongoObjectId.zod";

export const Team = (z.object({
    _id: MongoObjectId.optional(),
    teamType: TeamType,
    email: z.email().max(255),
    name: z.string().min(3).max(255),
    nameLower: z.string().min(3).max(255),
    managerName: z.string().min(3).max(255)
}))

export type Team = z.infer<typeof Team>;