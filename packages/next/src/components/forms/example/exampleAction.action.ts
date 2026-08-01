"use server"

import { ExampleFormState } from "./ExampleForm.component";

export async function exampleAction(_initState: ExampleFormState, formData: FormData): Promise<ExampleFormState> {
    return {
        errors: [
            "Error 1",
            "Error 2",
            formData.get("color")?.toString() ?? "Error 3",
        ],
    }
}