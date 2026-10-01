"use client"

import { Form } from "@/src/components/Form";
import { Swimmer } from "@/src/model";
import { useActionState } from "react";
import { updateSwimmerAction } from "./updateSwimmerAction";
import { Input } from "@/src/components/Input.component";
import { Select } from "@/src/components/Select.component";
import { CheckBox } from "@/src/components/CheckBox.component";
import { ResetButton, SubmitButton } from "@/src/components/Button.component";

export type UpdateSwimmerFormState = {
    errors?: string[]
}

export function UpdateSwimmerForm({ swimmer }: { swimmer: Swimmer }) {
    const [state, formAction, pending] = useActionState(updateSwimmerAction, {});

    return <Form action={formAction}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="hidden" name="id" defaultValue={swimmer._id}/>
            <Input type="text" name="firstname" title="Vorname" defaultValue={swimmer.firstName} disabled={pending} />
            <Input type="text" name="lastname" title="Nachname" defaultValue={swimmer.lastName} disabled={pending} />
            <Input type="date" name="birthday" title="Geburtstag" defaultValue={swimmer.birthday || undefined} disabled={pending} />
            <Input type="text" name="city" title="Wohnort" defaultValue={swimmer.city || undefined} disabled={pending} />
            <Select title="Geschlecht" name="gender" defaultValue={swimmer?.gender ?? "0"} disabled={pending}>
                <option value="0">Keine Angabe</option>
                <option value="W">Weiblich</option>
                <option value="M">Männlich</option>
            </Select>
        </div>
        <div className="flex flex-col gap-2 mt-4">
            <CheckBox name="noPublishName" defaultChecked={!swimmer.publishName} disabled={pending}><p>Ich möchte <span className="font-bold underline">NICHT</span> namentlich genannt werden <span className="font-bold italic text-dlrg-red">(Führt zum Ausschluss von allen individuellen Wertungen und Siegerehrungen - <span className="underline">Leistungen werden dem Team jedoch angerechnet</span>)</span></p></CheckBox>
            <CheckBox name="breakfast" defaultChecked={swimmer.breakfast || undefined} disabled={pending}><p>Ich möchte Frühstück <span className="font-bold italic text-dlrg-red">(7€ bei Anmeldung zusätzlich zu bezahlen - Die Anmeldung zum Frühstück nur bis 01. Oktober möglich)</span></p></CheckBox>
            <CheckBox name="newsletter" defaultChecked={swimmer.newsletter || undefined} disabled={pending}><p>Ich möchte per E-Mail über zukünfige Ereignisse informiert werden</p></CheckBox>
        </div>
        <div className="pt-4 flex flex-row gap-4">
            <SubmitButton className="w-full" disabled={pending}>Ändern</SubmitButton>
            <ResetButton className="w-full" disabled={pending}>Zurücksetzen</ResetButton>
        </div>
    </Form>
}