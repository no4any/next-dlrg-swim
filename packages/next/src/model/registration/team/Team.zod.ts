import z from "zod";
import { TeamType } from "./TeamType.zod";
import { MongoObjectId } from "../../MongoObjectId.zod";
import { Comment } from "../Comment.zod";

export const Team = (z.object({
    _id: MongoObjectId.nullish(),
    teamType: TeamType,
    email: z.email({error: "Keine valide E-Mail."}).toLowerCase().trim().max(255, {error: "Die E-Mail ist zu Lang. Sie muss maximal 255 Buchstaben haben."}),
    name: z.string().trim().min(3, {error: "Der Teamname ist zu Kurz. Er muss mindestens 3 Buchstaben haben."}).max(255, {error: "Der Teamname ist zu Lang. Er muss maximal 255 Buchstaben haben."}),
    nameLower: z.string().trim().toLowerCase().min(3).max(255),
    managerName: z.string().trim().min(3, {error: "Der Name des Teammanagers ist zu Kurz. Er muss mindestens 3 Buchstaben haben."}).max(255, {error: "Der Name des Teammanagers ist zu Lang. Er muss maximal 255 Buchstaben haben."}),
    comments: z.array(Comment).nullish()
}))

export type TeamInput = z.input<typeof Team>;
export type Team = z.infer<typeof Team>;