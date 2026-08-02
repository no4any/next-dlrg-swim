import { cache } from "react";
import { ObjectId } from "mongodb";
import { Swimmer, Team } from "../model";
import { getTeamsCollection } from "./mongoClient";

const collection = getTeamsCollection();

export async function backupTeam() {
    return await (await collection)?.find({}).toArray();
}

async function getTeamRaw(id: string | ObjectId) {
    return (await collection)?.aggregate<Team & { swimmers: Swimmer[] }>([
        { $match: { _id: id instanceof ObjectId ? id : new ObjectId(id) } },
        {
            $lookup: {
                from: "swimmers",
                localField: "_id",
                foreignField: "teamId",
                as: "swimmers"
            }
        },
        { $limit: 1 }
    ]).next();
}
export const getTeam = cache(getTeamRaw);

async function getAllTeamsRaw() {
    return (await collection)?.aggregate<Team & { swimmers: Swimmer[] }>([
        { $match: {} },
        {
            $lookup: {
                from: "swimmers",
                localField: "_id",
                foreignField: "teamId",
                as: "swimmers"
            }
        },
    ]).toArray();
}
export const getAllTeams = cache(getAllTeamsRaw);

async function getTeamByEMailRaw(email: string) {
    return (await collection)?.aggregate<Team & { swimmers: Swimmer[] }>([
        { $match: { email } },
        {
            $lookup: {
                from: "swimmers",
                localField: "_id",
                foreignField: "teamId",
                as: "swimmers"
            }
        },
        { $limit: 1 }
    ]).next();
}
export const getTeamByEMail = cache(getTeamByEMailRaw);

async function getTeamByNameRaw(name: string) {
    return (await collection)?.aggregate<Team & { swimmers: Swimmer[] }>([
        { $match: { nameLower: name.toLowerCase() } },
        {
            $lookup: {
                from: "swimmers",
                localField: "_id",
                foreignField: "teamId",
                as: "swimmers"
            }
        },
        { $limit: 1 }
    ]).next();
}
export const getTeamByName = cache(getTeamByNameRaw);

export async function addTeam(team: Team) {
    return (await collection)?.insertOne(team);
}

export async function addCommentToTeam(id: string | ObjectId, email: string, message: string) {
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

async function updateTeamRaw(id: ObjectId, team: Partial<Team>) {
    const { _id, ...restOfTeam } = Team.parse(team);
    return (await collection)?.updateOne({ _id: id }, { $set: restOfTeam });
}
export const updateTeam = cache(updateTeamRaw);

async function deleteTeamRaw(id: ObjectId) {
    return (await collection)?.deleteOne({ _id: id });
}
export const deleteTeam = cache(deleteTeamRaw);