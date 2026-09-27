import { Document, MongoClient } from "mongodb";
import { MONGO_CONNECTION_STRING } from "../props";
import { Swimmer, Team, UserWithPassword } from "../model";
import { Counter } from "../model/Counter.zod";
import { LapsCard } from "../model/LapsCard.zod";

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(MONGO_CONNECTION_STRING, {
    minPoolSize: 10,
    maxPoolSize: 100
});

let mongoClient: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        console.log("Created MongoClient for DEV");
        global._mongoClientPromise = client.connect()
    }
    mongoClient = global._mongoClientPromise
} else {
    mongoClient = client.connect();
}

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
    try {
        await swimmersCollection.dropIndexes();
    } catch (e) { }

    await swimmersCollection.createIndex({
        email: 1
    }, {
        unique: true,
        partialFilterExpression: { email: { $type: "string" } }
    });
    await swimmersCollection.createIndex({
        capColor: 1,
        capNr: 1,
    }, {
        unique: true,
        partialFilterExpression: {
            capColor: { $type: "string" },
            capNr: { $type: "number" }
        }
    });
    await swimmersCollection.createIndex({
        regNr: 1
    }, {
        unique: true,
        partialFilterExpression: {
            regNr: { $type: "number" }
        }
    });
    return swimmersCollection;
}

export async function getUSersCollection() {
    const usersCollection = await getCollection<UserWithPassword>('users');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    return usersCollection;
}

export async function getCountersCollection() {
    const countersCollection = await getCollection<Counter>('counters');
    await countersCollection.createIndex({ _id: 1, count: 1 }, { unique: true });
    return countersCollection;
}

export async function getLapsCardsCollection() {
    const countersCollection = await getCollection<LapsCard>('lapsCards');
    await countersCollection.createIndex({ id: 1 }, { unique: true });
    return countersCollection;
}