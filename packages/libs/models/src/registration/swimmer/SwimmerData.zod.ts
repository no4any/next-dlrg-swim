import z from "zod";
import { RegistrationStatus } from "./RegistrationStatus.zod.ts";

export const SwimmerData = z.object({
    status: RegistrationStatus,
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    gender: z.enum(["0", "M", "W"]).optional(),
    city: z.string().optional(),
    distanceRating: z.boolean().optional(),
    birthday: z.date().optional(),
    teamId: z.string().optional(),
    breakfast: z.boolean().optional(),
    optIn: z.boolean().optional(),
    publishName: z.boolean().optional(),
    capColor: z.string().optional(),
    capNr: z.number().min(1).max(100).optional(),
    regNr: z.number().min(1000).max(9999).optional(),
    newsletter: z.boolean().optional(),
})

export type SwimmerData = z.infer<typeof SwimmerData>;