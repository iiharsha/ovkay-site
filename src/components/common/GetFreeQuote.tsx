import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import ZohoWebForm from '../ZohoWebForm'

export default function GetFreeQuote({
    text = "Get Free Quote",
    className = "",
}: {
    text?: string
    className?: string
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={`${className} font-black bg-[#052952] shadow-xl text-white hover:text-secondary hover:bg-white transition-colors duration-300 w-[170px] h-[40px] rounded-full flex items-center justify-center gap-2 text-nowrap p-2 tracking-[0.01em] font-mallory`}
                >
                    {text}
                </button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-start justify-start min-w-[50vw] bg-[#efeef1] overflow-x-auto overflow-y-auto max-h-[90vh] p-6 border-none shadow-lg rounded-lg">
                <DialogHeader className="text-center mb-4 w-full">
                    <DialogTitle className="text-[28px] sm:text-[40px] font-black uppercase text-black font-mallory">Get a Free Quote</DialogTitle>
                    <DialogDescription className="text-lg text-gray-600 mt-2 font-mallory">
                        Fill out the form below and we will get back to you with a customized quote.
                    </DialogDescription>
                </DialogHeader>
                <ZohoWebForm />
            </DialogContent>
        </Dialog>
    )
}


