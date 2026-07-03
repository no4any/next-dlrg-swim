import z from "zod";
import { SwimmerData } from "./SwimmerData.zod";
import { RegistrationType } from "../RegistrationType.zod";

export const Swimmer = SwimmerData.extend({
    type: z.literal(RegistrationType.enum.INDIVIDUAL),
    email: z.email(),
})

export type Swimmer = z.infer<typeof Swimmer>;