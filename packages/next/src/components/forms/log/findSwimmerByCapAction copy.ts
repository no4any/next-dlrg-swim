"use server"

import { getSwimmerByCap, getSwimmerByRegNr } from "@/src/mongo/swimmer.mongo"
import { redirect } from "next/navigation";
import { auth } from "@/src/lib";
import { FindSwimmerByCapColorFormProps } from "./FindSwimmerByCapForm.component";

export async function findSwimmerByCapAction(_initialState: FindSwimmerByCapColorFormProps, formData: FormData): Promise<FindSwimmerByCapColorFormProps> {
    await auth();

    const capColor = formData.get('capColor')?.toString();
    const capNrString = formData.get('capNr')?.toString();
    const capNr = parseInt(capNrString || '0');

    if(typeof capColor !== 'string' || typeof capNr !== 'number') {
        return {errors: ["Falsche Eingabewerte für Farbe oder Zahl"]}
    }

    const swimmer = await getSwimmerByCap(capNr, capColor as any);

    if(!swimmer) {
        return {errors: [`Swimmer mit Badekappe ${capColor} ${capNr} nicht gefunden`]}
    }

    redirect(`/admin/log/${swimmer._id.toString()}`)
}