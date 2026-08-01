"use client"

import { useActionState } from "react"
import { SubmitButton } from "../../Button.component"
import { Form } from "../../Form"
import { exampleAction } from "./exampleAction.action"
import { ColorSelect } from "../../ColorSelect.component"

export type ExampleFormState = {
    errors?: string[]
}

export function ExampleForm() {
    const [state, formAction, pending] = useActionState(exampleAction, {});

    return <div>
        <div>
            {state.errors?.map((error, index) => <p key={index}>{error}</p>)}
        </div>
        <Form action={formAction}>
            <ColorSelect name="color" title="Kappenfarbe"/>
            <SubmitButton>Senden</SubmitButton>
        </Form>
    </div>
}