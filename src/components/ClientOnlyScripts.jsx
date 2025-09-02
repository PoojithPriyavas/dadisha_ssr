import { useEffect } from "react";

const ClientOnlyScripts = () => {
    useEffect(() => {
        // Only run on client
        if (typeof window !== "undefined") {
            // Dynamically load browser-only JS files
            import("/js/disha.js");
            import("/js/main.js");
            import("/js/vendors.js");
            import("/js/vendors/interactive-portfolio.js");
            import("/js/vendors/jquery.magnific-popup.js");
            import("/js/vendors/swiper-bundle.js");
            // import("/src/pages/contactUs/ContactUs.jsx");
            // import("src/pages/home/SideComponent.jsx");
        }
    }, []);

    return null;
};

export default ClientOnlyScripts;
