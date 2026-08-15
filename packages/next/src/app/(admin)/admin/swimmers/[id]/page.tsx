import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { SwimmerDetailView } from "@/src/components/views/swimmerDetailView/SwimmerDetailView.component";
import { getTeam } from "@/src/mongo/team.mongo";
import { flat } from "@/src/lib";

export const instant = false;

export default async function SwimmerPage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;
    const swimmer = await getSwimmer(id);
    if (!swimmer) notFound();
    const team = swimmer.teamId ? await getTeam(swimmer.teamId) : null;

    return <div>
        <h1 className="flex flex-col">Schwimmer: {swimmer.firstName} {swimmer.lastName}</h1>
        <SwimmerDetailView swimmer={await flat(swimmer)} team={team ? await flat(team) : undefined} />
    </div>
}