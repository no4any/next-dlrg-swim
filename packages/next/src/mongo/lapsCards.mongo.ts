import { counterNext } from "./counter.mongo";
import { getLapsCardsCollection } from "./mongoClient";
import { getSwimmer } from "./swimmer.mongo";

const COUNTER_NAME = "LAPS_COUNTER";

const collection = getLapsCardsCollection();

export async function addLapsCard(swimmerId: string, laps: number, isNightCup: boolean) {
    const swimmer = await getSwimmer(swimmerId);
    if (!swimmer) throw new Error("Swimmer nicht gefunden");
    const id = await counterNext(COUNTER_NAME);
    if (!id) throw new Error("Counter nicht gefunden");

    const col = await collection;

    await col.insertOne({
        id,
        swimmerId: swimmer._id,
        isNightCup,
        laps
    })

    return { id }
}