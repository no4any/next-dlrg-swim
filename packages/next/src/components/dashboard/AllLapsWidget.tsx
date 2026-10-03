import { connection } from "next/server";
import { Widget } from "./Widget.component";
import { getAllLapsCards } from "@/src/mongo/lapsCards.mongo";
import Link from "next/link";

export async function AllLapsWidget() {
    const cards = await getAllLapsCards();

    const lapsTotal = cards.reduce((value, current) => { return value + current.laps }, 0);
    const lapsNightCup = cards.filter(c => c.isNightCup).reduce((value, current) => { return value + current.laps }, 0);

    return <Link prefetch={false} href="/admin/results">
        <Widget title="Bahnen">
            <div className="text-center">Gesamt</div>
            <div className="text-8xl text-center">{lapsTotal}</div>
            <div className="text-center">Nachtpokal</div>
            <div className="text-4xl text-center">{lapsNightCup}</div>
        </Widget>
    </Link>
}