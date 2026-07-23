"use client"

import { Team, TeamType } from "@/src/model";
import { useActionState } from "react";
import { Form } from "../Form";
import { Input } from "../Input.component";
import { Select } from "../Select.component";
import { Button } from "../Button.component";
import { Hint } from "../Hint.component";

export type FormAction<T> = (initialState: T, formData: FormData) => Promise<T>;

export type TeamFormState = {
    fields?: string[],
    emailAlreadyExists?: boolean,
    teamNameAlreadyExists?: boolean,
    unknownError?: boolean
}

export function TeamForm({ serverAction, team, submitButtonText }: { serverAction: FormAction<TeamFormState>, team?: Partial<Team>, submitButtonText?: string }) {
    const [state, formAction, pending] = useActionState(serverAction, {});

    return <div>
        <Hint type="ERROR">Hello World!</Hint>
        <Hint type="INFO">Hello World!</Hint>
        <Hint type="SUCCESS">Hello World!</Hint>
        <Hint type="WARNING">Hello World!</Hint>
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
            <div className="pt-4">
                <Button className="w-full" disabled={pending} type="submit">{submitButtonText || "Senden"} ({JSON.stringify(state)})</Button>
            </div>
        </Form>
    </div>
}