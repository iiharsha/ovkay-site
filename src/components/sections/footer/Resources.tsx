import resources from "@/data/resources.json"
import Link from "next/link"

export default function Resources() {
    return (
        <nav className="grid grid-cols-1 gap-2">
            {resources.map((item, i) => (
                <div key={i}>
                    <Link
                        href={item.url}
                        className="mb-2 text-[16px] font-semibold text-gray-300
                        hover:text-gray-200 transition-colors block hover:underline"
                    >
                        {item.title}
                    </Link>
                </div>
            ))}
        </nav>
    )
}
