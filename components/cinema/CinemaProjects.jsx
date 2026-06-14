"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";

// Static fallback used when DB has no published projects yet
const FALLBACK_EN = [
  {
    id: "beewaz",
    index: "01",
    title: "BEEWAZ Platform",
    category: "E-commerce & CRM",
    description:
      "A full-scale e-commerce and CRM platform built on Next.js 16, Tailwind 4, and PostgreSQL. Features complex payment gateway integration, automated SMS workflows, multi-vendor support, and a real-time analytics dashboard.",
    stack: ["Next.js 16", "PostgreSQL", "Tailwind 4", "SMS Gateway", "Payment API"],
    color: "#00f3ff",
    accent: "rgba(0,243,255,0.12)",
    projectUrl: null,
    githubUrl: null,
    stats: [{ num: "50K+", label: "Monthly Orders" }, { num: "99.9%", label: "Uptime" }, { num: "<200ms", label: "Avg Response" }],
  },
  {
    id: "ai-pipeline",
    index: "02",
    title: "AI Localization Pipeline",
    category: "AI / LLM Engineering",
    description:
      "A multi-stage AI-powered dubbing and localization pipeline for translating educational video content into Persian. Combines Whisper, GPT-4, and TTS synthesis — reducing localization time by 90%.",
    stack: ["Python", "Whisper", "GPT-4", "TTS", "FFmpeg"],
    color: "#9d00ff",
    accent: "rgba(157,0,255,0.12)",
    projectUrl: null,
    githubUrl: null,
    stats: [{ num: "90%", label: "Time Saved" }, { num: "1000+", label: "Hours Processed" }, { num: "5", label: "Stage Pipeline" }],
  },
  {
    id: "infra",
    index: "03",
    title: "Server Infrastructure",
    category: "Systems / Hardware",
    description:
      "Research and deployment of custom server hardware for high-density compute. Includes AT32 MCU chip porting, innovative liquid-cooling solutions, and Ubuntu 24 stack configuration for bare-metal production workloads.",
    stack: ["Ubuntu 24", "Docker", "AT32 MCU", "Coolify", "Cloudflare"],
    color: "#00f3ff",
    accent: "rgba(0,243,255,0.12)",
    projectUrl: null,
    githubUrl: null,
    stats: [{ num: "40%", label: "Cost Reduction" }, { num: "24/7", label: "Monitoring" }, { num: "Zero", label: "Downtime" }],
  },
];

