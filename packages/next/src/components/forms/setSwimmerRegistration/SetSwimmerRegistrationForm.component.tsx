"use client"

import { Form } from "@/src/components/Form";
import { RegistrationStatus, Swimmer } from "@/src/model";
import { useActionState } from "react";
import { registerSwimmer } from "./registerSwimmer.action";
import { ColorSelect } from "@/src/components/ColorSelect.component";
import { Input } from "@/src/components/Input.component";
import { ResetButton, SubmitButton } from "@/src/components/Button.component";
import { HintBox } from "@/src/components/HintBox.component";
import { Hint } from "@/src/components/Hint.component";

export type RegsiterSwimmerFormData = {
    errors?: string[],
    unknownError?: boolean
}

export function SetSwimmerRegistrationForm({ swimmer, action, withReset }: { withReset?: boolean, swimmer: Swimmer, action: (_initialData: RegsiterSwimmerFormData, formData: FormData) => Promise<RegsiterSwimmerFormData> }) {
    const [state, formAction, pending] = useActionState(action, {});
    return <div>
        <HintBox>
            {state.unknownError && <Hint type="ERROR">Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.</Hint>}
            {state.errors && state.errors.map((error, i) => <Hint type="ERROR" key={i}>{error}</Hint>)}
        </HintBox>
        <Form action={formAction}>
            <ColorSelect title="Farbe der Badekappe" name="color" disabled={pending} selected={swimmer.capColor ?? undefined}/>
            <input type="hidden" name="id" title="ID des Schwimmers" value={swimmer._id} />
            <Input type="number" name="capNr" title="Nummer der Badekappe" min={1} max={100} disabled={pending} defaultValue={swimmer.capNr ?? undefined} />
            <Input type="number" name="regNr" title="Nummer auf dem Bändchen (die letzten 3 Ziffern)" min={1} max={999} disabled={pending} defaultValue={swimmer.regNr ?? undefined} />
            {withReset && <ResetButton className="w-full mt-3">Zurücksetzen</ResetButton>}
            <SubmitButton className="w-full mt-3">Registrieren</SubmitButton>
        </Form>
    </div>
}