import company from "@/data/company.json"
import Link from "next/link"

export default function Company() {
    return (
        <nav className="font-mallory grid grid-cols-1 gap-2">
            {company.map((item, i) => (
                <div key={i}>
                    <Link
                        href={item.url}
                        className="mb-2 text-[20px] font-medium text-gray-300
                        hover:text-accent transition-colors block"
                    >
                        {item.title}
                    </Link>
                </div>
            ))}
        </nav>
    )
}
