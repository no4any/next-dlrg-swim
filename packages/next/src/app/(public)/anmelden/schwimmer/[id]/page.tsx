import { registerSwimmerToTeam } from "@/src/components/forms/swimmer/registerSwimmerToTeam.action";
import { SwimmerForm } from "@/src/components/forms/swimmer/SwimmerForm.component";
import { getTeam } from "@/src/mongo/team.mongo";
import { notFound } from "next/navigation";

export default async function AddSwimmerToTeamPage({ params }: { params: Promise<{ id: string }> }) {
    "use cache"
    const { id } = await params;
    const team = await getTeam(id)
    if(!team) notFound();
    return <div>
        <h1>Schwimmer im Team "{team.name}" anmelden</h1>
        <SwimmerForm serverAction={registerSwimmerToTeam} teamId={team._id?.toString()} submitButtonText="Anmelden" />
    </div>
}