"use client"

import { useActionState } from "react"
import { SubmitButton } from "../../Button.component"
import { Form } from "../../Form"
import { HintBox } from "../../HintBox.component"
import { Input } from "../../Input.component"
import { createComment } from "./createComment.action"
import { Hint } from "../../Hint.component"

export type CommentsFormProps = {
    unkownError?: true,
    errors?: string[]
}

export function CommentsForm({ id, type }: { id: string, type: "TEAM" | "SWIMMER" }) {
    const [state, formAction, pending] = useActionState(createComment, {});
    return <div className="my-2">
        {(state.errors?.length || state.unkownError) && <HintBox>
            {state.unkownError && <Hint type="ERROR">Ein Fehler ist aufgetreten</Hint>}
            {state.errors?.map((error, i) => <Hint key={i} type="ERROR">{error}</Hint>)}
        </HintBox>}
        <Form action={formAction}>
            <input type="hidden" value={id} name="id" />
            <input type="hidden" value={type} name="type" />
            <Input max={512} min={3} name="message" title="Kommentar" disabled={pending} />
            <SubmitButton className="mt-2 w-full" disabled={pending}>Kommentar anlegen</SubmitButton>
        </Form>
    </div>
}