import { CAP_COLORS } from '@/src/lib'

export function ColorSelect({ name, title }: { name: string, title?: string }) {
    return <fieldset className="select-none">
        {title && <legend>{title}</legend>}
        <div className="flex flex-col gap-2">
            {Object.keys(CAP_COLORS).map((colorKey) => <label key={colorKey}>
                <input type="radio" name={name} value={colorKey} />
                <span className="ml-2">{CAP_COLORS[colorKey].name}</span>
            </label>)}
        </div>
    </fieldset>
}