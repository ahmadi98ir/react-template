"use client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { SectionHeader } from "./ui/SectionHeader";

const SERVICES = [
  {
    icon: "🏗️",
    gradient: "#6366F1",
    titleFa: "معماری پلتفرم فول‌استک",
    titleEn: "Full-Stack Platform Architecture",
    descFa: "طراحی سیستم‌های مقیاس‌پذیر با Next.js، TypeScript و PostgreSQL — از طراحی API تا pipeline استقرار.",
    descEn: "Scalable system design with Next.js, TypeScript and PostgreSQL — from API design to deployment pipelines.",
  },
  {
    icon: "🏦",
    gradient: "#8B5CF6",
    titleFa: "سیستم‌های بانکی و فین‌تک",
    titleEn: "Banking & Fintech Systems",
    descFa: "دانش عمیق حوزه از مدرک کارشناسی ارشد حسابداری بانکی، اعمال‌شده در ساخت نرم‌افزار مالی قابل ممیزی.",
    descEn: "Deep domain knowledge from MSc in Bank Accounting, applied to building auditable financial software.",
  },
  {
    icon: "🤖",
    gradient: "#3B82F6",
    titleFa: "یکپارچه‌سازی هوش مصنوعی",
    titleEn: "AI Integration",
    descFa: "پیاده‌سازی pipeline های LLM و اتوماسیون هوشمند در گردش‌های کاری سازمانی — از RAG تا تولید محتوا.",
    descEn: "Implementing LLM pipelines and intelligent automation in enterprise workflows — from RAG to content generation.",
  },
  {
    icon: "🖥️",
    gradient: "#06B6D4",
    titleFa: "زیرساخت سرور و DevOps",
    titleEn: "Server Infrastructure & DevOps",
    descFa: "پیکربندی Ubuntu 24، Docker، Coolify و Cloudflare — zero-downtime deployment و monitoring.",
    descEn: "Ubuntu 24 configuration, Docker, Coolify and Cloudflare — zero-downtime deployment and monitoring.",
  },
  {
    icon: "🔧",
    gradient: "#F59E0B",
    titleFa: "فریمور تعبیه‌شده (AT32/STM32)",
    titleEn: "Embedded Firmware (AT32/STM32)",
    descFa: "فریمور bare-metal و RTOS برای میکروکنترلرها — از سنسورها تا پروتکل‌های ارتباطی صنعتی.",
    descEn: "Bare-metal and RTOS firmware for microcontrollers — from sensors to industrial communication protocols.",
  },
  {
    icon: "👥",
    gradient: "#10B981",
    titleFa: "رهبری فنی و منتورینگ",
    titleEn: "Technical Leadership & Mentoring",
    descFa: "رهبری تیم‌های مهندسی، تعریف استانداردهای معماری و شتاب‌دهی به تحویل از طریق دیدگاه فنی روشن.",
    descEn: "Leading engineering teams, defining architecture standards and accelerating delivery through clear technical vision.",
  },
];

export function Services() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";

  return (
    <section
      id="services"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #111827 0%, #0F172A 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={isRtl ? "text-right" : "text-left"}>
          <SectionHeader
            badge={isRtl ? "خدمات" : "Services"}
            title={isRtl ? "چه کاری انجام می‌دهم" : "What I Do"}
            subtitle={isRtl
              ? "راهکارهای سازمانی جامع از ابتدا تا انتها — نرم‌افزار، زیرساخت و سخت‌افزار."
              : "Comprehensive enterprise solutions end-to-end — software, infrastructure and hardware."
            }
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group glass-card p-6 relative overflow-hidden cursor-default"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${svc.gradient}15 0%, transparent 65%)` }}
              />
              <div
                className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${svc.gradient}, transparent)` }}
              />
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background: `${svc.gradient}20`, border: `1px solid ${svc.gradient}40` }}
                >
                  {svc.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-indigo-300 transition-colors">
                  {isRtl ? svc.titleFa : svc.titleEn}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {isRtl ? svc.descFa : svc.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
