import { generateHash } from "@/src/lib-server-only";
import { getAllTeams } from "@/src/mongo/team.mongo"
import Link from "next/link";
import { connection } from "next/server";

export default async function TeamsPage() {
    await connection();
    const teams = await getAllTeams();

    return <div>
        <h1>Teams</h1>
        <div>
            {Promise.all(teams.map(async (team, index) => <Link key={team._id?.toString() ?? "${index}"} prefetch={false} href={`/anmelden/team/${team._id?.toString() ?? ''}/${await generateHash(team._id?.toString() ?? '')} `}>
                <div className="flex flex-row gap-4">
                    <div className="flex-4">{team.name}</div>
                    <div className="flex-1 text-right">{team.swimmers.length || 0}</div>
                </div>
            </Link>))}
        </div>
    </div>
}