import Image from "next/image"
import Link from "next/link"
import socialMediaItems from "@/data/social-media.json"

const SocialMedia = () => {
    return (
        <div>
            <div className="flex space-x-4">
                {socialMediaItems.map((item, i) => (
                    <Link
                        href={item.url}
                        key={i}
                        target="_blank"
                        title={item.title}
                        className="hover:text-gray-600 transition-colors"
                    >
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} width={24} height={24} priority />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SocialMedia

