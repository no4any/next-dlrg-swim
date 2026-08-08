import { getDistance } from "../lib/getDistance";
import { Swimmer } from "../model";

export async function Distance({ swimmer }: { swimmer: Swimmer }) {
    const distance = await getDistance(swimmer);

    return <>{distance}</>;
}