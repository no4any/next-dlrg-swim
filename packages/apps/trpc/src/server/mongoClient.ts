import { MongoClient } from "mongodb";

const mongoClient = new MongoClient("mongodb://mongo:mongo@localhost:27017/", {
})

export const client = mongoClient.connect();