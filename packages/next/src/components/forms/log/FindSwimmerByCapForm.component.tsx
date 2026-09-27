"use client"

import { useActionState } from "react";
import { findSwimmerByRegNrAction } from "./findSwimmerByRegNrAction";
import { HintBox } from "../../HintBox.component";
import { Hint } from "../../Hint.component";
import { Form } from "../../Form";
import { Input } from "../../Input.component";
import { SubmitButton } from "../../Button.component";
import { ColorSelect } from "../../ColorSelect.component";
import { findSwimmerByCapAction } from "./findSwimmerByCapAction copy";

export type FindSwimmerByCapColorFormProps = {
    unkownError?: true,
    errors?: string[]
}

export default function FindSwimmerByCapColorForm() {
    const [state, formAction, pending] = useActionState(findSwimmerByCapAction, {});

    return <div>
        {(state.errors?.length || state.unkownError) && <HintBox>
            {state.unkownError && <Hint type="ERROR">Ein Fehler ist aufgetreten</Hint>}
            {state.errors?.map((error, i) => <Hint key={i} type="ERROR">{error}</Hint>)}
        </HintBox>}
        <Form action={formAction}>
            <div className="my-4">
                <ColorSelect name="capColor" title="Kappenfarbe" />
            </div>
            <Input disabled={pending} type="number" title="Registrierungsnummer" name="capNr" />
            <SubmitButton className="mt-4 w-full">Swimmer nach Badekappe suchen</SubmitButton>
        </Form>
    </div>
}