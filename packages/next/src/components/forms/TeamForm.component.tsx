"use client"

import { Team, TeamType } from "@/src/model";
import { useActionState } from "react";
import { Form } from "../Form";

export type FormAction<T> = (initialState: T, formData: FormData) => Promise<T>;

export type TeamFormState = {
    fields?: string[],
    emailAlreadyExists?: boolean,
    teamNameAlreadyExists?: boolean,
    unknownError?: boolean
}

export function TeamForm({ serverAction, team, submitButtonText }: { serverAction: FormAction<TeamFormState>, team?: Partial<Team>, submitButtonText?: string }) {
    const [state, formAction, pending] = useActionState(serverAction, {});

    return <Form action={formAction} className="grid grid-cols-3 gap-4">
        <input disabled={pending} type="text" placeholder="Name" name="name" defaultValue={team?.name} />
        <input disabled={pending} type="text" placeholder="Name des Managers" name="managerName" defaultValue={team?.managerName} />
        <input disabled={pending} type="text" placeholder="E-Mail" name="email" defaultValue={team?.email} />
        <select disabled={pending} name="teamType" value={team?.teamType}>
            {TeamType.options.map((option) => <option value={option.valueOf()} key={option.valueOf()}>
                {option.valueOf()}
            </option>)}
        </select>
        <button disabled={pending} type="submit">{submitButtonText || "Senden"} ({JSON.stringify(state)})</button>
    </Form>
}