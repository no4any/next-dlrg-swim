"use client"

import React from "react";

export function Detail({title, children}: {title: string, children: React.ReactElement | string}) {
    return <dl>
        <dt className="font-bold">{title}:</dt>
        <dd>{children}</dd>
    </dl>
}