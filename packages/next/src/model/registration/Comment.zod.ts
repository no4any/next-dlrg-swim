import z from "zod";
import { MongoObjectId } from "../MongoObjectId.zod";

export const Comment = z.object({
    _id: MongoObjectId.nullish(),
    author: z.email({error: "Author ist nicht im korrekten E-Mail Format"}).trim().toLowerCase(),
    time: z.number(),
    message: z.string().trim().min(3, {error: "Nachricht ist zu kurz (mindestens 3 Zeichen)"}).max(512, {error: "Kommentar ist zu lang (maximal 512 Zeichen)"})
})

export type Comment = z.infer<typeof Comment>