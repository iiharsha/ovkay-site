import resources from "@/data/resources.json"
import Link from "next/link"

export default function Resources() {
    return (
        <nav className="font-mallory grid grid-cols-1 gap-2">
            {resources.map((item, i) => (
                <div key={i}>
                    <Link
                        href={item.url}
                        className="mb-2 text-[20px] font-medium text-gray-300
                         transition-colors block hover:text-accent"
                    >
                        {item.title}
                    </Link>
                </div>
            ))}
        </nav>
    )
}
