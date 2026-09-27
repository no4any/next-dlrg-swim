import { ChangeLogForm } from "@/src/components/forms/log/changeLogForm/ChangeLogForm.component";
import { SwimmerDetails } from "@/src/components/SwimmerDetails";
import { getLapsCardByCustomId } from "@/src/mongo/lapsCards.mongo";
import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { getTeam } from "@/src/mongo/team.mongo";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export const instant = false;

export default async function LogChangePage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;

    const card = await getLapsCardByCustomId(parseInt(id));

    if(!card) notFound();

    const swimmer = await getSwimmer(card.swimmerId);
    if(!swimmer) notFound();

    const team = await getTeam(swimmer.teamId);

    return <div>
        <h1>Eintrag {id} ändern</h1>
        <ChangeLogForm key={`id-${Date.now()}`} log={card} />
        <h2>Schwimmerdaten</h2>
        <SwimmerDetails swimmer={swimmer} team={team || undefined} />
    </div>
}