import Link from "next/link";
import { MenuItems } from "./nav-items"
import { manrope } from "@/fonts/fonts";

interface MenuProps {
    items: { title: string; path: string }[];
}

const Menu = ({ items }: MenuProps) => {
    return (
        <ul className={` ${manrope.variable} font-manrope font-semibold hidden h-full mr-2 ml-2 gap-[16px] text-base md:flex md:items-center lg:gap-[24px] lg:text-[18px] xl:gap-[48px]`}>
            {items.map((item) => (
                <li key={item.path}>
                    <Link href={item.path} className="text-white">
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Menu;
