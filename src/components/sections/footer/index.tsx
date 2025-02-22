import Logo from "@/components/layout/LogoHeader";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import CopyRight from "./CopyRights";
import Company from "./Company";
import Resources from "./Resources";
import MainOffice from "./MainOffice";

export default function Footer() {
    return (
        <footer className="bg-[#0c0a0a] py-12 px-4 md:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex justify-center">
                    <Link href="/" className="inline-block">
                        <Logo size="sm" />
                    </Link>
                </div>
                {/*nav section*/}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-[18px] font-bold text-gray-500 mb-4">Company</h3>
                        <Company />
                    </div>
                    <div>
                        <h3 className="text-[18px] font-bold text-gray-500 mb-4">Company</h3>
                        <Resources />
                    </div>
                    {/*social media section*/}
                    <div>
                        <div className="flex-col items-center justify-center">
                            <h3 className="text-[18px] font-bold text-gray-500 mb-[4px]">Main Office</h3>
                            <MainOffice />
                            <h3 className="text-[18px] font-bold text-gray-500 mb-[4px]">Follow Us</h3>
                            <SocialMedia />
                        </div>
                    </div>
                </div>
            </div>
            {/*Legal Section*/}
            <div className="mt-12 pt-8 border-t border-gray-400">
                <div className="flex md:space-x-4 gap-2 justify-center">
                    <Link
                        href="/termsofservice"
                        className="underline text-gray-400 hover:text-gray-200 transition-colors mb-2 md:mb-0"
                    >
                        {`Terms`}
                    </Link>
                    <div className="mx-4 mt-3 w-1 h-1 bg-gray-400 rounded-full"></div>
                    <Link
                        href="/privacypolicy"
                        className="underline text-gray-400 hover:text-gray-200 transition-colors mb-2 md:mb-0"
                    >
                        {`Privacy Policy`}
                    </Link>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-6 pt-8 border-t border-gray-400 md:flex-row">
                    <CopyRight />
                </div>
            </div>
        </footer>
    )
}
