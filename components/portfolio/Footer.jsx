"use client";
import { useLocale } from "next-intl";
import Link from "next/link";

export function Footer() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";

  return (
    <footer
      className="py-8 border-t"
      style={{ background: "#0A0F1E", borderColor: "rgba(148,163,184,0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              م
            </span>
            <span className="text-slate-400 text-sm">مهدی احمدی</span>
          </div>
          <p className="text-slate-600 text-xs">
            {isRtl ? "© ۱۴۰۴ مهدی احمدی. تمام حقوق محفوظ است." : "© 2025 Mahdi Ahmadi. All rights reserved."}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/ahmadi98ir" target="_blank" rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-300 transition-colors text-xs">
              GitHub
            </a>
            <Link href={locale === "fa" ? "/en" : "/fa"}
              className="text-slate-600 hover:text-slate-300 transition-colors text-xs">
              {locale === "fa" ? "English" : "فارسی"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
