"use server"
import "server-only"
import { getAllSwimmers, getAllSwimmersWithResults } from "../mongo/swimmer.mongo";
import { calcLaps } from "./calcLaps";
import { getAllTeams } from "../mongo/team.mongo";
import { getLapsForTeam } from "../mongo/lapsCards.mongo";
import { getAge } from "./getAge.function";

async function getSwimmerWithResults() {
    const swimmerWithResults = (await getAllSwimmersWithResults())
        .filter(s => s.publishName)
        .map(async s => {
            return {
                ...s,
                age: s.birthday ? getAge(new Date(s.birthday)) : 0,
                total: (await calcLaps(s.laps)) * 50,
                night: (await calcLaps(s.laps.filter(l => l.isNightCup))) * 50,
            }
        });
    return await Promise.all(swimmerWithResults);
}

async function getTeamWithResults() {
    const teamsWithResult = (await getAllTeams()).map(async t => {
        const laps = await getLapsForTeam(t._id);;
        const total = (await calcLaps(laps)) * 50;
        const swimmerCount = t.swimmers.filter(s => s.status !== "ANNOUNCED").length;
        const average = total / swimmerCount;
        return {
            ...t,
            total,
            average,
            swimmerCount
        }
    })
    return await Promise.all(teamsWithResult);
}

export default async function getResultsAction() {
    const swimmersByDistance = (await getSwimmerWithResults())
        .filter(swimmer => swimmer.status !== "ANNOUNCED")
        .sort((a, b) => a.total > b.total ? -1 : 1);

    const swimmersMale = swimmersByDistance.filter(swimmer => swimmer.gender === "M");
    const swimmersFemale = swimmersByDistance.filter(swimmer => swimmer.gender === "W");

    const swimmeryByNight = swimmersByDistance.filter(a => true).sort((a, b) => a.night > b.night ? -1 : 1)

    const swimmersMaleNight = swimmeryByNight.filter(swimmer => swimmer.gender === "M");
    const swimmersFemaleNight = swimmeryByNight.filter(swimmer => swimmer.gender === "W");

    const swimmersByAgeAsc = swimmersByDistance.filter(swimmer => swimmer.birthday).sort((a, b) => (a.birthday || "") > (b.birthday || "") ? -1 : 1)
    const swimmersByAgeDesc = swimmersByDistance.filter(swimmer => swimmer.birthday).sort((a, b) => (a.birthday || "") < (b.birthday || "") ? -1 : 1)

    const teams = (await getTeamWithResults())
        .filter(team => team.total)
        .sort((a, b) => a.total > b.total ? -1 : 1);

    const teamsAvg = teams.filter(() => true).sort((a, b) => a.average > b.average ? -1 : 1);

    return {
        swimmers: swimmersByDistance,

        swimmersMale,
        swimmersFemale,

        swimmersMaleNight,
        swimmersFemaleNight,

        swimmerOldestMale: swimmersByAgeDesc.find(swimmer => swimmer.gender === "M"),
        swimmerOldestFemale: swimmersByAgeDesc.find(swimmer => swimmer.gender === "W"),

        swimmerYoungestMale: swimmersByAgeAsc.find(swimmer => swimmer.gender === "M"),
        swimmerYoungestFemale: swimmersByAgeAsc.find(swimmer => swimmer.gender === "W"),

        swimmersMale15: swimmersMale.filter((swimmer) => swimmer.age >= 15 && swimmer.age <= 17).slice(0, 3),
        swimmersMale18: swimmersMale.filter((swimmer) => swimmer.age >= 18 && swimmer.age <= 25).slice(0, 3),
        swimmersMale26: swimmersMale.filter((swimmer) => swimmer.age >= 26 && swimmer.age <= 35).slice(0, 3),
        swimmersMale36: swimmersMale.filter((swimmer) => swimmer.age >= 36 && swimmer.age <= 45).slice(0, 3),
        swimmersMale46: swimmersMale.filter((swimmer) => swimmer.age >= 46 && swimmer.age <= 55).slice(0, 3),
        swimmersMale56: swimmersMale.filter((swimmer) => swimmer.age >= 56 && swimmer.age <= 65).slice(0, 3),
        swimmersMale66: swimmersMale.filter((swimmer) => swimmer.age >= 66 && swimmer.age <= 75).slice(0, 3),
        swimmersMale76: swimmersMale.filter((swimmer) => swimmer.age >= 76 && swimmer.age <= 99).slice(0, 3),

        swimmersFemale15: swimmersFemale.filter((swimmer) => swimmer.age >= 15 && swimmer.age <= 17).slice(0, 3),
        swimmersFemale18: swimmersFemale.filter((swimmer) => swimmer.age >= 18 && swimmer.age <= 25).slice(0, 3),
        swimmersFemale26: swimmersFemale.filter((swimmer) => swimmer.age >= 26 && swimmer.age <= 35).slice(0, 3),
        swimmersFemale36: swimmersFemale.filter((swimmer) => swimmer.age >= 36 && swimmer.age <= 45).slice(0, 3),
        swimmersFemale46: swimmersFemale.filter((swimmer) => swimmer.age >= 46 && swimmer.age <= 55).slice(0, 3),
        swimmersFemale56: swimmersFemale.filter((swimmer) => swimmer.age >= 56 && swimmer.age <= 65).slice(0, 3),
        swimmersFemale66: swimmersFemale.filter((swimmer) => swimmer.age >= 66 && swimmer.age <= 75).slice(0, 3),
        swimmersFemale76: swimmersFemale.filter((swimmer) => swimmer.age >= 76 && swimmer.age <= 99).slice(0, 3),

        teams: teams,
        teamsAvg: teamsAvg,

        youngestMale: swimmersMale
            .filter(s => s.status !== "ANNOUNCED")
            .filter(s => s.publishName)
            .filter(s => s.gender === "M")
            .filter(s => s.birthday)
            .sort((a, b) => (a.birthday as string) > (b.birthday as string) ? -1 : 1)
            .find(_s => true),
        youngestFemale: swimmersFemale
            .filter(s => s.status !== "ANNOUNCED")
            .filter(s => s.publishName)
            .filter(s => s.gender === "W")
            .filter(s => s.birthday)
            .sort((a, b) => (a.birthday as string) > (b.birthday as string) ? -1 : 1)
            .find(_s => true),

        oldestMale: swimmersMale
            .filter(s => s.status !== "ANNOUNCED")
            .filter(s => s.publishName)
            .filter(s => s.gender === "M")
            .filter(s => s.birthday)
            .sort((a, b) => (a.birthday as string) > (b.birthday as string) ? 1 : -1)
            .find(_s => true),

        oldestFemale: swimmersFemale
            .filter(s => s.status !== "ANNOUNCED")
            .filter(s => s.publishName)
            .filter(s => s.gender === "W")
            .filter(s => s.birthday)
            .sort((a, b) => (a.birthday as string) > (b.birthday as string) ? 1 : -1)
            .find(_s => true),
    }
}