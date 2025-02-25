import Image from "next/image";

interface ServicesCardProps {
    path: string;
    altText: string;
    heading: string;
    description: string;
}

export default function ServiceCard({
    path = "",
    altText = "",
    heading = "",
    description = "",
}: ServicesCardProps) {
    return (
        <div className="bg-white rounded-lg drop-shadow-xl overflow-hidden font-mallory h-[475px]">
            <div className="flex items-center justify-center px-2 relative h-[180px] bg-[#EFEEF1] m-4 rounded-lg">
                <Image
                    src={path}
                    alt={altText}
                    width={80}
                    height={80}
                />
            </div>
            <div className="p-4 text-secondary">
                <h3 className="font-black uppercase text-[24px] text-wrap leading-none mb-[12px]">{heading}</h3>
                <p className="font-medium text-secondary/85 tracking-tighter text-pretty">{description}</p>
            </div>
        </div>
    )
}
