"use server"

import { auth } from "@/src/lib"
import { redirect } from "next/navigation";
import { ChangeLogFormStateProps } from "./ChangeLogForm.component";
import z from "zod";
import { updateLapsCard } from "@/src/mongo/lapsCards.mongo";

export async function changeLogAction(_initialData: ChangeLogFormStateProps, formData: FormData): Promise<ChangeLogFormStateProps> {
    const user = await auth();

    const laps = z.number().parse(parseInt(formData.get('laps')?.toString() || '0'));
    const id = z.string().parse(formData.get('id')?.toString() || '0');
    const isNightCup = formData.get('isNightCup')?.toString() === "on";

    await updateLapsCard(id, laps, isNightCup);

    redirect('/admin/loggings')
}