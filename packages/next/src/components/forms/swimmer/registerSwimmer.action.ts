import { ObjectId } from "mongodb";
import { SwimmerFormState } from "./SwimmerForm.component";
import { Swimmer, SwimmerType } from "@/src/model";
import { redirect } from "next/navigation";
import { addSwimmer, getSwimmerByMail } from "@/src/mongo/swimmer.mongo";
import { ZodError } from "zod";

async function parseSwimmerFromFormData(formData: FormData, type: SwimmerType): Promise<Swimmer> {
    const unparsedSwimmer = Object.fromEntries(formData.entries());
    return Swimmer.parse({
        type: type,
        firstName: unparsedSwimmer.firstName?.toString() ?? "",
        lastName: unparsedSwimmer.lastName?.toString() ?? "",
        email: unparsedSwimmer.email?.toString() ?? "",
        birthday: unparsedSwimmer.birthday?.toString() || undefined,
        city: unparsedSwimmer.city?.toString() || undefined,
        breakfast: unparsedSwimmer.breakfast?.toString() === "on",
        publishName: unparsedSwimmer.noPublishName?.toString() !== "on",
        newsletter: unparsedSwimmer.newsletter?.toString() === "on",
        team: unparsedSwimmer.teamId ? new ObjectId(unparsedSwimmer.teamId.toString()) : undefined
    })
}

export async function registerSwimmer(_initialState: SwimmerFormState, formData: FormData): Promise<SwimmerFormState> {
    "use server";
    let email;
    try {
        const swimmer = await parseSwimmerFromFormData(formData, "SELF_MANAGED");
        email = swimmer.email;
        await addSwimmer(swimmer);
        redirect('/anmeldung/schwimmer/ok');
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                issues: e.issues.map((issue) => issue.message)
            };
        }
        if(await getSwimmerByMail(email ?? "")) {
            return {emailAlreadyExists: true}
        }
        return {
            unknownError: true
        }
    }

}