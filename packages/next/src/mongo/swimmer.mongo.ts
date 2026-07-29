import { cache } from "react";
import { Swimmer } from "../model/registration/swimmer";
import { ObjectId } from "mongodb";
import { getSwimmersCollection } from "./mongoClient";
import z from "zod";

const collection = getSwimmersCollection();

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

async function addSwimmerRaw(swimmer: Swimmer) {
    return (await collection)?.insertOne(swimmer);
}
export const addSwimmer = cache(addSwimmerRaw);

async function updateSwimmerRaw(id: ObjectId, swimmer: Partial<Swimmer>) {
    const {_id, ...restOfSwimmer} = Swimmer.parse(swimmer);
    return (await collection)?.updateOne({ _id: id }, { $set: restOfSwimmer });
}
export const  updateSwimmer = cache(updateSwimmerRaw);

async function deleteSwimmerRaw(id: ObjectId) {
    return (await collection)?.deleteOne({ _id: id });
}
export const deleteSwimmer = cache(deleteSwimmerRaw);