import { LapsCard } from "../model/LapsCard.zod";

export async function calcLaps(laps: LapsCard[]): Promise<number> {
    return laps.reduce((acc, lap) => acc + lap.laps, 0);
}