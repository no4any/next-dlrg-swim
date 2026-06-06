"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

const LOCAL_STORAGE_KEY_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

export function DarkToggle() {
    const [isDark, setIsDark] = useState(false);

    function toggle() {
        setIsDark(!isDark);
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    },[isDark])

    return <Button onClick={toggle}>
        {isDark ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
    </Button>
}