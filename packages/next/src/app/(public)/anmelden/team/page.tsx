import { TeamForm } from "@/src/components/forms/TeamForm.component";
import { registerTeam } from "./registerTeam.action";

export default async function RegisterTeamPage() {
    return <div>
        <h1>Team Anmeldung</h1>
        <TeamForm serverAction={registerTeam} />
    </div>
}