"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ROLES = {
  fa: ["توسعه‌دهنده فول‌استک", "مدیر سیستم", "متخصص هوش مصنوعی"],
  en: ["Full-Stack Developer", "Systems Administrator", "AI Specialist"],
};

export function CinemaHero() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);
  const imgContainerRef = useRef(null);

  const { scrollY } = useScroll();
  // Parallax: image moves up slower than scroll
  const imgY = useTransform(scrollY, [0, 600], [0, -120]);
  const imgScale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0, 0.7]);

  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      // Staggered blur-in for title chars
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }
      )
      .fromTo(
        titleRef.current.querySelectorAll(".hero-word"),
        { opacity: 0, y: 60, filter: "blur(16px)", skewY: 4 },
        {
          opacity: 1, y: 0, filter: "blur(0px)", skewY: 0,
          stagger: 0.12, duration: 0.9, ease: "expo.out",
        },
        "-=0.3"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current?.querySelectorAll(".cta-item") ?? [],
        { opacity: 0, y: 20, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const roles = isRtl ? ROLES.fa : ROLES.en;

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden cinema-scanline"
      style={{ background: "#020617" }}
    >
      {/* ── Ambient light blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="drift-1 absolute -top-48 -start-48 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #9d00ff 0%, transparent 65%)", filter: "blur(100px)" }}
        />
        <div className="drift-2 absolute top-1/3 -end-32 w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #00f3ff 0%, transparent 65%)", filter: "blur(80px)" }}
        />
        <div className="drift-3 absolute -bottom-32 start-1/3 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #9d00ff 0%, transparent 65%)", filter: "blur(90px)" }}
        />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,243,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, #020617 100%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div className={isRtl ? "order-2 lg:order-1 text-right" : "order-2 lg:order-1"}>
            {/* Badge */}
            <div ref={badgeRef} className="opacity-0 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase rounded-full glass border border-cyan-500/20 text-[#00f3ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse" />
                <span className="en">{isRtl ? "در دسترس برای همکاری" : "Available for collaboration"}</span>
              </span>
            </div>

            {/* Title with word-by-word stagger */}
            <h1 ref={titleRef} className="mb-6">
              {isRtl ? (
                <>
                  <div className="overflow-hidden mb-1">
                    <span className="hero-word block text-5xl sm:text-6xl lg:text-7xl font-black text-[#e2e8f0] opacity-0 leading-none">
                      مهدی
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="hero-word block text-5xl sm:text-6xl lg:text-7xl font-black text-cinema-gradient opacity-0 leading-none">
                      احمدی
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="overflow-hidden mb-1">
                    <span className="hero-word block text-5xl sm:text-6xl lg:text-7xl font-black text-[#e2e8f0] opacity-0 leading-none en">
                      Mahdi
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="hero-word block text-5xl sm:text-6xl lg:text-7xl font-black text-cinema-gradient opacity-0 leading-none en">
                      Ahmadi
                    </span>
                  </div>
                </>
              )}
            </h1>

            {/* Animated role pills */}
            <div ref={subtitleRef} className="opacity-0 mb-8 flex flex-wrap gap-2">
              {roles.map((role, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm rounded-lg glass-sm text-slate-300"
                  style={{
                    borderColor: i % 2 === 0 ? "rgba(0,243,255,0.15)" : "rgba(157,0,255,0.15)",
                  }}
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
              {isRtl
                ? "در تلاقی معماری سرور Ubuntu 24، توسعه Next.js/PostgreSQL و یکپارچه‌سازی مدل‌های زبانی — راهکارهای سازمانی می‌سازم که واقعاً کار می‌کنند."
                : "At the intersection of Ubuntu 24 server architecture, Next.js/PostgreSQL development and LLM integration — building enterprise solutions that actually work."
              }
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a href="#projects" className="cta-item opacity-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#020617] bg-[#00f3ff] glow-cyan transition-all hover:scale-105">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                </svg>
                {isRtl ? "مشاهده پروژه‌ها" : "View Projects"}
              </a>
              <a href="#contact" className="cta-item opacity-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#00f3ff] glass border border-[#00f3ff]/25 hover:border-[#00f3ff]/50 transition-all hover:scale-105">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {isRtl ? "تماس" : "Contact"}
              </a>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-16 pt-8 border-t border-white/5 grid grid-cols-3 gap-4"
            >
              {[
                { num: "13+", label: isRtl ? "سال تجربه" : "Yrs Experience" },
                { num: "22+", label: isRtl ? "پروژه" : "Projects" },
                { num: "100%", label: isRtl ? "رضایت" : "Satisfaction" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#00f3ff] en leading-none mb-1">{s.num}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Parallax Image ── */}
          <div className={`order-1 lg:order-2 flex justify-center ${isRtl ? "lg:justify-start" : "lg:justify-end"}`}>
            <div ref={imgContainerRef} className="relative">
              {/* Outer glow ring */}
              <motion.div
                style={{ y: imgY, scale: imgScale }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              >
                {/* Rotating gradient ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #00f3ff, #9d00ff, transparent, #00f3ff)",
                    padding: "2px",
                  }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: "#020617" }} />
                </motion.div>

                {/* Inner glow */}
                <div className="absolute inset-2 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(157,0,255,0.2) 0%, rgba(0,243,255,0.1) 50%, transparent 70%)",
                  }}
                />

                {/* Profile image placeholder — cinematic frame */}
                <div
                  className="absolute inset-3 rounded-full overflow-hidden glass"
                  style={{ border: "1px solid rgba(0,243,255,0.15)" }}
                >
                  {/* Try to load actual image, fallback to monogram */}
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{
                      background: "radial-gradient(circle at 40% 35%, rgba(157,0,255,0.3), rgba(0,243,255,0.1), rgba(2,6,23,0.8))",
                    }}
                  >
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl font-black text-cinema-gradient mb-1 en">MA</div>
                      <div className="text-xs text-slate-500 tracking-widest uppercase en">Portfolio</div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute -bottom-4 ${isRtl ? "-start-8" : "-end-8"} glass-sm px-4 py-2`}
                  style={{ borderColor: "rgba(0,243,255,0.2)" }}
                >
                  <div className="text-xs text-slate-400">{isRtl ? "پروژه‌ها" : "Projects"}</div>
                  <div className="text-lg font-black text-[#00f3ff] en">22+</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className={`absolute -top-4 ${isRtl ? "-end-8" : "-start-8"} glass-sm px-4 py-2`}
                  style={{ borderColor: "rgba(157,0,255,0.2)" }}
                >
                  <div className="text-xs text-slate-400">{isRtl ? "تجربه" : "Experience"}</div>
                  <div className="text-lg font-black text-[#9d00ff] en">13Y</div>
                </motion.div>
              </motion.div>

              {/* Dark scroll overlay as user scrolls */}
              <motion.div
                style={{ opacity: overlayOpacity, background: "#020617" }}
                className="absolute inset-0 rounded-full pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-600 tracking-[0.3em] uppercase en">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-2 rounded-full bg-[#00f3ff]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
