
import { UpdateTeamNameForm } from "@/src/components/forms/team/update/UpdateTeamNameForm";
import { getTeam } from "@/src/mongo/team.mongo";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export const instant = false;


export default async function UpdateTeamNamePage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;
    const team = await getTeam(id);

    if(!team) notFound();

    return <div>
        <h1>Teamname ändern</h1>
        <UpdateTeamNameForm key={`teamname-update-${Date.now()}`}id={id} name={team.name} />
    </div>
}