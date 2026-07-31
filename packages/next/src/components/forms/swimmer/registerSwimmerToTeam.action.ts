import { SwimmerFormState } from "./SwimmerForm.component";
import { redirect } from "next/navigation";
import { addSwimmer, getSwimmerByMail } from "@/src/mongo/swimmer.mongo";
import { ZodError } from "zod";
import { getTeam } from "@/src/mongo/team.mongo";
import { generateHash } from "@/src/lib-server-only";
import { parseSwimmerFromFormData } from "./parseSwimmerFromFormData.function";

export async function registerSwimmerToTeam(_initialState: SwimmerFormState, formData: FormData): Promise<SwimmerFormState> {
    "use server";
    let email, result;
    try {
        const swimmer = await parseSwimmerFromFormData(formData, "SELF_MANAGED", "ANNOUNCED");
        email = swimmer.email;
        const team = getTeam(swimmer.teamId || "");
        if (!team) return { unknownError: true }
        result = await addSwimmer({ ...swimmer });
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                issues: e.issues.map((issue) => issue.message)
            };
        }
        if (await getSwimmerByMail(email ?? "")) {
            return { emailAlreadyExists: true }
        }
        return {
            unknownError: true
        }
    }
    const id = result.insertedId?.toString() ?? "";
    redirect(`/anmelden/schwimmer/${id}/${await generateHash(id)}`);
}