import { connection } from "next/server";
import { Widget } from "./Widget.component";
import { getAllLapsCards } from "@/src/mongo/lapsCards.mongo";

export async function AllLapsWidget() {
    const cards = await getAllLapsCards();
    
    const lapsTotal = cards.reduce((value, current) => {return value + current.laps}, 0);

    return <Widget title="Bahnen">
        <div className="text-8xl text-center md:pt-10">
            {lapsTotal}
        </div>
    </Widget>
}