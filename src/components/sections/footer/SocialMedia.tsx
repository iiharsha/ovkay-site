import React from 'react';

const socialLinks = [
    {
        name: 'X',
        url: 'https://x.com/ovkayofficial',
        icon: (
            <path d="M13.3 10.533 19.5 2h-2.8l-4.7 6.517L7.3 2H2l7 10.91L2.5 22h2.8l5-7.07L14.7 22H20l-7-11.467Zm-2.3 2.95L9.5 11.464 4.7 3.627h2.1l4 6.317 1.3 2.02 5.3 8.409h-2.1l-4.5-6.89Z" />
        ),
        size: "w-4 h-4" // Reduced size
    },
    {
        name: 'YouTube',
        url: 'https://www.youtube.com/@Ovkay/videos',
        icon: (
            <path fillRule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clipRule="evenodd" />
        )
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/ovkayofficial/',
        icon: (
            <>
                <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
                <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
            </>
        )
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/p/Ovkay-100083193429391/',
        icon: (
            <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
        )
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/ovkay_shipping/',
        icon: (
            <path fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd" />
        )
    }
];

const SocialMedia = () => {
    return (
        <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-accent p-2 border border-gray-400 rounded-full text-white dark:text-white dark:hover:text-white transition-colors"
                    aria-label={`Visit our ${social.name} page`}
                >
                    <svg
                        className={`w-5 h-5 ${social.size || ""}`} // Apply size override for X
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {social.icon}
                    </svg>
                </a>
            ))}
        </div>
    );
};

export default SocialMedia;