const FALLBACK_FA = [
  {
    id: "beewaz",
    index: "۰۱",
    title: "پلتفرم BEEWAZ",
    category: "فروشگاه اینترنتی و CRM",
    description:
      "یک پلتفرم فروشگاه اینترنتی و CRM کامل بر پایه Next.js 16، Tailwind 4 و PostgreSQL. شامل یکپارچه‌سازی درگاه پرداخت پیچیده، گردش‌کار خودکار SMS، پشتیبانی از چند فروشنده و داشبورد تحلیل زنده.",
    stack: ["Next.js 16", "PostgreSQL", "Tailwind 4", "درگاه SMS", "API پرداخت"],
    color: "#00f3ff",
    accent: "rgba(0,243,255,0.12)",
    projectUrl: null,
    githubUrl: null,
    stats: [{ num: "+۵۰K", label: "سفارش ماهانه" }, { num: "۹۹.۹٪", label: "آپتایم" }, { num: "<۲۰۰ms", label: "میانگین پاسخ" }],
  },
  {
    id: "ai-pipeline",
    index: "۰۲",
    title: "پایپلاین بومی‌سازی هوش مصنوعی",
    category: "مهندسی هوش مصنوعی / LLM",
    description:
      "یک پایپلاین دوبله و بومی‌سازی چند مرحله‌ای برای ترجمه محتوای آموزشی به فارسی. ترکیبی از Whisper، GPT-4 و TTS — کاهش زمان بومی‌سازی تا ۹۰٪.",
    stack: ["پایتون", "Whisper", "GPT-4", "TTS", "FFmpeg"],
    color: "#9d00ff",
    accent: "rgba(157,0,255,0.12)",
    projectUrl: null,
    githubUrl: null,
    stats: [{ num: "۹۰٪", label: "صرفه‌جویی زمانی" }, { num: "+۱۰۰۰", label: "ساعت پردازش‌شده" }, { num: "۵", label: "مرحله پایپلاین" }],
  },
  {
    id: "infra",
    index: "۰۳",
    title: "زیرساخت سرور",
    category: "سیستم‌ها / سخت‌افزار",
    description:
      "تحقیق و استقرار سخت‌افزار سرور سفارشی برای محاسبات با چگالی بالا. شامل پورت‌کردن تراشه AT32 MCU، راه‌حل‌های خنک‌کننده مایع سفارشی و پیکربندی Ubuntu 24.",
    stack: ["Ubuntu 24", "Docker", "AT32 MCU", "Coolify", "Cloudflare"],
    color: "#00f3ff",
    accent: "rgba(0,243,255,0.12)",
    projectUrl: null,
    githubUrl: null,
    stats: [{ num: "۴۰٪", label: "کاهش هزینه" }, { num: "۲۴/۷", label: "پایش" }, { num: "صفر", label: "خرابی" }],
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
      style={{ background: "rgba(6,12,40,0.6)", border: `1px solid ${project.color}18`, backdropFilter: "blur(20px)" }}
    >
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
      <div
        className="absolute top-0 inset-x-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.color}20, transparent 70%)` }}
      />

      <div className={`p-6 sm:p-8 ${isRtl ? "text-right" : ""}`}>
        <div className={`flex items-start justify-between mb-6 ${isRtl ? "flex-row-reverse" : ""}`}>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: project.color }}>
              <span className="en">{project.index}</span> / {project.category}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">{project.title}</h3>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 10, background: project.accent, border: `1px solid ${project.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={project.color} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 10, background: project.accent, border: `1px solid ${project.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg className="w-4 h-4" fill={project.color} viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              </a>
            )}
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

        {project.stats && (
          <div className={`grid grid-cols-3 gap-3 mb-6 py-4 border-y ${isRtl ? "text-right" : "text-center"}`} style={{ borderColor: `${project.color}12` }}>
            {project.stats.map((s, i) => (
              <div key={i} className={isRtl ? "text-right" : "text-center"}>
                <div className="text-lg font-black en" style={{ color: project.color }}>{s.num}</div>
                <div className="text-[10px] text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
          {project.stack.map((tech) => (
            <span key={tech} className="px-2.5 py-1 text-xs rounded-lg font-medium"
              style={{ background: project.accent, color: project.color, border: `1px solid ${project.color}20` }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── dbProjects: array of projects from DB (already shaped) ── */
export function CinemaProjects({ dbProjects = [] }) {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Map DB rows → card shape; fall back to static if DB empty
  let cards;
  if (dbProjects.length > 0) {
    const COLORS = ["#00f3ff", "#9d00ff", "#00f3ff", "#9d00ff", "#00f3ff"];
    cards = dbProjects.map((p, i) => ({
      id: p.id,
      index: String(i + 1).padStart(2, "0"),
      title: isRtl ? (p.title?.fa || p.title?.en || "") : (p.title?.en || p.title?.fa || ""),
      category: p.category || "",
      description: isRtl ? (p.description?.fa || p.description?.en || "") : (p.description?.en || p.description?.fa || ""),
      stack: p.tags || [],
      color: COLORS[i % COLORS.length],
      accent: `${COLORS[i % COLORS.length]}12`,
      projectUrl: p.projectUrl,
      githubUrl: p.githubUrl,
      stats: null,
    }));
  } else {
    cards = isRtl ? FALLBACK_FA : FALLBACK_EN;
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020617 0%, #060c28 50%, #020617 100%)" }}
    >
      <div className="absolute top-0 start-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #00f3ff 0%, transparent 65%)", filter: "blur(120px)" }} />
      <div className="absolute bottom-0 end-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #9d00ff 0%, transparent 65%)", filter: "blur(100px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`mb-16 ${isRtl ? "text-right" : ""}`}
        >
          <span className="inline-block mb-3 text-xs font-bold tracking-[0.25em] uppercase text-[#00f3ff] en">/ Projects</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 leading-tight">
            {isRtl ? (<>آنچه ساخته‌ام<br /><span className="text-cinema-gradient">کارهای واقعی</span></>) : (<>What I've Built —<br /><span className="text-cinema-gradient">Real Production Work</span></>)}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((project, i) => (
            <ProjectCard key={project.id} project={project} isRtl={isRtl} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
