import React from "react";

export async function Widget({children, title} : {title: string, children: React.ReactElement | React.ReactElement[]}) {
    return <div className="md:h-64 bg-gray-200 p-2 rounded-md">
        <h2>{title}</h2>
        <div></div>
        {children}
    </div>
}