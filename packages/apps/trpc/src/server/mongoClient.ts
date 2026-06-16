import { MongoClient } from "mongodb";

const dbName = process.env.DB_NAME || "dlrg";

const mongoClient = new MongoClient("mongodb://mongo:mongo@localhost:27017/", {
})

export const client = mongoClient.connect();

export async function getDB() {
    return (await client).db(dbName);
}

export async function getCollection<T extends Document>(name: string) {
    return (await getDB()).collection<T>(name);
}