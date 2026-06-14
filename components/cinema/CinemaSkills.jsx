"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";

const SERVICES_EN = [
  {
    icon: "⚡",
    title: "Full-Stack Development",
    desc: "End-to-end applications with Next.js, React, TypeScript and PostgreSQL. From API design to pixel-perfect UI.",
    color: "#00f3ff",
  },
  {
    icon: "🖥️",
    title: "Server Architecture",
    desc: "Ubuntu 24 bare-metal and VM setup, Docker orchestration, Coolify PaaS, Cloudflare Zero Trust tunnels.",
    color: "#9d00ff",
  },
  {
    icon: "🤖",
    title: "LLM / AI Integration",
    desc: "Embedding GPT-4, Whisper, and custom fine-tuned models into production workflows and automation pipelines.",
    color: "#00f3ff",
  },
  {
    icon: "🗄️",
    title: "Database Design",
    desc: "Schema architecture, query optimisation, indexing strategies and migration management for PostgreSQL at scale.",
    color: "#9d00ff",
  },
  {
    icon: "📡",
    title: "DevOps & CI/CD",
    desc: "GitHub Actions pipelines, Docker multi-stage builds, GHCR registry, automated deployments and monitoring.",
    color: "#00f3ff",
  },
  {
    icon: "🔧",
    title: "Hardware & Embedded",
    desc: "AT32 MCU porting, custom cooling solutions, custom server builds optimised for compute density and cost.",
    color: "#9d00ff",
  },
];

const SERVICES_FA = [
  {
    icon: "⚡",
    title: "توسعه فول‌استک",
    desc: "اپلیکیشن‌های سرتاسری با Next.js، React، TypeScript و PostgreSQL. از طراحی API تا رابط کاربری دقیق.",
    color: "#00f3ff",
  },
  {
    icon: "🖥️",
    title: "معماری سرور",
    desc: "راه‌اندازی Ubuntu 24 فلز عریان و ماشین مجازی، orchestration داکر، Coolify PaaS، تونل‌های Cloudflare Zero Trust.",
    color: "#9d00ff",
  },
  {
    icon: "🤖",
    title: "یکپارچه‌سازی هوش مصنوعی / LLM",
    desc: "جاسازی GPT-4، Whisper و مدل‌های fine-tuned سفارشی در گردش‌کارهای تولیدی و پایپلاین‌های اتوماسیون.",
    color: "#00f3ff",
  },
  {
    icon: "🗄️",
    title: "طراحی پایگاه داده",
    desc: "معماری schema، بهینه‌سازی query، استراتژی‌های indexing و مدیریت migration برای PostgreSQL در مقیاس.",
    color: "#9d00ff",
  },
  {
    icon: "📡",
    title: "DevOps و CI/CD",
    desc: "پایپلاین‌های GitHub Actions، build چند مرحله‌ای داکر، رجیستری GHCR، استقرار خودکار و پایش.",
    color: "#00f3ff",
  },
  {
    icon: "🔧",
    title: "سخت‌افزار و تعبیه‌شده",
    desc: "پورت‌کردن AT32 MCU، راه‌حل‌های خنک‌کننده سفارشی، ساخت سرورهای سفارشی بهینه‌شده برای تراکم محاسبات و هزینه.",
    color: "#9d00ff",
  },
];

/* ─── SVG Area / Bar Chart ─────────────────────────────────────────────── */
const CHART_DATA = [
  { label: "2019", value: 30 },
  { label: "2020", value: 45 },
  { label: "2021", value: 62 },
  { label: "2022", value: 75 },
  { label: "2023", value: 85 },
  { label: "2024", value: 92 },
  { label: "2025", value: 98 },
];

const BAR_DATA = [
  { label: "JS/TS", pct: 96 },
  { label: "Python", pct: 78 },
  { label: "SQL", pct: 90 },
  { label: "Bash", pct: 82 },
  { label: "Go", pct: 55 },
];

