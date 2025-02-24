import Image from "next/image";

export default function WhyCard({
    path = "",
    altText = "",
    heading = "",
    description = "",
}: {
    path: string;
    altText: string;
    heading: string;
    description: string;
}) {
    return (
        <div className="flex flex-col items-start justify-center w-[90vw] sm:max-w-[350px] max-h-[290px] border border-black">
            <Image
                src={path}
                alt={altText}
                width={80}
                height={80}
            />
            <div className="flex flex-col items-start justify-center">
                <h3 className="font-extrabold uppercase text-[24px] text-wrap leading-none">{heading}</h3>
                <p className="font-normal text-black tracking-tighter text-pretty">{description}</p>
            </div>
        </div>
    )
}
