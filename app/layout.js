import { DM_Sans } from "next/font/google";
import localFont from 'next/font/local';
import Script from 'next/script';
import { cookies } from 'next/headers';
import Preloader from "@/layout/Preloader";
import "@css/animate.min.css";
import "@css/bootstrap.min.css";
import "@css/flaticon.min.css";
import "@css/fontawesome-5.14.0.min.css";
import "@css/nice-select.min.css";
import "@css/slick.min.css";
import "@css/style.css";
import "./globals.css";

const yekan = localFont({
  variable: "--font-inter",
  src: [
    {
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
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-dm_sans",
  display: "swap",
});

export const metadata = {
  title: {
    template: "مهدی احمدی - وب سایت شخصی || %s",
    default: "مهدی احمدی - وب سایت شخصی",
  },
  description: "وب‌سایت شخصی مهدی احمدی؛ توسعه‌دهنده سیستم‌های بانکی، فناوری اطلاعات، زیرساخت شبکه و پیاده‌سازی راهکارهای هوش مصنوعی.",
};

const RTL_LOCALES = ['fa', 'ar'];

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'fa';
  const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${yekan.variable} ${dm_sans.variable} scroll-smooth`}
    >
      <body>
        {process.env.GTAG_ID ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_ID}`}
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GTAG_ID}');
              `}
            </Script>
          </>
        ) : null}
        <Preloader />
        {children}
      </body>
    </html>
  );
}
