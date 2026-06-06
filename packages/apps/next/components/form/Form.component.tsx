"use client"

import React from "react";

export function Form({children}: {children: React.ReactNode}) {
    return <form onSubmit={function (e) {
        e.preventDefault();
    }}>
        {children}
    </form>
}