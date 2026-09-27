"use server"

import { addLapsCard } from "@/src/mongo/lapsCards.mongo"
import z from "zod"

export type AddLapCardActionDTO = {
    id?: number,
    unkownError?: true,
    errors?: string[]
}

async function extractData(formData: FormData) {
    return {
        swimmerId: z.string().parse(formData.get('swimmerId')?.toString()),
        laps: z.number().parse(parseInt(formData.get('laps')?.toString() || "")),
        isNightCup: z.boolean().parse(formData.get('isNightCup')?.toString() === "on"),
    }
}

export async function addLapCardAction(_initialState: AddLapCardActionDTO, formData: FormData): Promise<AddLapCardActionDTO> {
    const data = await extractData(formData);
    const result = await addLapsCard(data.swimmerId, data.laps, data.isNightCup);
    return { id: result.id };
}