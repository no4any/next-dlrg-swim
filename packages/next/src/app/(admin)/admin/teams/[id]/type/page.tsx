
import { ChangeTeamTypeForm } from "@/src/components/forms/team/changeTeamType/ChangeTeamTypeForm";
import { flat } from "@/src/lib";
import { getTeam } from "@/src/mongo/team.mongo";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export const instant = false;

export default async function ChangeTeamTypePage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;
    const team = await flat(await getTeam(id));

    if(!team) notFound();

    return <div>
        <h1>Teamart ändern</h1>
        <ChangeTeamTypeForm team={team} />
    </div>
}