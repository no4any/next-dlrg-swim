"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

const LOCAL_STORAGE_KEY_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
type Theme = typeof THEME_DARK | typeof THEME_LIGHT;
type ThemeWithNullable = Theme | null;

export function DarkToggle() {
    const [isDark, setIsDark] = useState<boolean>(true);

    function applyTheme(isDark: boolean) {
        document.documentElement.classList.toggle('dark', isDark);
    }

    function getTheme(): ThemeWithNullable {
        if (typeof window === "undefined") {
            return null;
        }
        return localStorage.getItem(LOCAL_STORAGE_KEY_THEME) as ThemeWithNullable;
    }

    function setTheme(theme: Theme) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY_THEME, theme);
        setIsDark(theme === THEME_DARK);
    }

    function toggle() {
        setTheme(getTheme() !== THEME_DARK ? THEME_DARK : THEME_LIGHT);
    }

    useEffect(() => {
        applyTheme(isDark);
    }, [isDark])

    return <Button onClick={toggle}>
        {isDark ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
    </Button>
}