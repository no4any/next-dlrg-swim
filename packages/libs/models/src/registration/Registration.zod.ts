import {z} from "zod";
import { Team } from "./Team.zod.ts";
import { ManagedSwimmer, Swimmer } from "./swimmer/index.ts";

export const Registration = z.discriminatedUnion("type", [
    Team,
    Swimmer,
    ManagedSwimmer
]);

export type Registration = z.infer<typeof Registration>;