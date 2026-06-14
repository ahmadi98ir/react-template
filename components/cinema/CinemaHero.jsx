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

  const { scrollY } = useScroll();
  // Parallax: portrait drifts up slower than scroll
  const imgY = useTransform(scrollY, [0, 600], [0, -100]);
  const imgScale = useTransform(scrollY, [0, 600], [1, 1.05]);

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
      {/* ── Structured ambient backdrop (no aggressive orbs) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,243,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 80%)",
          }}
        />
        {/* One soft directional wash — subtle, no blur-bomb */}
        <div className="absolute top-0 inset-x-0 h-[420px]"
          style={{ background: "radial-gradient(ellipse 70% 100% at 70% 0%, rgba(157,0,255,0.08), transparent 70%)" }}
        />
        {/* Deep base vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(2,6,23,0.6) 100%)" }}
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
            <h1 ref={titleRef} className="mb-5">
              {isRtl ? (
                <span className="flex flex-wrap items-baseline gap-x-4 justify-end">
                  <span className="hero-word text-5xl sm:text-6xl lg:text-7xl font-black text-[#f1f5f9] opacity-0 leading-[1.1]">
                    مهدی
                  </span>
                  <span className="hero-word text-5xl sm:text-6xl lg:text-7xl font-black opacity-0 leading-[1.1]" style={{ color: "#9d00ff" }}>
                    احمدی
                  </span>
                </span>
              ) : (
                <span className="flex flex-wrap items-baseline gap-x-4">
                  <span className="hero-word text-5xl sm:text-6xl lg:text-7xl font-black text-[#f1f5f9] opacity-0 leading-[1.1] en">
                    Mahdi
                  </span>
                  <span className="hero-word text-5xl sm:text-6xl lg:text-7xl font-black opacity-0 leading-[1.1] en" style={{ color: "#9d00ff" }}>
                    Ahmadi
                  </span>
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl font-bold text-[#cbd5e1] mb-6">
              {isRtl ? "توسعه‌دهنده فول‌استک و مدیر سیستم" : "Full-Stack Developer & Systems Administrator"}
            </p>

            {/* Description */}
            <p ref={subtitleRef} className="opacity-0 text-slate-400 text-sm sm:text-base leading-loose mb-8 max-w-xl">
              {isRtl
                ? "مهندس توسعه‌دهنده فول‌استک و مدیر سیستم با تخصص در معماری اوبونتو ۲۴ و یکپارچه‌سازی مدل‌های زبانی (LLMs) در Next.js/PostgreSQL. تبدیل چالش‌های سازمانی به راهکارهای دیجیتال کارآمد."
                : "Full-stack engineer and systems administrator specializing in Ubuntu 24 architecture and LLM integration across Next.js/PostgreSQL. Turning enterprise challenges into efficient digital solutions."
              }
            </p>

            {/* Stack tags */}
            <div className={`mb-9 flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
              {["Next.js 16", "PostgreSQL 18", "Ubuntu 24", "LLM"].map((tech, i) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(0,243,255,0.18)" : "rgba(157,0,255,0.18)"}`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className={`flex flex-wrap gap-4 ${isRtl ? "justify-end" : ""}`}>
              {/* Primary: solid cyan, BLACK text, glow only on hover */}
              <a href="#projects" className="cta-item btn-cinema-primary opacity-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-extrabold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
                {isRtl ? "مشاهده پروژه‌ها" : "View Projects"}
              </a>
              {/* Secondary: outline only */}
              <a href="#contact" className="cta-item btn-cinema-outline opacity-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {isRtl ? "تماس با من" : "Contact"}
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

          {/* ── Right: Structured portrait frame ── */}
          <div className={`order-1 lg:order-2 flex justify-center ${isRtl ? "lg:justify-start" : "lg:justify-end"}`}>
            <motion.div
              style={{ y: imgY, scale: imgScale }}
              className="relative w-72 h-80 sm:w-80 sm:h-96 lg:w-[340px] lg:h-[420px]"
            >
              {/* Subtle outline glow — gradient border, NOT a solid orb */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(150deg, rgba(0,243,255,0.5), rgba(157,0,255,0.35) 50%, rgba(255,255,255,0.04) 100%)",
                  padding: "1px",
                  boxShadow: "0 0 40px rgba(0,243,255,0.08), 0 0 80px rgba(157,0,255,0.06)",
                }}
              >
                {/* Inner panel */}
                <div
                  className="w-full h-full rounded-3xl overflow-hidden relative"
                  style={{ background: "linear-gradient(165deg, #0a1230 0%, #020617 70%)" }}
                >
                  {/* Corner accent ticks */}
                  <span className="absolute top-4 start-4 w-5 h-5 border-t border-s rounded-tl" style={{ borderColor: "rgba(0,243,255,0.4)" }} />
                  <span className="absolute bottom-4 end-4 w-5 h-5 border-b border-e rounded-br" style={{ borderColor: "rgba(157,0,255,0.4)" }} />

                  {/* Monogram placeholder (swap for portrait <Image/> later) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-6xl sm:text-7xl font-black text-cinema-gradient en leading-none">MA</div>
                    <div className="mt-2 text-[10px] text-slate-500 tracking-[0.35em] uppercase en">Portfolio</div>
                  </div>

                  {/* Soft top sheen */}
                  <div className="absolute top-0 inset-x-0 h-24" style={{ background: "linear-gradient(180deg, rgba(0,243,255,0.06), transparent)" }} />
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -bottom-5 ${isRtl ? "-start-6" : "-end-6"} glass-sm px-4 py-2.5`}
                style={{ borderColor: "rgba(0,243,255,0.2)" }}
              >
                <div className="text-[11px] text-slate-400">{isRtl ? "پروژه‌ها" : "Projects"}</div>
                <div className="text-lg font-black text-[#00f3ff] en leading-tight">22+</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className={`absolute -top-5 ${isRtl ? "-end-6" : "-start-6"} glass-sm px-4 py-2.5`}
                style={{ borderColor: "rgba(157,0,255,0.2)" }}
              >
                <div className="text-[11px] text-slate-400">{isRtl ? "تجربه" : "Experience"}</div>
                <div className="text-lg font-black text-[#9d00ff] en leading-tight">13Y</div>
              </motion.div>
            </motion.div>
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
