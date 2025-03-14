import Logo from "@/components/layout/LogoHeader";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import CopyRight from "./CopyRights";
import Company from "./Company";
import Resources from "./Resources";
import MainOffice from "./MainOffice";

export default function Footer() {
    return (
        <footer className="font-mallory bg-secondary py-12 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex justify-center">
                    <Link href="/" className="inline-block">
                        <Logo size="sm" variant="white" />
                    </Link>
                </div>
                {/*nav section*/}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 text-center md:text-left">
                    <div>
                        <h3 className="uppercase font-mallory text-[16px] font-bold text-gray-500 mb-4">Company</h3>
                        <Company />
                    </div>
                    <div>
                        <h3 className="uppercase font-mallory text-[16px] font-bold text-gray-500 mb-4">Resources</h3>
                        <Resources />
                    </div>
                    {/*social media section*/}
                    <div className="flex items-center justify-center">
                        <div className="flex-col items-center justify-center">
                            <h3 className="uppercase text-[16px] font-bold text-gray-500 mb-[6px]">Main Office</h3>
                            <MainOffice />
                            <h3 className="uppercase text-[16px] font-bold text-gray-500 mb-[4px]">Follow Us</h3>
                            <SocialMedia />
                        </div>
                    </div>
                </div>
            </div>
            {/*Legal Section*/}
            <div className="mt-12 pt-8 border-t border-primary">
                <div className="flex md:space-x-4 gap-2 justify-center">
                    <Link
                        href="/terms"
                        className="underline text-gray-500 hover:text-gray-200 transition-colors mb-2 md:mb-0"
                    >
                        {`Terms`}
                    </Link>
                    <div className="mx-4 mt-3 w-1 h-1 bg-gray-500 rounded-full"></div>
                    <Link
                        href="/privacy"
                        className="underline text-gray-500 hover:text-gray-200 transition-colors mb-2 md:mb-0"
                    >
                        {`Privacy`}
                    </Link>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-6 pt-8 border-t border-primary md:flex-row">
                    <CopyRight />
                </div>
            </div>
        </footer>
    )
}
