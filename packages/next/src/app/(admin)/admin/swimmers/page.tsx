import { getAllSwimmers } from "@/src/mongo/swimmer.mongo"
import { connection } from "next/server";
import { SwimmerList } from "./SwimmerList.component";
import { flat } from "@/src/lib";
import { Swimmer } from "@/src/model";

export const instant = false;

function name(swimmer: Swimmer) {
    return `${swimmer.lastName}, ${swimmer.firstName}`
}

export default async function SwimmersPage() {
    await connection();
    const swimmers = (await getAllSwimmers()).sort((a,b) => name(a).localeCompare(name(b)));
    return <div>
        <h1>Schwimmer</h1>
        <SwimmerList swimmers={await flat(swimmers)} />
    </div>
}