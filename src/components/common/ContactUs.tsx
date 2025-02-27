"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PhoneCall } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// Custom WhatsApp icon component using the provided SVG with WhatsApp green color
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#25D366" // WhatsApp official green color
        className={className || ""}
        viewBox="0 0 16 16"
    >
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
)

interface AnimatedContactDropdownProps {
    phoneNumber: string;
    whatsappNumber: string;
    intervalTime?: number;
}

const ContactUs: React.FC<AnimatedContactDropdownProps> = ({
    phoneNumber,
    whatsappNumber,
    intervalTime = 3000
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [showingFirst, setShowingFirst] = useState<boolean>(true)

    // Function to format phone number in Indian style
    const formatIndianPhoneNumber = (number: string): string => {
        // Clean up the number and ensure it has the country code
        let cleaned = number.replace(/\D/g, "");

        // If it doesn't start with 91 (India code), add it for display
        if (!cleaned.startsWith("91") && cleaned.length === 10) {
            cleaned = "91" + cleaned;
        }

        // If the number includes the country code (91), format as +91 XXXXX XXXXX
        if (cleaned.startsWith("91") && cleaned.length >= 12) {
            return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 7)} ${cleaned.substring(7)}`;
        }
        // Format 10-digit number as +91 XXXXX XXXXX
        else if (cleaned.length === 10) {
            return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
        }
        // If it already has +91 or other format, just return as is with nice spacing
        else if (cleaned.length === 12 && cleaned.startsWith("91")) {
            return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 7)} ${cleaned.substring(7)}`;
        }
        // Fallback for any other format
        else {
            return number;
        }
    }

    // Function to open WhatsApp chat
    const openWhatsAppChat = (): void => {
        // Extract just the digits for the WhatsApp API
        const digits = whatsappNumber.replace(/\D/g, "");
        window.open(`https://wa.me/${digits}`, '_blank');
    }

    // Toggle between showing phone numbers every intervalTime milliseconds
    useEffect(() => {
        if (!isOpen) {
            const interval = setInterval(() => {
                setShowingFirst(prev => !prev)
            }, intervalTime)

            return () => clearInterval(interval)
        }
    }, [isOpen, intervalTime])

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button className="relative h-[40px] hidden md:flex w-[200px] overflow-hidden bg-white hover:bg-accent rounded-full">
                    <AnimatePresence mode="wait">
                        {showingFirst ? (
                            <motion.div
                                key="phone"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center space-x-2"
                            >
                                <PhoneCall className="h-4 w-4 text-black" />
                                <span className="text-[16px] text-secondary font-mallory font-black">{formatIndianPhoneNumber(phoneNumber)}</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="whatsapp"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center space-x-2"
                            >
                                <WhatsAppIcon className="h-4 w-4" />
                                <span className="text-[16px] text-secondary font-mallory font-black">{formatIndianPhoneNumber(whatsappNumber)}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => window.location.href = `tel:${phoneNumber}`}
                >
                    <PhoneCall className="h-4 w-4" />
                    <span>Call Us</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={openWhatsAppChat}
                >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>WhatsApp</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ContactUs