function AreaChart({ inView }) {
  const W = 340, H = 140, PAD = 24;
  const maxVal = Math.max(...CHART_DATA.map((d) => d.value));
  const pts = CHART_DATA.map((d, i) => ({
    x: PAD + (i / (CHART_DATA.length - 1)) * (W - PAD * 2),
    y: H - PAD - (d.value / maxVal) * (H - PAD * 2),
  }));
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${H - PAD} L ${pts[0].x} ${H - PAD} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }}>
      <defs>
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
        </linearGradient>
        <filter id="glow-line">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={PAD} y1={H - PAD - t * (H - PAD * 2)}
          x2={W - PAD} y2={H - PAD - t * (H - PAD * 2)}
          stroke="rgba(255,255,255,0.05)" strokeWidth={1}
        />
      ))}

      {/* Area fill */}
      <motion.path
        d={areaPath}
        fill="url(#area-fill)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="#00f3ff"
        strokeWidth={2}
        filter="url(#glow-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
      />

      {/* Dots + labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <motion.circle
            cx={p.x} cy={p.y} r={4}
            fill="#020617" stroke="#00f3ff" strokeWidth={2}
            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
          />
          <text x={p.x} y={H - 6} textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize={9} className="en">
            {CHART_DATA[i].label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function BarChart({ inView, isRtl }) {
  return (
    <div className="space-y-3">
      {BAR_DATA.map((b, i) => (
        <div key={b.label} className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
          <span className="text-xs text-slate-500 w-12 shrink-0 en text-right">{b.label}</span>
          <div className="flex-1 h-5 rounded bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded flex items-center"
              style={{ background: `linear-gradient(90deg, #9d00ff, #00f3ff)` }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${b.pct}%` } : {}}
              transition={{ duration: 1.0, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="ms-2 text-[10px] font-bold text-white/80 en whitespace-nowrap">{b.pct}%</span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CinemaSkills() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const sectionRef = useRef(null);
  const chartsRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const chartsInView = useInView(chartsRef, { once: true, margin: "-60px" });
  const services = isRtl ? SERVICES_FA : SERVICES_EN;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-32 overflow-hidden"
      style={{ background: "#020617" }}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,243,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`mb-16 ${isRtl ? "text-right" : ""}`}
        >
          <span className="inline-block mb-3 text-xs font-bold tracking-[0.25em] uppercase text-[#9d00ff] en">
            / Services & Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 leading-tight">
            {isRtl ? (
              <>خدماتی که<br /><span className="text-cinema-gradient">ارائه می‌دهم</span></>
            ) : (
              <>What I<br /><span className="text-cinema-gradient">Bring to the Table</span></>
            )}
          </h2>
        </motion.div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group glass rounded-2xl p-6 transition-shadow hover:shadow-lg ${isRtl ? "text-right" : ""}`}
              style={{ border: `1px solid ${svc.color}10` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${svc.color}12` }}
              >
                {svc.icon}
              </div>
              <h3 className="text-base font-bold text-slate-200 mb-2">{svc.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div ref={chartsRef} className="grid lg:grid-cols-2 gap-8">
          {/* Area chart: skill growth */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            animate={chartsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-2xl p-6"
            style={{ border: "1px solid rgba(0,243,255,0.08)" }}
          >
            <h3 className={`text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest en ${isRtl ? "text-right" : ""}`}>
              {isRtl ? "رشد مهارت‌ها" : "Skill Growth Over Time"}
            </h3>
            <AreaChart inView={chartsInView} />
          </motion.div>

          {/* Bar chart: languages */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            animate={chartsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-2xl p-6"
            style={{ border: "1px solid rgba(157,0,255,0.08)" }}
          >
            <h3 className={`text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest en ${isRtl ? "text-right" : ""}`}>
              {isRtl ? "زبان‌های برنامه‌نویسی" : "Language Proficiency"}
            </h3>
            <BarChart inView={chartsInView} isRtl={isRtl} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
