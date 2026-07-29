import { Team } from "@/src/model";
import { addTeam, getTeamByEMail, getTeamByName } from "@/src/mongo/team.mongo";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { TeamFormState } from "./TeamForm.component";
import { generateHash } from "@/src/lib/generateHash.function";

async function parseTeamFromFormData(formData: FormData): Promise<Team> {
    const unparsedTeam = Object.fromEntries(formData.entries());

    return Team.parse({
        ...unparsedTeam,
        nameLower: unparsedTeam?.name.toString().toLowerCase(),
        email: unparsedTeam?.email.toString().toLocaleLowerCase()
    })
}

export async function registerTeam(_initialState: TeamFormState, formData: FormData): Promise<TeamFormState> {
    "use server";
    let teamName, email, id;
    try {
        const team = await parseTeamFromFormData(formData);
        teamName = team.nameLower;
        email = team.email;
        const result = await addTeam(team);
        id = result.insertedId.toString();
    } catch (e) {
        if (e instanceof ZodError) {
            return { issues: e.issues.filter((issue) => issue.path[0].toString() !== 'nameLower').map((issue) => issue.message)};
        }
        const team = await getTeamByEMail(email || '')
        if (team) {
            return { emailAlreadyExists: true }
        }
        if (await getTeamByName(teamName || '')) {
            return { teamNameAlreadyExists: true }
        }
        return { unknownError: true }
    }
    redirect(`/anmelden/team/${id}/${await generateHash(id)}`);
}