"use client"

import { Swimmer } from "@/src/model";
import { useActionState } from "react";
import { HintBox } from "../../HintBox.component";
import { Form } from "../../Form";
import { Input } from "../../Input.component";
import { Select } from "../../Select.component";
import { ResetButton, SubmitButton } from "../../Button.component";
import { Hint } from "../../Hint.component";
import { CheckBox } from "../../CheckBox.component";

export type FormAction<T> = (initialState: T, formData: FormData) => Promise<T>;

export type SwimmerFormState = {
    issues?: string[],
    emailAlreadyExists?: boolean,
    unknownError?: boolean
}

function fieldToText(field: keyof Swimmer): string {
    switch (field) {
        case "email": return "Die E-Mail ist nicht korrekt. Bitte prüfen Sie diese";
        case "birthday": return "Das Geburstdatum ist falsch formatiert oder liegt nicht zw. dem 01.01.1900 und dem 01.01.2022";
    }
    return field;
}

export function SwimmerForm({ serverAction, swimmer, teamId, teamHash, submitButtonText, noMail }: { serverAction: FormAction<SwimmerFormState>, swimmer?: Partial<Swimmer>, teamId?: string, submitButtonText?: string, teamHash?: string, noMail?: boolean }) {
    const [state, formAction, pending] = useActionState(serverAction, {});

    return <div>
        <HintBox>
            {state.emailAlreadyExists && <Hint type="ERROR">Die E-Mail wurde bereits verwendet um ein Team anzumelden.</Hint>}
            {state.unknownError && <Hint type="ERROR">Ein Fehler ist aufgetreten. Probieren sie es später noch einmal.</Hint>}
            {state.issues?.map((issue, index) => <Hint key={index} type="ERROR">{issue}</Hint>)}
        </HintBox>
        <Form action={formAction}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input title="Vorname" name="firstName" type="text" defaultValue={swimmer?.firstName} disabled={pending} />
                <Input title="Nachname" name="lastName" type="text" defaultValue={swimmer?.lastName} disabled={pending} />
                {noMail ? <></> : <Input title="E-Mail" name="email" type="text" defaultValue={swimmer?.email} disabled={pending} />}
                <Input title="Geburtstag" name="birthday" type="date" defaultValue={swimmer?.birthday} disabled={pending} />
                <Input title="Wohnort" name="city" type="text" defaultValue={swimmer?.city} disabled={pending} />
                <Select title="Geschlecht" name="gender" defaultValue={swimmer?.gender ?? "0"} disabled={pending}>
                    <option value="0">Keine Angabe</option>
                    <option value="W">Weiblich</option>
                    <option value="M">Männlich</option>
                </Select>
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <CheckBox name="noPublishName" disabled={pending}><p>Ich möchte <span className="font-bold underline">NICHT</span> namentlich genannt werden <span className="font-bold italic text-dlrg-red">(Führt zum Ausschluss von allen Wertungen und Siegerehrungen - <span className="underline">Leistungen werden dem Team jedoch angerechnet</span>)</span></p></CheckBox>
                <CheckBox name="breakfast" disabled={pending}><p>Ich möchte Frühstück <span className="font-bold italic text-dlrg-red">(6€ bei Anmeldung zusätzlich zu bezahlen)</span></p></CheckBox>
                <CheckBox name="newsletter" disabled={pending}><p>Ich möchte per E-Mail über zukünfige Ereignisse informiert werden</p></CheckBox>
            </div>
            <div className="pt-4 flex flex-row gap-4">
                <SubmitButton className="w-full" disabled={pending}>{submitButtonText || "Senden"}</SubmitButton>
                {swimmer && <ResetButton className="w-full" disabled={pending}>Zurücksetzen</ResetButton>}
            </div>
            {teamId && <input type="hidden" name="teamId" value={teamId} />}
            {teamHash && <input type="hidden" name="teamHash" value={teamHash} />}
        </Form>
    </div>
}