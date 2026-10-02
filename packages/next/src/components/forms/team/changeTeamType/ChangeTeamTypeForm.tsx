"use client"

import { HintBox } from "@/src/components/HintBox.component";
import { Team, TeamType } from "@/src/model";
import { useActionState } from "react";
import { changeTeamTypeAction } from "./changeTeamTypeAction";
import { Hint } from "@/src/components/Hint.component";
import { Form } from "@/src/components/Form";
import { Select } from "@/src/components/Select.component";
import { ResetButton, SubmitButton } from "@/src/components/Button.component";

export type ChangeTeamTypeFormState = {
    errors?: string[]
}

export function ChangeTeamTypeForm({ team }: { team: Team }) {
    const [state, formAction, pending] = useActionState(changeTeamTypeAction, {});

    return <div>
        <HintBox>
            {state.errors && state.errors.map((e, i) => <Hint key={i} type="ERROR">{e}</Hint>)}
        </HintBox>
        <Form action={formAction}>
            <input type="hidden" name="teamId" value={team._id?.toString()} />
            <Select className="w-full" title="Art des Teams" disabled={pending} name="teamType" defaultValue={team?.teamType}>
                {TeamType.options.map((option) => <option value={option.valueOf()} key={option.valueOf()}>
                    {option.valueOf()}
                </option>)}
            </Select>
            <div className="pt-4 grid grid-cols-1 gap-4">
                <SubmitButton className="w-full" disabled={pending}>Ändern</SubmitButton>
                <ResetButton>Zurücksetzen</ResetButton>
            </div>
        </Form>
    </div>
}