import {z} from "zod";
import { ManagedSwimmer } from "./ManagedSwimmer.zod";
import { SelfManagedSwimmer } from "./SelfManagedSwimmer.zod";

export const Swimmer = z.discriminatedUnion("type", [
    SelfManagedSwimmer,
    ManagedSwimmer
]);

export type Swimmer = z.infer<typeof Swimmer>;
export type SwimmerInput = z.input<typeof Swimmer>;