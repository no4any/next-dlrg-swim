"use server"

import { auth, flat } from "@/src/lib"
import { getSwimmer, setSwimmerStatus } from "@/src/mongo/swimmer.mongo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function finishToggleAction(id: string) {
    const username = await auth();
    if (!username) redirect('/login');
    const swimmer = await getSwimmer(id);
    if (!swimmer) redirect('/admin/swimmers');
    if (swimmer.status === "ANNOUNCED") redirect(`/admin/swimmers`);
    if (swimmer.status === "REGISTERED") {
        await setSwimmerStatus(id, "FINISHED");
    } else {
        if (swimmer.status === "FINISHED") await setSwimmerStatus(id, "REGISTERED");
    }
    revalidatePath("/admin/swimmers");
    return await flat(await getSwimmer(id));
}