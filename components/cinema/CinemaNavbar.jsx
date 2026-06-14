"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = {
  fa: [
    { href: "#home", label: "خانه" },
    { href: "#about", label: "درباره" },
    { href: "#projects", label: "پروژه‌ها" },
    { href: "#skills", label: "مهارت‌ها" },
    { href: "#contact", label: "تماس" },
  ],
  en: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ],
};

export function CinemaNavbar() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "projects", "skills", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const links = isRtl ? NAV_LINKS.fa : NAV_LINKS.en;

  const switchLocale = useCallback((l) => {
    document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;SameSite=Lax`;
    window.location.href = `/${l}`;
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(28px) saturate(180%)" : "blur(8px)",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(180%)" : "blur(8px)",
          background: scrolled
            ? "rgba(2, 6, 23, 0.85)"
            : "rgba(2, 6, 23, 0.4)",
          borderBottom: scrolled
            ? "1px solid rgba(0, 243, 255, 0.08)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 40px rgba(0, 243, 255, 0.04)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-14" : "h-20"
            }`}
          >
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-[#020617] bg-[#00f3ff] group-hover:scale-110 transition-transform en">
                MA
              </span>
              <span className="text-sm font-semibold text-slate-300 group-hover:text-[#00f3ff] transition-colors">
                {isRtl ? "مهدی احمدی" : "Mahdi Ahmadi"}
              </span>
            </a>

            {/* Desktop links */}
            <div className={`hidden md:flex items-center gap-1 ${isRtl ? "flex-row-reverse" : ""}`}>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active === link.href
                      ? "text-[#00f3ff]"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(0,243,255,0.08)", border: "1px solid rgba(0,243,255,0.15)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Right cluster */}
            <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
              {/* Language toggle */}
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg glass-sm text-xs">
                {["fa", "en"].map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    className={`px-2 py-0.5 rounded transition-all en ${
                      locale === l
                        ? "bg-[#00f3ff]/10 text-[#00f3ff]"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-[#020617] bg-[#00f3ff] glow-cyan hover:scale-105 transition-transform"
              >
                {isRtl ? "تماس" : "Hire Me"}
              </a>

              {/* Mobile burger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg glass-sm"
                aria-label="menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-slate-300 origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="block w-5 h-px bg-slate-300"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-slate-300 origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 inset-x-0 z-40 md:hidden"
            style={{
              background: "rgba(2,6,23,0.97)",
              backdropFilter: "blur(28px)",
              borderBottom: "1px solid rgba(0,243,255,0.08)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    active === link.href
                      ? "text-[#00f3ff] bg-[#00f3ff]/08"
                      : "text-slate-400"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 pt-2 border-t border-white/5 flex gap-2">
                {["fa", "en"].map((l) => (
                  <button
                    key={l}
                    onClick={() => { setMobileOpen(false); switchLocale(l); }}
                    className={`flex-1 text-center py-2 rounded-lg text-xs en transition-colors ${
                      locale === l
                        ? "bg-[#00f3ff]/10 text-[#00f3ff]"
                        : "text-slate-500"
                    }`}
                  >
                    {l === "fa" ? "فارسی" : "English"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
