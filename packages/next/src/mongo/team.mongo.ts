import { cache } from "react";
import { ObjectId } from "mongodb";
import { Team } from "../model";
import { getTeamsCollection } from "./mongoClient";

const collection = getTeamsCollection();

async function getAllTeamsRaw() {
    return (await collection).find().toArray();
}
export const getAllTeams = cache(getAllTeamsRaw);

async function getTeamByEMailRaw(email: string) {
    return (await collection).findOne({email});
}
export const getTeamByEMail = cache(getTeamByEMailRaw);

async function getTeamByNameRaw(name: string) {
    return (await collection).findOne({nameLower: name.toLocaleLowerCase()});
}
export const getTeamByName = cache(getTeamByNameRaw);

async function addTeamRaw(team: Team) {
    return (await collection).insertOne(team);
}
export const addTeam = cache(addTeamRaw);

async function updateTeamRaw(id: ObjectId, team: Partial<Team>) {
    const {_id, ...restOfTeam} = Team.parse(team);
    return (await collection).updateOne({ _id: id }, { $set: restOfTeam });
}
export const  updateTeam = cache(updateTeamRaw);

async function deleteTeamRaw(id: ObjectId) {
    return (await collection).deleteOne({ _id: id });
}
export const deleteTeam = cache(deleteTeamRaw);