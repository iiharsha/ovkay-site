import Image from "next/image";

interface ServicesCardProps {
    estimateText: string;
    path: string;
    altText: string;
    heading: string;
    description: string;
}

export default function ServiceCard({
    estimateText = "",
    path = "",
    altText = "",
    heading = "",
    description = "",
}: ServicesCardProps) {
    return (
        <div className="bg-white rounded-lg drop-shadow-xl overflow-hidden font-mallory h-[475px]">
            {/* Image Container */}
            <div className="relative flex items-center justify-center h-[180px] bg-[#EFEEF1] m-4 rounded-lg overflow-hidden">
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-secondary dark:bg-opacity-30 bg-opacity-30"></div>

                <span className="absolute top-2 left-2 bg-[#166bac]/80 text-white text-sm px-2 py-1 rounded-md z-10">
                    {estimateText}
                </span>

                <Image
                    src={path}
                    alt={altText}
                    width={1024}
                    height={683}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text Content */}
            <div className="p-4 text-secondary">
                <h3 className="font-bold uppercase text-[24px] text-wrap leading-none mb-[12px]">
                    {heading}
                </h3>
                <p className="overflow-y-auto max-h-[150px] break-words font-medium text-secondary/85 tracking-tighter text-pretty">
                    {description}
                </p>
            </div>
        </div>
    );
}

