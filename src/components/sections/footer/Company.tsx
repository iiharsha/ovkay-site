import company from "@/data/company.json"
import Link from "next/link"

export default function Company() {
    return (
        <nav className="grid grid-cols-1 gap-2">
            {company.map((item, i) => (
                <div key={i}>
                    <Link
                        href={item.url}
                        className="mb-3 text-[16px] font-semibold text-gray-300
                        hover:text-gray-200 transition-colors block hover:underline"
                    >
                        {item.title}
                    </Link>
                </div>
            ))}
        </nav>
    )
}
