// components/ZohoWebForm.tsx
'use client';

import { useEffect } from 'react';

const ZohoWebForm: React.FC = () => {
    useEffect(() => {
        // Define the window event listener function
        const handleMessage = (evt: MessageEvent) => {
            if (evt.origin === 'https://crm.zoho.com' || evt.origin === 'https://crm.zohopublic.com') {
                const loc_obj = JSON.stringify({
                    origin: window.location.origin,
                    pathname: window.location.pathname,
                    search: window.location.search,
                    hash: window.location.hash,
                });
                // Use WindowPostMessageOptions with targetOrigin
                evt.source?.postMessage(
                    `prnt_wnd_pg_lc_rc_frm_prwindow_${loc_obj}`,
                    { targetOrigin: evt.origin }
                );
            }
        };

        // Add event listener
        window.addEventListener('message', handleMessage, false);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('message', handleMessage, false);
        };
    }, []);

    return (
        <div className="max-w-[610px] mx-auto">
            <iframe
                width="500"
                height="590"
                src="https://crm.zoho.com/crm/WebFormServeServlet?rid=5a13246c4cfe1c6e75b9703d2815cc5ddfe148a8141d606651b01a84b417b265f4d20c2facadb4f5d51b15bb76dbcb4cgid6c4668a00c05f23fe60be7acb8c3d3dd5b049609fff1c16c54f05062673087c2"
                className="border-0 flex items-center justify-center mx-auto"
                title="Zoho CRM Web Form"
            />
        </div>
    );
};

export default ZohoWebForm;
