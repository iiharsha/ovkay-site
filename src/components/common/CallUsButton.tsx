export default function CallUsButton({
    phoneNumber = "+91 9949489384",
    text = "Call Us Now",
    textSize = "text-[16px]",
    className = "",
}: {
    phoneNumber?: string;
    text?: string;
    textSize?: string;
    className?: string;
}) {
    return (
        <button className={` ${className} bg-white text-accent hover:bg-accent hover:text-white font-black transition-colors duration-300 w-[160px] h-[40px] text-black rounded-full flex items-center justify-center gap-2 p-2`}>
            <svg
                width="20"
                height="20"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M16 20c4 12 12 20 24 24l6-6c1-1 3-1 4 0l8 4c1 1 2 2 1 4-3 6-8 10-16 10C20 56 8 36 8 20c0-8 4-13 10-16 2-1 3 0 4 1l4 8c1 1 1 3 0 4l-6 6Z" />
                <path d="M40 8c6 2 10 6 12 12" />
                <path d="M44 4c8 2 14 8 16 16" />
            </svg>
            <a href={`tel:${phoneNumber}`} className={`${textSize} text-center`}>
                {text}
            </a>
        </button>
    );
}

