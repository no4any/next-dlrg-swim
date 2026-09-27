import { SwimmerLapsDetails } from "@/src/components/SwimmerLapsDetails.component";
import { flat } from "@/src/lib";
import { getAllLapsCards } from "@/src/mongo/lapsCards.mongo";
import { connection } from "next/server";

export const instant = false;

export default async function LogsPage() {
    await connection();
    const laps = await flat(await getAllLapsCards());

    return <div>
        <h1>Alle erfassungen</h1>
        <SwimmerLapsDetails laps={laps} />
    </div>
}