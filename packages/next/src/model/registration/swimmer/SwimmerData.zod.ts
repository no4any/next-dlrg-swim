import z from "zod";
import { RegistrationStatus } from "./RegistrationStatus.zod";
import { MongoObjectId } from "../../MongoObjectId.zod";

export const SwimmerData = z.object({
    _id: MongoObjectId.nullish(),
    status: RegistrationStatus,
    firstName: z.string()
        .trim()
        .min(2, { error: "Der Vorname muss mindestens 2 Buchstaben haben" })
        .max(255, { error: "Der Vorname darf nicht mehr als 255 Buchstaben haben" }),
    lastName: z.string()
        .trim()
        .min(2, { error: "Der Nachname muss mindestens 2 Buchstaben haben" })
        .max(255, { error: "Der Nachname darf nicht mehr als 255 Buchstaben haben" }),
    gender: z.enum(["0", "M", "W"]),
    city: z.string()
        .trim()
        .min(2, { error: "Der Ort muss mindestens 2 Buchstaben haben" })
        .max(255, { error: "Der Ort darf nicht mehr als 255 Buchstaben haben" }).nullish(),
    birthday: z.iso.date().nullish(),
    breakfast: z.boolean().nullish(),
    publishName: z.boolean().nullish(),
    capColor: z.string().nullish(),
    capNr: z.number().min(1).max(100).nullish(),
    regNr: z.number().min(1000).max(9999).nullish(),
    newsletter: z.boolean().nullish(),
})

export type SwimmerData = z.infer<typeof SwimmerData>;