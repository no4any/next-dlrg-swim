import { getAllTeams } from "@/src/mongo/team.mongo"
import { connection } from "next/server";

export default async function TeamsPage() {
    await connection();
    const teams = await getAllTeams();

    return <div>
        <h1>Teams</h1>
        <div>
            {teams.map((team) => <div className="flex flex-row gap-4">
                <div className="flex-4">{team.name}</div>
                <div className="flex-1 text-right">{team.swimmers.length || 0}</div>
            </div>)}
        </div>
    </div>
}