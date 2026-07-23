import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {}


export function SubmitButton({ children, className, ...rest }: ButtonProps) {
    return <button
        type="submit"
        className={`bg-dlrg-blue hover:bg-dlrg-blue/90 text-white cursor-pointer disabled:bg-gray-700 disabled:text-white disabled:cursor-wait font-medium py-2 px-4 rounded transition duration-300 ease-in-out ${className || ""}`}>
        {children}
    </button>
}

export function ResetButton({ children, className, ...rest }: ButtonProps) {
    return <button
        type="reset"
        className={`bg-info hover:bg-info/90 text-white cursor-pointer disabled:bg-gray-700 disabled:text-white disabled:cursor-wait font-medium py-2 px-4 rounded transition duration-300 ease-in-out ${className || ""}`}>
        {children}
    </button>
}

export function Button({ children, className, ...rest }: ButtonProps) {
    return <button
        {...rest}
        className={`bg-dlrg-blue hover:bg-dlrg-blue/90 text-white cursor-pointer disabled:bg-gray-700 disabled:text-white disabled:cursor-wait font-medium py-2 px-4 rounded transition duration-300 ease-in-out ${className || ""}`}
        >
            {children}
    </button>
}

export function ButtonError({ children, className, ...rest }: ButtonProps) {
    return <button
        {...rest}
        className={`bg-error hover:bg-error/90 text-dlrg-yellow cursor-pointer disabled:bg-gray-700 disabled:text-white disabled:cursor-wait font-medium py-2 px-4 rounded transition duration-300 ease-in-out ${className || ""}`}
        >
            {children}
    </button>
}

export function ButtonWarn({ children, className, ...rest }: ButtonProps) {
    return <button
        {...rest}
        className={`bg-warning hover:bg-warning/90 text-black cursor-pointer disabled:bg-gray-700 disabled:text-white disabled:cursor-wait font-medium py-2 px-4 rounded transition duration-300 ease-in-out ${className || ""}`}
        >
            {children}
    </button>
}

export function ButtonSuccess({ children, className, ...rest }: ButtonProps) {
    return <button
        {...rest}
        className={`bg-success hover:bg-success/90 text-white cursor-pointer disabled:bg-gray-700 disabled:text-white disabled:cursor-wait font-medium py-2 px-4 rounded transition duration-300 ease-in-out ${className || ""}`}
        >
            {children}
    </button>
}

export function ButtonInfo({ children, className, ...rest }: ButtonProps) {
    return <button
        {...rest}
        className={`bg-info hover:bg-info/90 text-white cursor-pointer disabled:bg-gray-700 disabled:text-white disabled:cursor-wait font-medium py-2 px-4 rounded transition duration-300 ease-in-out ${className || ""}`}
        >
            {children}
    </button>
}