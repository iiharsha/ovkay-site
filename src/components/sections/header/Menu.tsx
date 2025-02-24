import Link from "next/link";
import { mallory } from "@/assets/fonts";

interface MenuProps {
    items: { title: string; path: string }[];
}

const Menu = ({ items }: MenuProps) => {
    return (
        <ul className={` ${mallory.variable} font-mallory font-bold text-[14px] uppercase hidden h-full mr-2 ml-2 gap-[16px] text-base md:flex md:items-center lg:gap-[24px] xl:gap-[48px]`}>
            {items.map((item) => (
                <li key={item.path}>
                    <Link href={item.path} className="text-white hover:text-accent transition colors">
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Menu;
