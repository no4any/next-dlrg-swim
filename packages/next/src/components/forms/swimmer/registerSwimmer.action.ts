import { SwimmerFormState } from "./SwimmerForm.component";
import { redirect } from "next/navigation";
import { addSwimmer, getSwimmerByMail } from "@/src/mongo/swimmer.mongo";
import { ZodError } from "zod";
import { generateHash } from "@/src/lib-server-only";
import { parseSwimmerFromFormData } from "./parseSwimmerFromFormData.function";

export async function registerSwimmer(_initialState: SwimmerFormState, formData: FormData): Promise<SwimmerFormState> {
    "use server";
    let email, result;
    try {
        const swimmer = await parseSwimmerFromFormData(formData, "SELF_MANAGED", "ANNOUNCED");
        if(swimmer.teamId) return {unknownError: true};
        email = swimmer.email;
        result = await addSwimmer({
            ...swimmer,
        });
    } catch (e) {
        console.log(e);
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