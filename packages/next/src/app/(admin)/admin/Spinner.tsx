import { AiOutlineLoading3Quarters } from "react-icons/ai";

export async function Spinner() {
    return <div className="h-full flex items-center justify-center">
        <div className="p-4">
            <AiOutlineLoading3Quarters className="size-32 md:size-64 animate-spin text-dlrg-blue"/>
        </div>
    </div>    
}