import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface BookingSectionCardProps {
    path: string;
    altText: string;
    heading: string;
}

export default function BookingSectionCard({
    path = "",
    altText = "",
    heading = "",
}: BookingSectionCardProps) {
    return (
        <div className="relative flex w-[390px] h-[60px] bg-white rounded-xl shadow-lg overflow-hidden font-mallory p-4">
            <CheckCircle className="p-1 absolute top-4 right-2 text-green-500" size={25} />
            <div className="bg-white dark:text-white px-2 h-[40px] flex items-center relative">
                <Image
                    src={path}
                    alt={altText}
                    width={40}
                    height={40}
                    className="mb-2"
                />
            </div>
            <div className="text-secondary flex flex-col justify-center">
                <h3 className="font-bold uppercase text-[16px] leading-none">
                    {heading}
                </h3>
            </div>
        </div>
    );
}

