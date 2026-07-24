import { registerTeam } from "@/src/components/forms/team/registerTeam.action";
import { TeamForm } from "@/src/components/forms/team/TeamForm.component";

export default async function RegisterTeamPage() {
    return <div>
        <h1>Team anmelden</h1>
        <TeamForm serverAction={registerTeam} submitButtonText="Team anmelden"/>
    </div>
}