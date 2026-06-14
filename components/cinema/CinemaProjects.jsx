"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS_EN = [
  {
    id: "beewaz",
    index: "01",
    title: "BEEWAZ Platform",
    category: "E-commerce & CRM",
    description:
      "A full-scale e-commerce and CRM platform built on Next.js 16, Tailwind 4, and PostgreSQL. Features complex payment gateway integration, automated SMS workflows, multi-vendor support, and a real-time analytics dashboard for operations teams.",
    stack: ["Next.js 16", "PostgreSQL", "Tailwind 4", "SMS Gateway", "Payment API"],
    color: "#00f3ff",
    accent: "rgba(0,243,255,0.12)",
    stats: [
      { num: "50K+", label: "Monthly Orders" },
      { num: "99.9%", label: "Uptime" },
      { num: "<200ms", label: "Avg Response" },
    ],
  },
  {
    id: "ai-pipeline",
    index: "02",
    title: "AI Localization Pipeline",
    category: "AI / LLM Engineering",
    description:
      "A multi-stage AI-powered dubbing and localization pipeline for translating educational video content into Persian. Combines Whisper for transcription, GPT-4 for context-aware translation, and TTS synthesis — reducing localization time by 90%.",
    stack: ["Python", "Whisper", "GPT-4", "TTS", "FFmpeg"],
    color: "#9d00ff",
    accent: "rgba(157,0,255,0.12)",
    stats: [
      { num: "90%", label: "Time Saved" },
      { num: "1000+", label: "Hours Processed" },
      { num: "5", label: "Stage Pipeline" },
    ],
  },
  {
    id: "infra",
    index: "03",
    title: "Server Infrastructure",
    category: "Systems / Hardware",
    description:
      "Research and deployment of custom server hardware for high-density compute. Includes AT32 microcontroller chip porting, innovative liquid-cooling solutions, and Ubuntu 24 stack configuration for bare-metal production workloads.",
    stack: ["Ubuntu 24", "Docker", "AT32 MCU", "Coolify", "Cloudflare"],
    color: "#00f3ff",
    accent: "rgba(0,243,255,0.12)",
    stats: [
      { num: "40%", label: "Cost Reduction" },
      { num: "24/7", label: "Monitoring" },
      { num: "Zero", label: "Downtime" },
    ],
  },
];

const PROJECTS_FA = [
  {
    id: "beewaz",
    index: "۰۱",
    title: "پلتفرم BEEWAZ",
    category: "فروشگاه اینترنتی و CRM",
    description:
      "یک پلتفرم فروشگاه اینترنتی و CRM کامل بر پایه Next.js 16، Tailwind 4 و PostgreSQL. شامل یکپارچه‌سازی درگاه پرداخت پیچیده، گردش‌کار خودکار SMS، پشتیبانی از چند فروشنده و داشبورد تحلیل زنده برای تیم‌های عملیاتی.",
    stack: ["Next.js 16", "PostgreSQL", "Tailwind 4", "درگاه SMS", "API پرداخت"],
    color: "#00f3ff",
    accent: "rgba(0,243,255,0.12)",
    stats: [
      { num: "+۵۰K", label: "سفارش ماهانه" },
      { num: "۹۹.۹٪", label: "آپتایم" },
      { num: "<۲۰۰ms", label: "میانگین پاسخ" },
    ],
  },
  {
    id: "ai-pipeline",
    index: "۰۲",
    title: "پایپلاین بومی‌سازی هوش مصنوعی",
    category: "مهندسی هوش مصنوعی / LLM",
    description:
      "یک پایپلاین دوبله و بومی‌سازی چند مرحله‌ای با هوش مصنوعی برای ترجمه محتوای آموزشی به فارسی. ترکیبی از Whisper برای رونویسی، GPT-4 برای ترجمه آگاه از زمینه و سنتز TTS — کاهش زمان بومی‌سازی تا ۹۰٪.",
    stack: ["پایتون", "Whisper", "GPT-4", "TTS", "FFmpeg"],
    color: "#9d00ff",
    accent: "rgba(157,0,255,0.12)",
    stats: [
      { num: "۹۰٪", label: "صرفه‌جویی زمانی" },
      { num: "+۱۰۰۰", label: "ساعت پردازش‌شده" },
      { num: "۵", label: "مرحله پایپلاین" },
    ],
  },
  {
    id: "infra",
    index: "۰۳",
    title: "زیرساخت سرور",
    category: "سیستم‌ها / سخت‌افزار",
    description:
      "تحقیق و استقرار سخت‌افزار سرور سفارشی برای محاسبات با چگالی بالا. شامل پورت‌کردن تراشه میکروکنترلر AT32، راه‌حل‌های خنک‌کننده مایع نوآورانه و پیکربندی استک Ubuntu 24 برای بارهای کاری تولید روی فلز عریان.",
    stack: ["Ubuntu 24", "Docker", "AT32 MCU", "Coolify", "Cloudflare"],
    color: "#00f3ff",
    accent: "rgba(0,243,255,0.12)",
    stats: [
      { num: "۴۰٪", label: "کاهش هزینه" },
      { num: "۲۴/۷", label: "پایش" },
      { num: "صفر", label: "خرابی" },
    ],
  },
];

function ProjectCard({ project, isRtl, index: cardIndex }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: cardIndex * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
      style={{
        background: "rgba(6,12,40,0.6)",
        border: `1px solid ${project.color}18`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top accent bar */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />

      {/* Top accent glow on hover */}
      <div
        className="absolute top-0 inset-x-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}20, transparent 70%)` }}
      />

      <div className={`p-6 sm:p-8 ${isRtl ? "text-right" : ""}`}>
        {/* Header row */}
        <div className={`flex items-start justify-between mb-6 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: project.color }}>
              <span className="en">{project.index}</span> / {project.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">{project.title}</h3>
          </div>
          {/* Arrow icon */}
          <motion.div
            whileHover={{ x: isRtl ? -4 : 4, y: -4 }}
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: project.accent, border: `1px solid ${project.color}30` }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={project.color} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-3 mb-6 py-4 border-y ${isRtl ? "text-right" : "text-center"}`} style={{ borderColor: `${project.color}12` }}>
          {project.stats.map((s, i) => (
            <div key={i} className={isRtl ? "text-right" : "text-center"}>
              <div className="text-lg font-black en" style={{ color: project.color }}>{s.num}</div>
              <div className="text-[10px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs rounded-lg font-medium"
              style={{ background: project.accent, color: project.color, border: `1px solid ${project.color}20` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function CinemaProjects() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const projects = isRtl ? PROJECTS_FA : PROJECTS_EN;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020617 0%, #060c28 50%, #020617 100%)" }}
    >
      {/* Ambient */}
      <div
        className="absolute top-0 start-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #00f3ff 0%, transparent 65%)", filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-0 end-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #9d00ff 0%, transparent 65%)", filter: "blur(100px)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`mb-16 ${isRtl ? "text-right" : ""}`}
        >
          <span className="inline-block mb-3 text-xs font-bold tracking-[0.25em] uppercase text-[#00f3ff] en">
            / Projects
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 leading-tight">
            {isRtl ? (
              <>آنچه ساخته‌ام<br /><span className="text-cinema-gradient">کارهای واقعی</span></>
            ) : (
              <>What I've Built —<br /><span className="text-cinema-gradient">Real Production Work</span></>
            )}
          </h2>
        </motion.div>

        {/* Project cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} isRtl={isRtl} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
