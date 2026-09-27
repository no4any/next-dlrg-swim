import { AddLapCardForm } from "@/src/components/forms/log/addLapCard/AddLapCardForm.component";
import { SwimmerDetails } from "@/src/components/SwimmerDetails";
import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { getTeam } from "@/src/mongo/team.mongo";
import { connection } from "next/server";

export const instant = false;

export default async function LogSwimmerPage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;

    const swimmer = await getSwimmer(id);

    if(!swimmer) {
        return <div>Schwimmer nicht gefunden</div>
    }

    const team = swimmer.teamId && await getTeam(swimmer.teamId);

    return <div>
        <h1>Karte eintragen</h1>

        <div>
            <AddLapCardForm key={`key-${Date.now()}`} swimmerId={swimmer._id.toString()}/>
        </div>

        <SwimmerDetails swimmer={swimmer} team={team} />
    </div>
}