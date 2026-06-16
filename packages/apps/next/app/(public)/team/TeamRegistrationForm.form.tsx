"use client"

import { Input } from "@/components/form/Input.component"
import { SubmitButton } from "@/components/form/SubmitButton"
import { Grid } from "@/components/grid/Grid.component"
import { GridItem } from "@/components/grid/GridItem.component"
import Form from 'next/form'
import { teamRegistrationAction } from "./teamRegistationAction.action"

export function TeamRegistationForm() {
    return <Form action={teamRegistrationAction}>
        <Grid>
            <GridItem>
                <Input name="name">Teamname</Input>
            </GridItem>
            <GridItem>
                <Input name="manager">Name des Teammanagers</Input>
            </GridItem>
            <GridItem>
                <Input name="email">E-Mail</Input>
            </GridItem>
        </Grid>
        <SubmitButton>Anmelden</SubmitButton>
    </Form>
}