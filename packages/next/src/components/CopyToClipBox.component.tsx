"use client"

import { FaCopy } from "react-icons/fa"
import { ButtonInfo } from "./Button.component"
import { useState } from "react";

export function CopyToClipBox({ value, isPath }: { value: string, isPath?: boolean }) {
    const protocol = window.location.protocol;
    const domain = window.location.hostname;
    const port = window.location.port;;
    const text = isPath ? `${protocol}//${domain}${port && `:${port}`}${value}` : value;

    return <div className="rounded-md border-2 w-min flex flex-row">
        <div className="flex shrink px-2">
            <input type="text" className="cursor-pointer outline-0" readOnly value={text} onFocus={(e) => e.target.select()} />
        </div>
        <div className="flex shrink">
            <ButtonInfo onClick={() => navigator.clipboard.writeText(text)} >
                <FaCopy />
            </ButtonInfo>
        </div>
    </div>
}