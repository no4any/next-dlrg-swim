import { InputHTMLAttributes } from "react"

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
    children: React.ReactElement | string
}


export function CheckBox({ children, className, type, ...rest }: CheckBoxProps) {
    return <label>
        <div className="flex flex-row gap-2 select-none">
            <div className="shrink">
                <input type="checkbox" {...rest} />
            </div>
            <div className="grow">
                {children}
            </div>
        </div>
    </label>
}