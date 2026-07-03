import {z} from "zod";
import { Team } from "./Team.zod";
import { ManagedSwimmer, Swimmer } from "./swimmer";

export const Registration = z.discriminatedUnion("type", [
    Team,
    Swimmer,
    ManagedSwimmer
]);

export type Registration = z.infer<typeof Registration>;