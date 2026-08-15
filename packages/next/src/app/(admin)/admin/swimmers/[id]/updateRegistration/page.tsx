import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { notFound } from "next/navigation";
import { flat } from "@/src/lib";
import { SetSwimmerRegistrationForm } from "@/src/components/forms/setSwimmerRegistration/SetSwimmerRegistrationForm.component";
import { updateRegistrationForSwimmer } from "@/src/components/forms/setSwimmerRegistration/updateRegistrationForSwimmer.action";
import { connection } from "next/server";

export const instant = false;

export default async function UpdateSwimmerRegistrationPage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;
    const swimmer = await getSwimmer(id);

    if (!swimmer) notFound();
    if (swimmer.status !== "REGISTERED") notFound();

    console.log(Date.now(), swimmer.capColor, swimmer.capNr, swimmer.regNr);

    return <div>
        <h1>Schwimmer Registrierung ändern: {swimmer.firstName} {swimmer.lastName}</h1>
        <SetSwimmerRegistrationForm
            key={`${Date.now()}-${swimmer._id?.toString()}-${swimmer.capColor}-${swimmer.capNr}-${swimmer.regNr}`}
            swimmer={await flat(swimmer)}
            action={updateRegistrationForSwimmer}
            withReset
        />
    </div>
}