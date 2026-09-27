"use client"

import { Form } from "@/src/components/Form"
import { useActionState } from "react";
import { addLapCardAction } from "./addLapCardAction";
import { Input } from "@/src/components/Input.component";
import { CheckBox } from "@/src/components/CheckBox.component";
import { ButtonSuccess, SubmitButton } from "@/src/components/Button.component";
import Link from "next/link";

export function AddLapCardForm({ swimmerId }: { swimmerId: string }) {
    const [state, formAction, pending] = useActionState(addLapCardAction, {});

    return <div className="mb-4">
        {state.id && <h2>Erfasst mit ID {state.id}</h2>}
        <Form action={formAction}>
            <Input disabled={pending || !!state.id} type="number" name="laps" title="Bahnen" />
            <input  disabled={pending|| !!state.id} type="hidden" name="swimmerId" value={swimmerId} />
            <CheckBox disabled={pending|| !!state.id} name="isNightCup">Nachpokal</CheckBox>
            {!state.id && <SubmitButton disabled={pending|| !!state.id} className="w-full">Karte anlegen</SubmitButton>}
        </Form>
        {state.id && <Link href="/admin/log"><ButtonSuccess className="w-full">Weitere erfassen</ButtonSuccess></Link>}
    </div>
}