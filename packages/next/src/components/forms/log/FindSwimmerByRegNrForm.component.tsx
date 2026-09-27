"use client"

import { useActionState } from "react";
import { Form } from "../../Form";
import { Input } from "../../Input.component";
import { findSwimmerByRegNrAction } from "./findSwimmerByRegNrAction";
import { SubmitButton } from "../../Button.component";
import { Hint } from "../../Hint.component";
import { HintBox } from "../../HintBox.component";

export type FindSwimmerByRegNrFormProps = {
    unkownError?: true,
    errors?: string[]
}

export default function FindSwimmerByRegNrForm() {
    const [state, formAction, pending] = useActionState(findSwimmerByRegNrAction, {});

    return <div>
        {(state.errors?.length || state.unkownError) && <HintBox>
            {state.unkownError && <Hint type="ERROR">Ein Fehler ist aufgetreten</Hint>}
            {state.errors?.map((error, i) => <Hint key={i} type="ERROR">{error}</Hint>)}
        </HintBox>}
        <Form action={formAction}>
            <div className="my-4">
                <Input disabled={pending} type="number" title="Registrierungsnummer" name="regNr" />
            </div>
            <SubmitButton className="w-full">Swimmer nach Registrierungsnummer suchen</SubmitButton>
        </Form>
    </div>
}