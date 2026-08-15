import { ObjectId } from "mongodb";
import { SwimmerFormState } from "./SwimmerForm.component";
import { redirect } from "next/navigation";
import { addSwimmer, getSwimmerByMail } from "@/src/mongo/swimmer.mongo";
import { ZodError } from "zod";
import { getTeam } from "@/src/mongo/team.mongo";
import { validateHash } from "@/src/lib-server-only";
import { parseSwimmerFromFormData } from "./parseSwimmerFromFormData.function";

export async function registerManagedSwimmerToTeam(_initialState: SwimmerFormState, formData: FormData): Promise<SwimmerFormState> {
    "use server";
    let email, result;

    const teamIdString = formData.get("teamId")?.toString() ?? "";
    const teamHash = formData.get("teamHash")?.toString() ?? "";

    try {
        const swimmer = await parseSwimmerFromFormData(formData, "MANAGED", "ANNOUNCED");
        email = swimmer.email;
        if (!await validateHash(teamIdString, teamHash)) return { unknownError: true }
        const teamId = new ObjectId(teamIdString);
        const team = getTeam(teamId);
        if (!team) return { unknownError: true }
        result = await addSwimmer({ ...swimmer, teamId });
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                issues: e.issues.map((issue) => issue.message)
            };
        }
        if (await getSwimmerByMail(email ?? "")) {
            return { emailAlreadyExists: true }
        }
        console.log(e);
        return {
            unknownError: true
        }
    }

    redirect(`/anmelden/team/${teamIdString}/${teamHash}`);
}