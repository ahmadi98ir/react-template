"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";

const SKILLS = [
  { label: "Next.js / React", pct: 96, color: "#00f3ff" },
  { label: "PostgreSQL / SQL", pct: 90, color: "#00f3ff" },
  { label: "Ubuntu Server (24)", pct: 94, color: "#9d00ff" },
  { label: "LLM / AI Integration", pct: 88, color: "#9d00ff" },
  { label: "Docker / DevOps", pct: 85, color: "#00f3ff" },
  { label: "TypeScript", pct: 92, color: "#9d00ff" },
];

const TIMELINE_EN = [
  {
    year: "2011–2016",
    title: "B.Sc. → Early Career",
    body: "Completed B.Sc. and began building internal tools and web applications for financial clients.",
  },
  {
    year: "2016–2021",
    title: "M.Sc. in Bank Accounting",
    body: "Graduate research gave me a deep analytical lens — financial modelling and systems thinking that now shapes how I architect scalable software.",
  },
  {
    year: "2021–Now",
    title: "Full-Stack + Systems",
    body: "Designing Ubuntu 24 server stacks, shipping Next.js/PostgreSQL products, and integrating LLMs into real enterprise workflows.",
  },
];

const TIMELINE_FA = [
  {
    year: "۱۳۹۰–۱۳۹۵",
    title: "کارشناسی → شروع حرفه‌ای",
    body: "اتمام کارشناسی و شروع ساخت ابزارهای داخلی و اپلیکیشن‌های وب برای مشتریان مالی.",
  },
  {
    year: "۱۳۹۵–۱۴۰۰",
    title: "کارشناسی ارشد حسابداری بانکی",
    body: "تحقیقات تحصیلات تکمیلی دیدگاهی تحلیلی به من داد — مدل‌سازی مالی و تفکر سیستمی که امروز معماری نرم‌افزارهای مقیاس‌پذیرم را شکل می‌دهد.",
  },
  {
    year: "۱۴۰۰–اکنون",
    title: "فول‌استک + سیستم‌ها",
    body: "طراحی استک‌های سرور Ubuntu 24، ارسال محصولات Next.js/PostgreSQL و ادغام LLMها در گردش‌کارهای واقعی سازمانی.",
  },
];

function SkillBar({ label, pct, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-slate-300">{label}</span>
        <span className="en font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
        />
      </div>
    </div>
  );
}

export function CinemaAbout() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const timeline = isRtl ? TIMELINE_FA : TIMELINE_EN;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden"
      style={{ background: "#020617" }}
    >
      {/* Ambient blob */}
      <div
        className="absolute -top-64 end-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
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
          <span className="inline-block mb-3 text-xs font-bold tracking-[0.25em] uppercase text-[#9d00ff] en">
            / About
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 leading-tight">
            {isRtl ? (
              <>کد می‌نویسم، سرور می‌سازم،<br /><span className="text-cinema-gradient">هوش مصنوعی ادغام می‌کنم</span></>
            ) : (
              <>I Build Code, Infra,<br /><span className="text-cinema-gradient">and AI Pipelines</span></>
            )}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: bio + MSc card + timeline */}
          <div className={isRtl ? "order-2 text-right" : "order-1"}>
            {/* MSc highlight card */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-8 glass rounded-2xl p-6"
              style={{ border: "1px solid rgba(157,0,255,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: "rgba(157,0,255,0.15)" }}
                >
                  🎓
                </div>
                <div>
                  <div className="text-xs text-[#9d00ff] font-bold uppercase tracking-widest en">M.Sc.</div>
                  <div className="text-sm font-semibold text-slate-200">
                    {isRtl ? "حسابداری بانکی" : "Bank Accounting"}
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                {isRtl
                  ? "پیشینه تحصیلی در حسابداری بانکی به من تفکر سیستمی و چارچوب تحلیلی می‌دهد که طراحی نرم‌افزارهای سازمانی را از دیگران متمایز می‌کند."
                  : "A postgraduate background in bank accounting provides systems thinking and an analytical framework that sets enterprise software design apart."}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-slate-400 leading-relaxed mb-10 text-sm sm:text-base"
            >
              {isRtl
                ? "در تقاطع معماری سرور Ubuntu 24، توسعه Next.js/PostgreSQL و یکپارچه‌سازی مدل‌های زبانی بزرگ فعالیت می‌کنم. با بیش از ۱۳ سال تجربه، راهکارهای سازمانی می‌سازم که در محیط‌های واقعی کار می‌کنند — نه فقط روی کاغذ."
                : "Operating at the intersection of Ubuntu 24 server architecture, Next.js/PostgreSQL development and large language model integration. With 13+ years of experience I build enterprise solutions that work in production — not just on paper."}
            </motion.p>

            {/* Timeline */}
            <div className="relative space-y-6">
              <div
                className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#9d00ff] via-[#00f3ff] to-transparent ${isRtl ? "end-[1.25rem]" : "start-[1.25rem]"}`}
              />
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.12 }}
                  className={`relative flex gap-4 ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className="relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      background: i % 2 === 0 ? "rgba(0,243,255,0.12)" : "rgba(157,0,255,0.12)",
                      border: `1px solid ${i % 2 === 0 ? "rgba(0,243,255,0.3)" : "rgba(157,0,255,0.3)"}`,
                      color: i % 2 === 0 ? "#00f3ff" : "#9d00ff",
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className={`flex-1 pb-2 ${isRtl ? "text-right" : ""}`}>
                    <div className="text-[10px] text-slate-500 mb-0.5 en">{item.year}</div>
                    <div className="text-sm font-bold text-slate-200 mb-1">{item.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{item.body}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: skill bars */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`order-2 lg:order-${isRtl ? "1" : "2"}`}
          >
            <div
              className="glass rounded-2xl p-8 space-y-6"
              style={{ border: "1px solid rgba(0,243,255,0.08)" }}
            >
              <h3 className={`text-sm font-bold text-slate-300 mb-6 uppercase tracking-widest en ${isRtl ? "text-right" : ""}`}>
                {isRtl ? "مهارت‌های فنی" : "Technical Skills"}
              </h3>
              {SKILLS.map((s, i) => (
                <SkillBar key={s.label} {...s} delay={0.3 + i * 0.08} />
              ))}
            </div>

            {/* Quick stats grid */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { num: "13+", label: isRtl ? "سال تجربه" : "Years Experience", color: "#00f3ff" },
                { num: "22+", label: isRtl ? "پروژه تحویل‌شده" : "Projects Delivered", color: "#9d00ff" },
                { num: "3", label: isRtl ? "استک اصلی" : "Core Tech Stacks", color: "#00f3ff" },
                { num: "100%", label: isRtl ? "رضایت مشتری" : "Client Satisfaction", color: "#9d00ff" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="glass-sm rounded-xl p-4 text-center"
                  style={{ border: `1px solid ${s.color}18` }}
                >
                  <div className="text-2xl font-black en mb-1" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-[11px] text-slate-500">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
