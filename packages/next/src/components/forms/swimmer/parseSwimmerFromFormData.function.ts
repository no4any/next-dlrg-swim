import { RegistrationStatus, Swimmer, SwimmerType } from "@/src/model";

export async function parseSwimmerFromFormData(formData: FormData, type: SwimmerType, status: RegistrationStatus = "ANNOUNCED"): Promise<Swimmer> {
    const unparsedSwimmer = Object.fromEntries(formData.entries());
    return Swimmer.parse({
        type: type,
        status: status,
        firstName: unparsedSwimmer.firstName?.toString() ?? "",
        lastName: unparsedSwimmer.lastName?.toString() ?? "",
        email: unparsedSwimmer.email?.toString().toLocaleLowerCase(),
        gender: unparsedSwimmer.gender?.toString() || undefined,
        birthday: unparsedSwimmer.birthday?.toString() || undefined,
        city: unparsedSwimmer.city?.toString() || undefined,
        breakfast: unparsedSwimmer.breakfast?.toString() === "on",
        publishName: unparsedSwimmer.noPublishName?.toString() !== "on",
        newsletter: unparsedSwimmer.newsletter?.toString() === "on",
        teamId: unparsedSwimmer.teamId ? unparsedSwimmer.teamId.toString() : undefined
    })
}