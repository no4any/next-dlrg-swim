
const Types = {
    "ERROR": {
        border: "border-error",
        background: "bg-error/20",
        text: "text-error"
    },
    "WARNING": {
        border: "border-warninr",
        background: "bg-warning/20",
        text: "text-warning"
    },
    "INFO": {
        border: "border-black",
        background: "bg-black/20",
        text: "text-black"
    },
    "SUCCESS": {
        border: "border-success",
        background: "bg-success/20",
        text: "text-success"
    }
}

export function Hint({ children, type }: { children: React.ReactElement | string, type?: keyof typeof Types }) {
    const colors = Types[type ?? "INFO"];

    return <div className={`rounded-md p-3 border ${colors.border} ${colors.background} ${colors.text}`}>
        {children}
    </div>
}