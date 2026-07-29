import z from "zod";
import { RegistrationStatus } from "./RegistrationStatus.zod";
import { MongoObjectId } from "../../MongoObjectId.zod";
import { Team } from "../team";

export const SwimmerData = z.object({
    _id: MongoObjectId.optional(),
    status: RegistrationStatus.optional(),
    firstName: z.string().min(2, { error: "Der Vorname muss mindestens 2 Buchstaben haben" }).max(255, {error: "Der Vorname darf nicht mehr als 255 Buchstaben haben" }),
    lastName: z.string().min(2, { error: "Der Nachname muss mindestens 2 Buchstaben haben" }).max(255, {error: "Der Nachname darf nicht mehr als 255 Buchstaben haben" }),
    gender: z.enum(["0", "M", "W"]).optional(),
    city: z.string().min(2, { error: "Der Ort muss mindestens 2 Buchstaben haben" }).max(255, {error: "Der Ort darf nicht mehr als 255 Buchstaben haben" }).optional(),
    //    distanceRating: z.boolean().optional(),
    birthday: z.iso.date().optional(),
    breakfast: z.boolean().optional(),
    //    optIn: z.boolean().optional(),
    publishName: z.boolean().optional(),
    capColor: z.string().optional(),
    capNr: z.number().min(1).max(100).optional(),
    regNr: z.number().min(1000).max(9999).optional(),
    newsletter: z.boolean().optional(),
    team: Team.optional()
})

export type SwimmerData = z.infer<typeof SwimmerData>;