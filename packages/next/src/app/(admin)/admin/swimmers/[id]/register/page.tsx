import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { notFound } from "next/navigation";
import { flat } from "@/src/lib";
import { SetSwimmerRegistrationForm } from "@/src/components/forms/setSwimmerRegistration/SetSwimmerRegistrationForm.component";
import { registerSwimmer } from "@/src/components/forms/setSwimmerRegistration/registerSwimmer.action";
import { connection } from "next/server";

export const instant = false

export default async function RegisterSwimmerPage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;
    const swimmer = await getSwimmer(id);
    
    if (!swimmer) notFound();
    if (swimmer.status !== "ANNOUNCED") notFound();

    return <div>
        <h1>Schwimmer anmelden: {swimmer.firstName} {swimmer.lastName}</h1>
        <SetSwimmerRegistrationForm swimmer={await flat(swimmer)} action={registerSwimmer}/>
    </div>
}