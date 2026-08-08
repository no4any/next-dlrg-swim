"use server"

import z from "zod";
import { RegsiterSwimmerFormData } from "./SetSwimmerRegistrationForm.component";
import { CapColor, MongoObjectId } from "@/src/model";
import { updateRegistrationForSwimmer as update } from "@/src/mongo/swimmer.mongo"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getLogin } from "@/src/lib";
import { errorTreat } from "./errorTreat.function";

async function getFormData(formData: FormData) {
    return {
        id: MongoObjectId.parse(formData.get('id')?.toString()),
        color: CapColor.parse(formData.get('color')?.toString()),
        capNr: z.coerce.number()
            .min(1, { error: "Badekappen Nummern müssen 1 oder größer sein" })
            .max(100, { error: "Badekappen Nummern müssen 100 oder kleiner sein" })
            .parse(formData.get('capNr')?.toString() ?? 0),
        regNr: z.coerce.number()
            .min(1, { error: "Nummern von Bändchen müssen 1 oder größer sein" })
            .max(999, { error: "Nummern von Bändchen müssen 999 oder kleiner sein" })
            .parse(formData.get('regNr')?.toString() ?? 0),
    }
}

export async function updateRegistrationForSwimmer(_initialData: RegsiterSwimmerFormData, formData: FormData): Promise<RegsiterSwimmerFormData> {
    const username = await getLogin();
    if (!username) return { errors: ["Sie müssen sich zuerst anmelden!"] }

    let ok = true;
    let data;
    
    try {
        data = await getFormData(formData);
        ok = await update(data.id, data.color, data.capNr, data.regNr);
    } catch (e) {
        return await errorTreat(e, data?.color as CapColor, data?.capNr ?? 0, data?.regNr ?? 0)
    }
    if (!ok) {
        return { errors: ["Schwimmer konnte nicht angemeldet werden!"] }
    }
    const path = `/admin/swimmers/${data.id.toString()}`;
    revalidatePath(path);
    redirect(path);
}