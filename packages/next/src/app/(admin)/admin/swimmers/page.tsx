import { getAllSwimmers } from "@/src/mongo/swimmer.mongo"
import { connection } from "next/server";

export default async function SwimmersPage() {
    await connection();
    const swimmers = await getAllSwimmers();
    return <div>
        <h1>Schwimmer</h1>
        <div>{JSON.stringify(swimmers)}</div>
    </div>
}