import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { flat } from "@/src/lib";
import { UpdateSwimmerTeamForm } from "./UpdateSwimmerTeamForm";
import { getAllTeams } from "@/src/mongo/team.mongo";

export const instant = false;

export default async function UpdateSwimmerPage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;
    const swimmer = await flat(await getSwimmer(id));
    const teams = await flat((await getAllTeams()).sort((a, b) => a.name.localeCompare(b.name)));
    
    if(!swimmer) notFound();
    if(swimmer.type === "MANAGED") notFound();

    return <div>
        <h1>Team ändern: {swimmer.firstName} {swimmer.lastName}</h1>
        <UpdateSwimmerTeamForm swimmer={swimmer} teams={teams} key={`swimmer-update-${Date.now()}`}/>
    </div>
}