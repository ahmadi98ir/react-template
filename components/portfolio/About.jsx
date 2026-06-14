"use client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { SectionHeader } from "./ui/SectionHeader";

const SKILLS = [
  { icon: "🖥️", label: "Ubuntu 24 Server", labelEn: "Ubuntu 24 Server" },
  { icon: "⚛️", label: "Next.js / React", labelEn: "Next.js / React" },
  { icon: "🐘", label: "PostgreSQL", labelEn: "PostgreSQL" },
  { icon: "🤖", label: "هوش مصنوعی / LLM", labelEn: "AI / LLM" },
  { icon: "🏦", label: "سیستم‌های بانکی", labelEn: "Banking Systems" },
  { icon: "🔧", label: "AT32/STM32", labelEn: "AT32/STM32" },
  { icon: "🐳", label: "Docker / Coolify", labelEn: "Docker / Coolify" },
  { icon: "📊", label: "تحلیل مالی", labelEn: "Financial Analysis" },
];

const TIMELINE = [
  {
    year: "۲۰۲۴–اکنون",
    yearEn: "2024–Now",
    role: "تکنیکال لید & معمار فول‌استک",
    roleEn: "Tech Lead & Full-Stack Architect",
    desc: "رهبری تیم ۶ نفره در ساخت BEEWAZ — پلتفرم تجارت الکترونیک و CRM برای بازار ایران",
    descEn: "Leading a 6-engineer team building BEEWAZ — e-commerce & CRM platform for the Iranian market",
  },
  {
    year: "۲۰۲۲–۲۰۲۴",
    yearEn: "2022–2024",
    role: "مدیر سیستم & توسعه‌دهنده ارشد",
    roleEn: "Systems Admin & Senior Developer",
    desc: "طراحی زیرساخت سرور Ubuntu، pipeline CI/CD و یکپارچه‌سازی هوش مصنوعی",
    descEn: "Designed Ubuntu server infrastructure, CI/CD pipelines, and AI integrations",
  },
  {
    year: "کارشناسی ارشد",
    yearEn: "Master's",
    role: "حسابداری بانکی",
    roleEn: "Bank Accounting",
    desc: "مزیت تحلیلی نادر در طراحی سیستم‌های مالی و فین‌تک",
    descEn: "Unique analytical advantage in financial system design and fintech",
  },
];

export function About() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#0F172A" }}>
      {/* Subtle bg accent */}
      <div
        className="absolute top-1/2 -translate-y-1/2 end-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366F1 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <SectionHeader
              badge={isRtl ? "درباره من" : "About Me"}
              title={isRtl ? "مهندسی در تلاقی مالی، کد و سخت‌افزار" : "Engineering at the Intersection of Finance, Code & Hardware"}
              subtitle={isRtl
                ? "با کارشناسی ارشد حسابداری بانکی و ۱۳+ سال تجربه عملی، راهکارهایی می‌سازم که هم از نظر مالی منطقی‌اند و هم از نظر فنی قوی."
                : "With an MSc in Bank Accounting and 13+ years of hands-on experience, I build solutions that are both financially sound and technically robust."
              }
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base"
            >
              {isRtl
                ? "تخصص منحصربه‌فرد من در تقاطع سه حوزه قرار دارد: پیکربندی معماری‌های پیچیده سرور Ubuntu 24، توسعه اپلیکیشن‌های مقیاس‌پذیر Next.js/PostgreSQL، و یکپارچه‌سازی مدل‌های زبانی بزرگ (LLM) در گردش‌های کاری واقعی. مدرک ارشد حسابداری بانکی به من دیدگاه تحلیلی نادری می‌دهد که در هر تصمیم معماری استفاده می‌کنم."
                : "My unique expertise sits at the intersection of three domains: configuring complex Ubuntu 24 server architectures, developing scalable Next.js/PostgreSQL applications, and integrating Large Language Models (LLMs) into real-world workflows. My MSc in Bank Accounting provides a rare analytical perspective I apply to every architectural decision."
              }
            </motion.p>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="flex gap-4 glass-card p-4 hover:border-indigo-500/20 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <span className="inline-block px-2 py-1 text-xs font-mono bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20 whitespace-nowrap">
                      {isRtl ? item.year : item.yearEn}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{isRtl ? item.role : item.roleEn}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{isRtl ? item.desc : item.descEn}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: skills grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 md:p-8 mb-6"
            >
              <h3 className="text-white font-bold mb-6 text-lg">
                {isRtl ? "تخصص‌های فنی" : "Technical Expertise"}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SKILLS.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(99,102,241,0.08)" }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5 transition-colors duration-200 cursor-default"
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-slate-300 text-sm font-medium">
                      {isRtl ? skill.label : skill.labelEn}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* MSc highlight card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 border-indigo-500/20 relative overflow-hidden"
              style={{ borderColor: "rgba(99,102,241,0.2)" }}
            >
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-2xl flex-shrink-0">
                  🏛️
                </div>
                <div>
                  <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    {isRtl ? "مزیت منحصربه‌فرد" : "Unique Advantage"}
                  </p>
                  <p className="text-white font-bold mb-2">
                    {isRtl ? "کارشناسی ارشد حسابداری بانکی" : "MSc Bank Accounting"}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {isRtl
                      ? "دیدگاه مالی عمیق که در هر تصمیم معماری نرم‌افزاری به کار می‌آید — از طراحی دیتابیس تا API های فین‌تک."
                      : "Deep financial insight applied to every software architecture decision — from database design to fintech APIs."
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
