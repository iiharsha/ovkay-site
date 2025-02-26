import Image from "next/image";

interface WhyCardProps {
    path: string;
    altText: string;
    heading: string;
    description: string;
}

export default function WhyCard({
    path = "",
    altText = "",
    heading = "",
    description = "",
}: WhyCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden font-mallory">
            <div className="px-2 relative h-[80px]">
                <Image
                    src={path}
                    alt={altText}
                    width={80}
                    height={80}
                />
            </div>
            <div className="p-4 text-secondary">
                <h3 className="font-bold uppercase text-[24px] text-wrap leading-none mb-[12px]">{heading}</h3>
                <p className="font-medium text-secondary/85 tracking-tighter text-pretty">{description}</p>
            </div>
        </div>
    )
}
