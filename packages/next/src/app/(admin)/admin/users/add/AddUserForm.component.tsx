"use client"

import { SubmitButton } from "@/src/components/Button.component"
import { addNewUser } from "./addNewUser.action"
import { Form } from "@/src/components/Form"
import { Input } from "@/src/components/Input.component"
import { Select } from "@/src/components/Select.component"
import { useActionState } from "react"
import { HintBox } from "@/src/components/HintBox.component"
import { Hint } from "@/src/components/Hint.component"

export type AddUserFormProps = {
}

export type AddUserFormState = {
    emailAlreadyExists?: boolean,
    unknownError?: boolean,
    issues?: string[]
}

export function AddUserForm() {
    const [state, formAction, pending] = useActionState(addNewUser, {})
    return <div>
        <HintBox>
            {state.emailAlreadyExists && <Hint type="ERROR">Ein Benutzer mit dieser E-Mail existiert bereits.</Hint>}
            {state.unknownError && <Hint type="ERROR">Ein unbekannter Fehler ist aufgetreten. Versuschen Sie es später noch einmal.</Hint>}
            {state.issues?.map((issue, index) => <Hint type="ERROR" key={index}>{issue}</Hint>)}
        </HintBox>
        <Form action={formAction}>
            <div className="flex flex-col gap-4">
                <Input title="E-Mail" name="email" disabled={pending} placeholder="E-Mail" />
                <Input title="Passwort" type="password" name="password" disabled={pending} placeholder="Passwort" />
                <Select title="Art des Benutzers" name="type">
                    <option value="user">Einfacher Benutzer</option>
                    <option value="admin">Administrator</option>
                </Select>
                <SubmitButton>Benutzer anlegen</SubmitButton>
            </div>
        </Form>
    </div>
}