"use server"

import { getSwimmerByRegNr } from "@/src/mongo/swimmer.mongo"
import { FindSwimmerByRegNrFormProps } from "./FindSwimmerByRegNrForm.component"
import { redirect } from "next/navigation";
import { auth } from "@/src/lib";

export async function findSwimmerByRegNrAction(_initialState: FindSwimmerByRegNrFormProps, formData: FormData): Promise<FindSwimmerByRegNrFormProps> {
    await auth();
    
    const regNrString = formData.get('regNr')?.toString();
    const regNr = parseInt(regNrString || '')

    if(typeof regNr !== 'number') {
        return {errors: ['RegNr ist erforderlich']}
    }

    const swimmer = await getSwimmerByRegNr(regNr)

    if(!swimmer) {
        return {errors: [`Swimmer mit Registriernummer ${regNr} nicht gefunden`]}
    }

    redirect(`/admin/log/${swimmer._id.toString()}`)
}