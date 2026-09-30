"use client"

import { ResetButton, SubmitButton } from "@/src/components/Button.component"
import { Form } from "@/src/components/Form"
import { Input } from "@/src/components/Input.component"
import { useActionState } from "react"
import { HintBox } from "@/src/components/HintBox.component"
import { Hint } from "@/src/components/Hint.component"
import { updateTeamNameAction } from "./updateTeamNameAction"

export type UpdateTeamNameFormStateProps = {
    errors?: string[]
}

export function UpdateTeamNameForm({ id, name }: { id: string, name: string }) {
    const [state, formAction, pending] = useActionState(updateTeamNameAction, {});

    return <div>
        {state.errors?.length && <HintBox>
            {state.errors?.map((error, i) => <Hint key={i} type="ERROR">{error}</Hint>)}
        </HintBox>}
        <Form action={formAction}>
            <Input disabled={pending} type="text" name="name" defaultValue={name} title="Teamname" />
            <input type="hidden" value={id} name="id" />
            <SubmitButton disabled={pending} className="w-full mt-2">Ändern</SubmitButton>
            <ResetButton disabled={pending} className="w-full mt-2">Zurücksetzen</ResetButton>
        </Form>
    </div>
}