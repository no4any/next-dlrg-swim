"use client"

import { Team, TeamType } from "@/src/model";
import { useActionState } from "react";
import { Form } from "../Form";
import { Input } from "../Input.component";
import { Select } from "../Select.component";
import { ResetButton, SubmitButton } from "../Button.component";
import { Hint } from "../Hint.component";
import { HintBox } from "../HintBox.component";

export type FormAction<T> = (initialState: T, formData: FormData) => Promise<T>;

export type TeamFormState = {
    fields?: Array<keyof Team>,
    emailAlreadyExists?: boolean,
    teamNameAlreadyExists?: boolean,
    unknownError?: boolean
}

function fieldToText(field: keyof Team): string {
    switch (field) {
        case "email": return "Die E-Mail ist nicht korrekt. Bitte prüfen Sie diese";
        case "name": return "Der Teamname ist zu lang oder zu kurz (mindestens 3 Zeichen, maximal 255 Zeichen)";
        case "managerName": return "Der Name des Teammanagers ist zu lang oder zu kurz (mindestens 3 Zeichen, maximal 255 Zeichen)";
    }
    return field;
}

export function TeamForm({ serverAction, team, submitButtonText }: { serverAction: FormAction<TeamFormState>, team?: Partial<Team>, submitButtonText?: string }) {
    const [state, formAction, pending] = useActionState(serverAction, {});

    return <div>
        <HintBox>
            {state.emailAlreadyExists && <Hint type="ERROR">Die E-Mail wurde bereits verwendet um ein Team anzumelden.</Hint>}
            {state.teamNameAlreadyExists && <Hint type="ERROR">Der Teamname wurde bereits verwendet.</Hint>}
            {state.unknownError && <Hint type="ERROR">Ein Fehler ist aufgetreten. Probieren sie es später noch einmal.</Hint>}
            {state.fields?.filter((field) => field !== "nameLower").map((field) => <Hint key={field} type="ERROR">{fieldToText(field)}</Hint>)}
        </HintBox>
        <Form action={formAction}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input title="Teamname" disabled={pending} type="text" placeholder="Name" name="name" defaultValue={team?.name} />
                <Input title="Name des Teammanagers" disabled={pending} type="text" placeholder="Name des Managers" name="managerName" defaultValue={team?.managerName} />
                <Input title="E-Mail" disabled={pending} type="text" placeholder="E-Mail" name="email" defaultValue={team?.email} />
                <Select title="Art des Teams" disabled={pending} name="teamType" value={team?.teamType} defaultValue={"SONSTIGE"}>
                    {TeamType.options.map((option) => <option value={option.valueOf()} key={option.valueOf()}>
                        {option.valueOf()}
                    </option>)}
                </Select>
            </div>
            <div className="pt-4 grid grid-cols-2 gap-4">
                <SubmitButton className="w-full" disabled={pending}>{submitButtonText || "Senden"}</SubmitButton>
                <ResetButton color="RESET" className="w-full" disabled={pending}>Zurücksetzen</ResetButton>
            </div>
        </Form>
    </div>
}