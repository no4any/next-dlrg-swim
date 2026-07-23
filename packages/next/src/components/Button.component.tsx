import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {

}

export function Button({ children, ...rest }: ButtonProps) {
    return <button {...rest} className={`bg-dlrg-blue hover:bg-dlrg-blue/90 cursor-pointer disabled:bg-gray-700 disabled:text-white disabled:cursor-wait text-white font-medium py-2 px-4 rounded transition duration-200 ease-in-out ${rest.className || ""}`}>{children}</button>
}