"use client"

import { Form } from "@/src/components/Form";
import { Swimmer, Team } from "@/src/model";
import { useActionState } from "react";
import { Select } from "@/src/components/Select.component";
import { ResetButton, SubmitButton } from "@/src/components/Button.component";
import { updateSwimmerTeamAction } from "./updateSwimmerTeamAction";
import { HintBox } from "@/src/components/HintBox.component";
import { Hint } from "@/src/components/Hint.component";

export type UpdateSwimmerTeamFormState = {
    errors?: string[]
}

export function UpdateSwimmerTeamForm({ swimmer, teams }: { swimmer: Swimmer, teams: Team[] }) {
    const [state, formAction, pending] = useActionState(updateSwimmerTeamAction, {});

    return <div>
        <HintBox>
            {state.errors && state.errors.map((error, i) => <Hint type="ERROR" key={i}>{error}</Hint>)}
        </HintBox>
        <Form action={formAction}>
            <input type="hidden" name="id" value={swimmer._id} />
            <Select title="Team" name="teamId" defaultValue={swimmer?.teamId ?? "0"} disabled={pending}>
                <option value="0">Kein Team</option>
                {teams.map((team) => <option key={team._id.toString()} value={team._id.toString()}>{team.name}</option>)}
            </Select>
            <div className="pt-4 flex flex-row gap-4">
                <SubmitButton className="w-full" disabled={pending}>Ändern</SubmitButton>
                <ResetButton className="w-full" disabled={pending}>Zurücksetzen</ResetButton>
            </div>
        </Form>
    </div>
}