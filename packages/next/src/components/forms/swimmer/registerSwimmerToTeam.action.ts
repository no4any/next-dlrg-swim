import { ObjectId } from "mongodb";
import { SwimmerFormState } from "./SwimmerForm.component";
import { Swimmer, SwimmerType } from "@/src/model";
import { redirect } from "next/navigation";
import { addSwimmer, getSwimmerByMail } from "@/src/mongo/swimmer.mongo";
import { ZodError } from "zod";
import { getTeam } from "@/src/mongo/team.mongo";
import { generateHash } from "@/src/lib-server-only";

async function parseSwimmerFromFormData(formData: FormData, type: SwimmerType): Promise<Swimmer> {
    const unparsedSwimmer = Object.fromEntries(formData.entries());
    return Swimmer.parse({
        type: type,
        status: "ANNOUNCED",
        firstName: unparsedSwimmer.firstName?.toString() ?? "",
        lastName: unparsedSwimmer.lastName?.toString() ?? "",
        email: unparsedSwimmer.email?.toString().toLocaleLowerCase() ?? "",
        gender: unparsedSwimmer.gender?.toString() || undefined,
        birthday: unparsedSwimmer.birthday?.toString() || undefined,
        city: unparsedSwimmer.city?.toString() || undefined,
        breakfast: unparsedSwimmer.breakfast?.toString() === "on",
        publishName: unparsedSwimmer.noPublishName?.toString() !== "on",
        newsletter: unparsedSwimmer.newsletter?.toString() === "on",
        teamId: unparsedSwimmer.teamId ? new ObjectId(unparsedSwimmer.teamId.toString()) : undefined
    })
}

export async function registerSwimmerToTeam(_initialState: SwimmerFormState, formData: FormData): Promise<SwimmerFormState> {
    "use server";
    let email, result;
    try {
        const swimmer = await parseSwimmerFromFormData(formData, "SELF_MANAGED");
        email = swimmer.email;
        const teamId = new ObjectId(formData.get("teamId")?.toString());
        const team = getTeam(teamId);
        if(!team) return {unknownError: true}
        result = await addSwimmer({...swimmer, teamId});
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
    const id = result.insertedId.toString();
    redirect(`/anmelden/schwimmer/${id}/${await generateHash(id)}`);
}