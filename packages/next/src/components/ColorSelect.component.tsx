"use client"

import { CapColor } from "../model";

const COLORS = CapColor.options;

export function ColorSelect({ name, selected, disabled, title  }: { name: string, disabled?: boolean, selected?: CapColor, title:string }) {
    console.log(selected)
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

function colorForCapColor(capColor: CapColor) {
    switch (capColor) {
        case "RED":
            return "bg-cap-red";
        case "ORANGE":
            return "bg-cap-orange";
        case "GREEN":
            return "bg-cap-green";
        case "YELLOW":
            return "bg-cap-yellow";
        case "BLUE":
            return "bg-cap-blue";
        case "WHITE":
            return "bg-cap-white";
        default:
            return "bg-cap-white";
    }
}

function borderColorForCapColor(capColor: CapColor) {
    switch (capColor) {
        case "RED":
            return "border-cap-red-border";
        case "ORANGE":
            return "border-cap-orange-border";
        case "GREEN":
            return "border-cap-green-border";
        case "YELLOW":
            return "border-cap-yellow-border";
        case "BLUE":
            return "border-cap-blue-border";
        case "WHITE":
            return "border-cap-white-border";
        default:
            return "border-cap-white-border";
    }
}

function colorToString(capColor: CapColor) {
    switch (capColor) {
        case "RED":
            return "Rot";
        case "ORANGE":
            return "Orange";
        case "GREEN":
            return "Grün";
        case "YELLOW":
            return "Gelb";
        case "BLUE":
            return "Blau";
        case "WHITE":
            return "Weiß";
        default:
            return "???";
    }
}