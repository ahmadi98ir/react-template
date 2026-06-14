"use client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

function switchLocale(l) {
  document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;SameSite=Lax`;
  window.location.href = `/${l}`;
}

export function CinemaFooter() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-10 overflow-hidden"
      style={{
        background: "#020617",
        borderTop: "1px solid rgba(0,243,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
          {/* Logo / name */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black text-[#020617] bg-[#00f3ff] group-hover:scale-110 transition-transform en">
              MA
            </span>
            <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">
              {isRtl ? "مهدی احمدی" : "Mahdi Ahmadi"}
            </span>
          </a>

          {/* Center: copyright */}
          <p className="text-xs text-slate-600 en">
            © {year} Mahdi Ahmadi. {isRtl ? "تمام حقوق محفوظ است." : "All rights reserved."}
          </p>

          {/* Language toggle */}
          <div className="flex items-center gap-1 text-xs">
            {["fa", "en"].map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`px-3 py-1.5 rounded-lg transition-colors en ${
                  locale === l
                    ? "text-[#00f3ff] bg-[#00f3ff]/08"
                    : "text-slate-600 hover:text-slate-400"
                }`}
              >
                {l === "fa" ? "فارسی" : "English"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
