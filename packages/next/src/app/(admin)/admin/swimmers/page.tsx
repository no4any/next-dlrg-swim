import { getAllSwimmers } from "@/src/mongo/swimmer.mongo"
import { connection } from "next/server";
import { SwimmerList } from "./SwimmerList.component";

export default async function SwimmersPage() {
    await connection();
    const swimmers = await getAllSwimmers();
    return <div>
        <h1>Schwimmer</h1>
        <SwimmerList swimmers={swimmers} />
    </div>
}