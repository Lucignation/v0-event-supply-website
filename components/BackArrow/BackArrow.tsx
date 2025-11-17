import { ArrowLeft } from "lucide-react"

export default function BackArrow({ title }: { title: string }) {
    return (
        <div onClick={() => window.history.back()} className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft />
            <p>{title}</p>
        </div>
    )
}   