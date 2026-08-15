import { getAllSwimmers } from "@/src/mongo/swimmer.mongo"
import { connection } from "next/server";
import { SwimmerList } from "./SwimmerList.component";
import { flat } from "@/src/lib";

export const instant = false;

export default async function SwimmersPage() {
    await connection();
    const swimmers = await getAllSwimmers();
    return <div>
        <h1>Schwimmer</h1>
        <SwimmerList swimmers={await flat(swimmers)} />
    </div>
}