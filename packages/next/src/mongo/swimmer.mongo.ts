import { cache } from "react";
import { Swimmer } from "../model/registration/swimmer";
import { ObjectId } from "mongodb";
import { getSwimmersCollection } from "./mongoClient";

const collection = getSwimmersCollection();

export async function backupSwimmer() {
    return await (await collection)?.find({}).toArray();
}

async function getSwimmerRaw(id: string | ObjectId) {
    return (await collection)?.findOne({_id: id instanceof ObjectId ? id : new ObjectId(id)});
}
export const getSwimmer = cache(getSwimmerRaw);

async function getSwimmerByMailRaw(email: string) {
    return (await collection)?.findOne({email});
}
export const getSwimmerByMail = cache(getSwimmerByMailRaw);

async function getAllSwimmersRaw() {
    //return (await collection)?.find().toArray();
    return (await collection)?.aggregate<Swimmer>([
        {$match: {}},
        {$lookup: {
            from: "teams",
            localField: "teamId",
            foreignField: "_id",
            as: "team"
        }},
        {$unwind: {
            "path": "$team",
            "preserveNullAndEmptyArrays": true
        }}
    ]).toArray();
}
export const getAllSwimmers = cache(getAllSwimmersRaw);

export async function addSwimmer(swimmer: Swimmer) {
    return (await collection)?.insertOne(swimmer);
}

export async function updateSwimmer(id: ObjectId, swimmer: Partial<Swimmer>) {
    const {_id, ...restOfSwimmer} = Swimmer.parse(swimmer);
    return (await collection)?.updateOne({ _id: id }, { $set: restOfSwimmer });
}

export async function deleteManagedSwimmer(id: ObjectId | string) {
    return (await collection)?.deleteOne({ _id: typeof id === 'string' ? new ObjectId(id) : id, type: "MANAGED", status: "ANNOUNCED" });
}

export async function deleteSwimmer(id: ObjectId | string) {
    return (await collection)?.deleteOne({ _id: typeof id === 'string' ? new ObjectId(id) : id, status: "ANNOUNCED"  });
}

export async function addCommentToSwimmer(id: string | ObjectId, email: string, message: string) {
    const result = await (await collection).updateOne({
        _id: id instanceof ObjectId ? id : new ObjectId(id)
    }, {
        $push: {
            comments: {
                _id: new ObjectId(),
                message: message,
                time: Date.now(),
                author: email
            }
        }
    })
    return result.modifiedCount > 0;
}