"use client"

import { Form } from "@/src/components/Form";
import { LapsCard } from "@/src/model/LapsCard.zod";
import { changeLogAction } from "./changeLogAction.function";
import { useActionState } from "react";
import { Input } from "@/src/components/Input.component";
import { ResetButton, SubmitButton } from "@/src/components/Button.component";
import { HintBox } from "@/src/components/HintBox.component";
import { Hint } from "@/src/components/Hint.component";
import { CheckBox } from "@/src/components/CheckBox.component";

export type ChangeLogFormStateProps = {
    errors?: string[]
}

export function ChangeLogForm({ log }: { log: LapsCard }) {
    const [state, formAction, pending] = useActionState(changeLogAction, {});

    return <>
        {(state.errors?.length) && <HintBox>
            {state.errors?.map((error, i) => <Hint key={i} type="ERROR">{error}</Hint>)}
        </HintBox>}
        <Form action={formAction}>
            <Input disabled={pending} type="number" defaultValue={log.laps} name="laps" title="Bahnen" />
            <CheckBox name="isNightCup" defaultChecked={!!log.isNightCup}>Nachtpokal</CheckBox>
            <input type="hidden" name="id" value={log._id.toString()} />
            <ResetButton className="mt-2 w-full">Zurücksetzen</ResetButton>
            <SubmitButton className="mt-2 w-full" disabled={pending}>Ändern</SubmitButton>
        </Form>
    </>
}