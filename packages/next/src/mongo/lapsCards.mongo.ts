import { ObjectId } from "mongodb";
import { counterNext } from "./counter.mongo";
import { getLapsCardsCollection } from "./mongoClient";
import { getSwimmer } from "./swimmer.mongo";
import { getTeam } from "./team.mongo";
import { LapsCard } from "../model/LapsCard.zod";
import { Team } from "../model";

const COUNTER_NAME = "LAPS_COUNTER";

const collection = getLapsCardsCollection();

export async function addLapsCard(swimmerId: string, laps: number, isNightCup: boolean, editor: string) {
    const swimmer = await getSwimmer(swimmerId);
    if (!swimmer) throw new Error("Swimmer nicht gefunden");
    const id = await counterNext(COUNTER_NAME);
    if (!id) throw new Error("Counter nicht gefunden");

    const col = await collection;

    await col.insertOne({
        id,
        swimmerId: swimmer._id,
        isNightCup,
        laps,
        editor 
    })

    return { id }
}

export async function getLapsCards(swimmerId: string | ObjectId) {
    const col = await collection;
    const result = await col.find({ swimmerId: typeof swimmerId === "string" ? new ObjectId(swimmerId) : swimmerId }).toArray();
    return result;
}

export async function getAllLapsCards() {
    const col = await collection;
    const result = await col.find({}).toArray();
    return result;
}

export async function updateLapsCard(id: string | ObjectId, laps: number, isNightCup?: boolean) {
    const col = await collection;
    const result = await col.updateOne({ _id: typeof id === "string" ? new ObjectId(id) : id }, { $set: { laps, isNightCup: !!isNightCup } });
    return result;
}

export async function getLapsCardByCustomId(id: number) {
    const col = await collection;
    const result = await col.findOne({ id: id });
    return result;    
}

export async function getLapsForTeam(teamId: string | ObjectId): Promise<LapsCard[]> {
    const team = await getTeam(teamId);
    if(!team) return [];
    const simmerIds = team.swimmers.map(swimmer => swimmer._id as ObjectId);
    const col = await collection;
    const result = (await collection).find({
        swimmerId: { $in: simmerIds }
    }).toArray();
    return result;
}