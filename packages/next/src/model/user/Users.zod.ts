import {z} from "zod";
import { User } from "./User.zod";

export const Users = z.array(User);

export type Users = z.infer<typeof Users>;