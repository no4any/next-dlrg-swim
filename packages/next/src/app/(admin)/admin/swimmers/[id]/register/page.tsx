import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { notFound } from "next/navigation";
import { flat } from "@/src/lib";
import { SetSwimmerRegistrationForm } from "@/src/components/forms/setSwimmerRegistration/SetSwimmerRegistrationForm.component";
import { registerSwimmer } from "@/src/components/forms/setSwimmerRegistration/registerSwimmer.action";

export default async function RegisterSwimmerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const swimmer = await getSwimmer(id);
    if (!swimmer) notFound();
    if (swimmer.status !== "ANNOUNCED") notFound();

    return <div>
        <h1>Schwimmer anmelden: {swimmer.firstName} {swimmer.lastName}</h1>
        <SetSwimmerRegistrationForm swimmer={await flat(swimmer)} action={registerSwimmer}/>
    </div>
}