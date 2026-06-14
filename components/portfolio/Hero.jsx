"use client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Button } from "./ui/Button";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

const STATS = [
  { value: "۱۳+", label: "سال تجربه" },
  { value: "۲۲+", label: "پروژه تحویل‌داده‌شده" },
  { value: "۱۰۰٪", label: "رضایت مشتریان" },
];

const STATS_EN = [
  { value: "13+", label: "Years Experience" },
  { value: "22+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
];

export function Hero() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const stats = isRtl ? STATS : STATS_EN;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0F172A" }}
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div
          className="blob absolute -top-40 -start-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="blob-2 absolute top-1/3 -end-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="blob-3 absolute -bottom-40 start-1/3 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-semibold tracking-widest uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            {isRtl ? "در دسترس برای پروژه‌های جدید" : "Available for new projects"}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1 {...fadeUp(0.15)} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
          <span className="text-white">
            {isRtl ? "مهدی " : "Mahdi "}
          </span>
          <span className="gradient-text">
            {isRtl ? "احمدی" : "Ahmadi"}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.3)} className="text-lg sm:text-xl md:text-2xl text-slate-400 font-medium mb-6 max-w-3xl mx-auto leading-relaxed">
          {isRtl
            ? "توسعه‌دهنده فول‌استک · مدیر سیستم · متخصص هوش مصنوعی"
            : "Full-Stack Developer · Systems Administrator · AI Specialist"}
        </motion.p>

        {/* Description */}
        <motion.p {...fadeUp(0.42)} className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          {isRtl
            ? "در تلاقی معماری سرور Ubuntu، برنامه‌نویسی Next.js/PostgreSQL و یکپارچه‌سازی LLM — راهکارهای سازمانی می‌سازم که کار می‌کنند."
            : "At the intersection of Ubuntu server architecture, Next.js/PostgreSQL development, and LLM integration — building enterprise solutions that actually work."}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.55)} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Button href="#projects" variant="primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0l-4-4m4 4l-4 4" />
            </svg>
            {isRtl ? "مشاهده پروژه‌ها" : "View Projects"}
          </Button>
          <Button href="#contact" variant="outline">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {isRtl ? "تماس با من" : "Contact Me"}
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-black shimmer-text mb-1">{s.value}</div>
              <div className="text-xs text-slate-500 leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2.5 bg-indigo-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
