import { registerManagedSwimmerToTeam } from "@/src/components/forms/swimmer/registerManagedSwimmerToTeam.action";
import { SwimmerForm } from "@/src/components/forms/swimmer/SwimmerForm.component";
import { validateHash } from "@/src/lib-server-only";
import { getTeam } from "@/src/mongo/team.mongo";
import { notFound } from "next/navigation";

export default async function AddManagedSwimmerToTeamPage({ params }: { params: Promise<{ id: string, hash: string }> }) {
    "use cache"
    const { id, hash } = await params;
    if(!await validateHash(id, hash)) notFound();
    const team = await getTeam(id)
    if(!team) notFound();
    return <div>
        <h1>Schwimmer im Team "{team.name}" anmelden</h1>
        <SwimmerForm serverAction={registerManagedSwimmerToTeam} teamId={team._id?.toString()} teamHash={hash} submitButtonText="Anmelden" noMail />
    </div>
}