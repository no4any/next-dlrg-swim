import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { notFound } from "next/navigation";
import { flat } from "@/src/lib";
import { SetSwimmerRegistrationForm } from "@/src/components/forms/setSwimmerRegistration/SetSwimmerRegistrationForm.component";
import { updateRegistrationForSwimmer } from "@/src/components/forms/setSwimmerRegistration/updateRegistrationForSwimmer.action";

export default async function UpdateSwimmerRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const swimmer = await getSwimmer(id);
    if (!swimmer) notFound();
    if (swimmer.status !== "REGISTERED") notFound();

    return <div>
        <h1>Schwimmer Registrierung ändern: {swimmer.firstName} {swimmer.lastName}</h1>
        <SetSwimmerRegistrationForm swimmer={await flat(swimmer)} action={updateRegistrationForSwimmer} withReset/>
    </div>
}