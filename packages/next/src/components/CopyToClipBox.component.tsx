"use client"

import { FaCopy } from "react-icons/fa"
import { ButtonInfo } from "./Button.component"
import { useEffect, useState } from "react";

export function CopyToClipBox({ value, isPath }: { value: string, isPath?: boolean }) {
    const [text, setText] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        // Dieser Code läuft jetzt garantiert nur im Browser
        if (isPath) {
            const protocol = window.location.protocol;
            const domain = window.location.hostname;
            const port = window.location.port;
            const portString = port ? `:${port}` : "";

            setText(`${protocol}//${domain}${portString}${value}`);
        } else {
            setText(value);
        }
    }, [value, isPath]);

    // Verhindert ein Hydrations-Mismatch auf dem Server
    if (!isMounted) {
        return <div className="rounded-md border-2 w-min h-10 opacity-0" />;
    }

    return (
        <div className="rounded-md border-2 w-min flex flex-row items-center">
            <div className="flex shrink px-2">
                <input
                    type="text"
                    className="cursor-pointer outline-0"
                    readOnly
                    value={text}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className="flex shrink">
                {/* Wichtig: button statt ButtonInfo, falls ButtonInfo keine Standard-Props durchreicht */}
                <ButtonInfo
                    onClick={() => {navigator.clipboard.writeText(text); alert("Link kopiert!")}}
                    className="p-2 hover:bg-gray-100 transition-colors"
                >
                    <FaCopy />
                </ButtonInfo>
            </div>
        </div>
    );
}