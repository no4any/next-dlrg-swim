import { getAllTeams } from "@/src/mongo/team.mongo"
import Link from "next/link";
import { connection } from "next/server";

export const instant = false;

export default async function TeamsPage() {
    await connection();
    const teams = (await getAllTeams()).sort((a, b) => a.name.localeCompare(b.name));

    return <div>
        <h1>Teams</h1>
        <div>
            <div className="flex flex-row gap-4 font-bold">
                <div className="flex-4">Name</div>
                <div className="flex-4">Art</div>
                <div className="flex-1 text-right">Teilnehmer</div>
                <div className="flex-1 text-right">Registriert</div>
            </div>
            {Promise.all(teams.map(async (team, index) => <Link key={team._id?.toString() ?? `${index}`} prefetch={false} href={`/admin/teams/${team._id?.toString()}`}>
                <div className="flex flex-row gap-4 hover:bg-gray-200 rounded-md p-1">
                    <div className="flex-4">{team.name}</div>
                    <div className="flex-4">{team.teamType}</div>
                    <div className="flex-1 text-right">{team.swimmers.length || 0}</div>
                    <div className="flex-1 text-right">{team.swimmers.filter(s=>s.status !== "ANNOUNCED").length || 0}</div>
                </div>
            </Link>))}
        </div>
    </div>
}