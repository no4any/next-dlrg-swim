import { getAllSwimmers } from "@/src/mongo/swimmer.mongo"
import { connection } from "next/server";
import { flat } from "@/src/lib";
import { Swimmer } from "@/src/model";
import { SwimmerList } from "../swimmers/SwimmerList.component";

export const instant = false;

function name(swimmer: Swimmer) {
    return `${swimmer.lastName}, ${swimmer.firstName}`
}

export default async function SwimmersPage() {
    await connection();
    const swimmers = (await getAllSwimmers()).filter(s => s.status !== "ANNOUNCED" && s.breakfast).sort((a,b) => name(a).localeCompare(name(b)));
    return <div>
        <h1>Schwimmer mit Frühstück</h1>
        <SwimmerList swimmers={await flat(swimmers)} />
    </div>
}