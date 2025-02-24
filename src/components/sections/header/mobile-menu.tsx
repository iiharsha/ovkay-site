'use client'

import { mallory } from "@/assets/fonts";
import { Dialog, Transition } from "@headlessui/react"
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Fragment } from "react";

interface MenuProps {
    items: { title: string; path: string }[];
}

export default function MobileMenu({ items }: MenuProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const closeMobileMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname, searchParams]);

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="relative z-40 p-2 focus:outline-none">
                {isOpen ? (
                    // Close Icon (X)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="dark" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    // Menu Icon (Hamburger)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="white" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 17h16" />
                    </svg>
                )}
            </button>

            <Transition show={isOpen}>
                <Dialog onClose={closeMobileMenu} className="relative z-50">
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="opacity-0 backdrop-blur-none"
                        enterTo="opacity-100 backdrop-blur-[.5px]"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="opacity-100 backdrop-blur-[.5px]"
                        leaveTo="opacity-0 backdrop-blur-none"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-all ease-in-out duration-300"
                        enterFrom="translate-x-[-100%]"
                        enterTo="translate-x-0"
                        leave="transition-all ease-in-out duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-[-100%]"
                    >
                        <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white/30 pb-6 backdrop-blur-md ">
                            <div className="px-4 pb-4 pt-2">
                                <div className="mb-4 text-darkPurple">
                                    {/* Close Button */}
                                    <button onClick={closeMobileMenu} className="p-2 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <ul className="flex w-full flex-col">
                                    {items.map((item) => (
                                        <li
                                            className="py-2 text-xl font-semibold text-black transition-colors"
                                            key={item.path}
                                        >
                                            <Link
                                                onClick={closeMobileMenu}
                                                href={item.path}
                                                className={`${mallory.variable} font-mallory font-black`}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
}

