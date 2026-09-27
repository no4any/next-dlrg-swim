import { getCountersCollection } from "./mongoClient";

const collection = getCountersCollection();

export async function counterNext(name: string) {
    const col = await collection;
    const result = await col.findOneAndUpdate(
        { _id: name },
        { $inc: { count: 1 } },
        {
            upsert: true,
            returnDocument: 'after'
        }
    );
    if(!result) return null;

    return result.count;
}