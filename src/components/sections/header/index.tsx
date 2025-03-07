import Link from "next/link"
import { NavItems } from "./nav-items"
import Menu from "./Menu"
import Logo from "@/components/layout/LogoHeader"
import MobileMenu from "./mobile-menu"
import GetFreeQuote from "@/components/common/GetFreeQuote"
import ContactUs from "@/components/common/ContactUs"

const headerClass = `flex items-center justify-between sticky bg-[#0e3a6c] top-0 z-50 transition-all
duration-300 ease-in-out px-4 py-2 md:h-[90px] h-[60px] md:py-0`

const Header = () => {
    return (
        <header className={headerClass}>
            <h1 className="sr-only">Ovkay</h1>
            <nav className="flex h-full w-full max-w-full items-center justify-between md:w-[1440px]">
                <h2 className="sr-only">Main Navigation Menu</h2>
                <div className="flex items-center ml-2">
                    <Link href="/" title="Home" className="flex h-full items-center justify-center border-none">
                        <Logo size="sm" variant="white" />
                    </Link>
                </div>
                <div className="hidden lg:flex items-center justify-center flex-grow">
                    <Menu items={NavItems.items} />
                </div>
            </nav>
            <div className="flex items-center space-x-2 mr-2">
                <div>
                    <ContactUs phoneNumber="080 47103622" whatsappNumber="7396876448" className="hidden" />
                </div>
                <div>
                    <GetFreeQuote text="GET FREE QUOTE" className="md:block lg:block h-[40px] w-[220px]" />
                </div>
                <div className="lg:hidden rounded-full border-[1px] border-white/50 h-[38px] flex items-center justify-center">
                    <MobileMenu items={NavItems.items} />
                </div>
            </div>
        </header>
    )
}

export default Header
