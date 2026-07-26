"use client"

import { useActionState } from "react";
import { SubmitButton } from "../../Button.component";
import { Form } from "../../Form";
import { Input } from "../../Input.component";
import { login } from "./login.action";
import { Hint } from "../../Hint.component";
import { HintBox } from "../../HintBox.component";

export type LoginFormState = {
    wrongCredentials?: boolean,
    error?: boolean
}

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(login, {});

    return <Form action={formAction}>
        <div className="flex flex-col gap-4">
            <HintBox>
                {state.wrongCredentials && <Hint type="WARNING">E-Mail oder Passwort falsch.</Hint>}
                {state.error && <Hint type="ERROR">Ein unbekannter Fehler ist aufgetreten. Versuchen Sie es später noch einmal.</Hint>}
            </HintBox>
            <div className="flex flex-row gap-4">
                <Input type="text" name="email" disabled={pending} placeholder="E-Mail" title="E-Mail" />
                <Input type="password" name="password" disabled={pending} placeholder="Password" title="Password" />
            </div>
            <div className="flex flex-row">
                <SubmitButton className="w-full" disabled={pending}>Anmelden</SubmitButton>
            </div>
        </div>
    </Form>
}