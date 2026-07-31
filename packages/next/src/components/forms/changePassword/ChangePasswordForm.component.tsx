"use client"

import { useActionState } from "react";
import { Form } from "../../Form"
import { changePassword } from "./changePassword.action";
import { HintBox } from "../../HintBox.component";
import { Hint } from "../../Hint.component";
import { Input } from "../../Input.component";
import { SubmitButton } from "../../Button.component";

export type ChangePasswordFormState = {
    notLoggedIn?: boolean,
    oldPasswordWrong?: boolean,
    passwordsNotIdentical?: boolean,
    unknownError?: boolean,
    issues?: string[]
}

export function ChangePasswordForm() {
    const [state, formAction, pending] = useActionState(changePassword, {});

    return <div>
        <HintBox>
            {state.notLoggedIn && <Hint type="ERROR">Sie sind nicht angemeldet!</Hint>}
            {state.oldPasswordWrong && <Hint type="ERROR">Das ursprüngliche Passwort ist falsch!</Hint>}
            {state.passwordsNotIdentical && <Hint type="ERROR">Passwort und bestätigung des Passwortes sind nicht identisch!</Hint>}
            {state.passwordsNotIdentical && <Hint type="ERROR">Das neue Passwort ist zu kurz. Mindestens 12 Zeichen</Hint>}
            {state.unknownError && <Hint type="ERROR">Ein unbekannter Fehler ist aufgetreten. Versuchen Sie es später noch einmal!</Hint>}
            {state.issues?.map((error, index) => <Hint type="ERROR" key={index}>{error}</Hint>)}
        </HintBox>
        <Form action={formAction}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                <Input type="password" disabled={pending} name="oldPassword" title="Altes Passwort" placeholder="Altes Passwort" />
                <Input type="password" disabled={pending} name="newPassword" title="Neues Passwort" placeholder="Neues Passwort" />
                <Input type="password" disabled={pending} name="newPasswordConfirm" title="Bestätigung des Neuen Passwortes" placeholder="Altes Passwort" />
            </div>
            <SubmitButton className="w-full">Passwort ändern</SubmitButton>
        </Form >
    </div>
}