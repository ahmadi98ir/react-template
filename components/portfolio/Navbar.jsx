"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";

const NAV_LINKS = [
  { label: "خانه", labelEn: "Home", href: "#home" },
  { label: "درباره من", labelEn: "About", href: "#about" },
  { label: "پروژه‌ها", labelEn: "Projects", href: "#projects" },
  { label: "تماس", labelEn: "Contact", href: "#contact" },
];

export function Navbar() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getLinkLabel = (link) => isRtl ? link.label : link.labelEn;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card border-b border-white/10 shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-indigo-500 transition-colors">
              م
            </span>
            <span className="font-bold text-white text-lg hidden sm:block">مهدی احمدی</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
              >
                {getLinkLabel(link)}
              </a>
            ))}
          </div>

          {/* CTA + Language */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={locale === "fa" ? "/en" : "/fa"}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
            >
              {locale === "fa" ? "EN" : "فا"}
            </Link>
            <a
              href="#contact"
              className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl glow-btn transition-all duration-300"
            >
              {isRtl ? "تماس" : "Contact"}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 glass-card rounded-none"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {getLinkLabel(link)}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex gap-2">
                <Link
                  href={locale === "fa" ? "/en" : "/fa"}
                  className="flex-1 text-center py-2 text-xs text-slate-400 border border-white/10 rounded-lg"
                >
                  {locale === "fa" ? "English" : "فارسی"}
                </Link>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl"
                >
                  {isRtl ? "تماس" : "Contact"}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
