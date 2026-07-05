import { TeamForm, TeamFormState } from "@/src/components/forms/TeamForm.component";
import { Team } from "@/src/model";
import { addTeam, getTeamByEMail, getTeamByName } from "@/src/mongo/team.mongo";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function registerTeamAction(initialState: {}, formData: FormData): Promise<TeamFormState> {
    "use server";
    let teamName, email;
    try {
        const unparsedTeam = Object.fromEntries(formData.entries());
        const team = Team.parse({
            ...unparsedTeam,
            nameLower: unparsedTeam?.name.toString().toLowerCase(),
            email: unparsedTeam?.email.toString().toLocaleLowerCase()
        });
        teamName = team.nameLower;
        email = team.email;
        await addTeam(team);
    } catch (e) {
        if (e instanceof ZodError) {
            return { fields: e.issues.map((issue) => issue.path[0].toString()) };
        }
        const team = await getTeamByEMail(email || '')
        if (team) {
            console.log(team);
            return { emailAlreadyExists: true }
        }
        if (await getTeamByName(teamName || '')) {
            return { teamNameAlreadyExists: true }
        }
        return { unknownError: true }
    }
    redirect('/');
}

export default async function RegisterTeamPage() {
    return <div>
        <h1>Team Anmeldung</h1>
        <TeamForm serverAction={registerTeamAction} />
    </div>
}