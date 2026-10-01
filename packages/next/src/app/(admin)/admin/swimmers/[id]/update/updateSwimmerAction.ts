"use server"

import { auth } from "@/src/lib";
import { UpdateSwimmerFormState } from "./UpdateSwimmerForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z, { ZodError } from "zod";
import { MongoObjectId } from "@/src/model";
import { updateSwimmer } from "@/src/mongo/swimmer.mongo";

const DTO = z.object({
    id: MongoObjectId,
    firstname: z.string().min(3).max(255),
    lastname: z.string().min(3).max(255),
    birthday: z.iso.date().nullish(),
    city: z.string().min(0).max(255),
    gender: z.enum(["0", "M", "W"]),
    noPublishName: z.boolean(),
    breakfast: z.boolean(),
    newsletter: z.boolean()
})

export async function updateSwimmerAction(_initialData: unknown, formData: FormData): Promise<UpdateSwimmerFormState> {
    await auth();
    let id;
    try {
        const obj = Object.fromEntries(formData);
        console.log(obj);
        const validObj = DTO.parse({
            ...obj,
            birthday: obj.birthday.toString().length ? obj.birthday : undefined,
            noPublishName: obj.noPublishName === "on",
            breakfast: obj.breakfast === "on",
            newsletter: obj.newsletter === "on",
        });
        id = validObj.id;
        const result = await updateSwimmer(id, {
            firstName: validObj.firstname,
            lastName: validObj.lastname,
            birthday: validObj.birthday,
            city: validObj.city,
            gender: validObj.gender,
            publishName: !validObj.noPublishName,
            breakfast: validObj.breakfast,
            newsletter: validObj.newsletter
        })
        console.log(result);
        if (result.modifiedCount <= 0) return { errors: ['Unbekannter fehler!'] }
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                errors: e.issues.map((issue) => issue.message)
            }
        }
        console.log(e);
        return { errors: ['Unbekannter fehler!'] }
    }

    revalidatePath('/admin');
    redirect(`/admin/swimmers/${id.toString()}`);
}