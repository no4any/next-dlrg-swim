import { CheckBox } from "@/components/form/Checkbox.component";
import { Input } from "@/components/form/Input.component";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Grid } from "@/components/grid/Grid.component";
import { GridItem } from "@/components/grid/GridItem.component";

export const revlidation = 0;

export default async function AdminPage() {
    return <div className="bg-bg-menu/75 backdrop-blur-sm rounded-2xl p-3 m-5">
        <div className="py-5">
            <h1>Anmeldung zum 24 Stunden-Schwimmen der DLRG Gießen</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus nemo in cupiditate enim quisquam similique dolorem molestiae voluptatum! Assumenda esse totam, corrupti recusandae consequuntur quae fugiat hic magni exercitationem ullam?</p>
        </div>
        <Grid>
            <GridItem><Input type="text" defaultValue={"Hallo Welt"}>Titel</Input></GridItem>
            <GridItem><CheckBox>Hallo Welt</CheckBox></GridItem>
            <GridItem><SubmitButton>Submit</SubmitButton></GridItem>
            <GridItem>4</GridItem>
            <GridItem>5</GridItem>
            <GridItem>6</GridItem>
            <GridItem>7</GridItem>
            <GridItem>8</GridItem>
            <GridItem>9</GridItem>
        </Grid>
    </div>
}