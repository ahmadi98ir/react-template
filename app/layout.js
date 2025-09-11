import { DM_Sans, Inter } from "next/font/google";

import Preloader from "@/layout/Preloader";
import "@css/animate.min.css";
import "@css/bootstrap.min.css";
import "@css/flaticon.min.css";
import "@css/fontawesome-5.14.0.min.css";
import "@css/nice-select.min.css";
import "@css/slick.min.css";
import "@css/style.css";
import "./globals.css";
import localFont from 'next/font/local';


//font
const inter = localFont({
    variable: "--font-inter",
    src: [{
            path: './fonts/Yekan-Bakh-FaNum-04-Regular.woff',
            weight: '300',
            style: 'normal',
            display: 'swap',
        },
        {
            path: './fonts/Yekan-Bakh-FaNum-04-Regular.woff',
            weight: '400',
            style: 'normal',
            display: 'swap'
        },
        {
            path: './fonts/Yekan-Bakh-FaNum-05-Medium.woff',
            weight: '600',
            style: 'normal',
            display: 'swap'
        },
        {
            path: './fonts/Yekan-Bakh-FaNum-06-Bold.woff',
            weight: '700',
            style: 'normal',
            display: 'swap'
        }
    ],
})




/** google fonts */
/* const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-inter",
  display: "swap",
}); */

const dm_sans = DM_Sans({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--font-dm_sans",
    display: "swap",
});

/** Font family */
const fontFamily = `${inter.variable}`;

export const metadata = {
    title: {
        template: "مهدی احمدی -  وب سایت شخصی  || %s",
        default: "مهدی احمدی -  وب سایت شخصی  || صفحه اصلی", // a default is required when creating a template
    },
    description: "وب‌سایت شخصی مهدی احمدی؛ توسعه‌دهنده سیستم‌های بانکی، فناوری اطلاعات، زیرساخت شبکه و پیاده‌سازی راهکارهای هوش مصنوعی.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl" className={`${fontFamily} scroll-smooth`}>
            <body>
                <Preloader />
                {children}
            </body>
        </html>
    );
}
