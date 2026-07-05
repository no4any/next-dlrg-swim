import { Document, MongoClient } from "mongodb";
import { MONGO_CONNECTION_STRING } from "../props";
import { Swimmer, Team } from "../model";

const client = new MongoClient(MONGO_CONNECTION_STRING, {});

console.log("Connection to MongoDB");
const mongoClient = client.connect();

async function getDB(name: string = "dlrg") {
    return (await mongoClient).db(name);
}

async function getCollection<T extends Document>(name: string, dbName: string = "dlrg") {
    return (await getDB(dbName)).collection<T>(name);
}

export async function getTeamsCollection() {
    const teamsCollection = await getCollection<Team>('teams');
    await teamsCollection.createIndex({ email: 1 }, { unique: true });
    await teamsCollection.createIndex({ nameLower: 1 }, { unique: true });
    return teamsCollection;
}

export async function getSwimmersCollection() {
    const swimmersCollection = await getCollection<Swimmer>('swimmers');
    await swimmersCollection.createIndex({ email: 1 }, { unique: true });
    return swimmersCollection;
}