import Link from "next/link";
import { NavItems } from "./nav-items";
import Menu from "./Menu";
import Logo from "@/components/layout/LogoHeader";
import MobileMenu from "./mobile-menu";
import { MenuItems } from "./nav-items";
import { manrope } from "@/fonts/fonts"

const headerClass = `flex items-center justify-center sticky bg-background top-0 z-50 transition-all
duration-300 ease-in-out px-[8px] py-[4px] md:h-[80px] md:py-0 xl:px-[48px]`

const Header = () => {
    return (
        <header className={headerClass}>
            <h1 className="sr-only">Ovkay</h1>
            <nav className="flex h-full w-full max-w-full items-center justify-between md:w-[1440px]">
                <h2 className="sr-only">Main Navigation Menu</h2>
                <div className="flex h-full w-full items-center justify-between">
                    <div className="md:hidden">
                        <MobileMenu items={NavItems.items} />
                    </div>
                    <Link
                        href="/"
                        title="Home"
                        className="flex h-full items-center justify-center border-none"
                    >
                        <Logo size="sm" />
                    </Link>
                    <Menu items={NavItems.items} />
                    <div className="flex h-full items-center justify-end md:w-[115px] xl:[150px]">
                        <button className="bg-white text-black text-center font-semibold px-4 py-2 h-[47px] rounded-lg shadow-md hover:bg-accent transition">
                            Call Us
                        </button>
                    </div>
                </div>
            </nav>
        </header >
    );
};

export default Header;

