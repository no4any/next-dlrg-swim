"use client"

import { borderColorForCapColor, colorForCapColor, colorToString } from "../lib";
import { CapColor } from "../model";

const COLORS = CapColor.options;

export function ColorSelect({ name, selected, disabled, title  }: { name: string, disabled?: boolean, selected?: CapColor, title:string }) {
    return <div>
        <legend className="text-md select-none font-bold">{title}</legend>
        <fieldset className="grid grid-rows-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {COLORS.map(color => <ColorButton key={color} name={name} color={color} disabled={disabled} selectedColor={selected}  />)}
        </fieldset>
    </div>
}

function ColorButton({ color, name, selectedColor, disabled, onClick }: { color: CapColor, name: string, selectedColor?: CapColor, disabled?: boolean, onClick?: () => void }) {
    return <label>
        <input
            type="radio"
            name={name}
            disabled={disabled}
            defaultChecked={selectedColor === color}
            value={color}
            className="peer sr-only"
        />
        <div className={`w-full peer-checked:font-bold peer-checked:outline text-center rounded-md border py-1 cursor-pointer ${colorForCapColor(color)} ${borderColorForCapColor(color)}`}>
            {colorToString(color)}
        </div>
    </label>
}





