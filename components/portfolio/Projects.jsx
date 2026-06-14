"use client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { SectionHeader } from "./ui/SectionHeader";
import { ProjectCard } from "./ui/ProjectCard";

const PROJECTS = [
  {
    icon: "🛒",
    gradient: "#6366F1",
    titleFa: "پلتفرم BEEWAZ",
    titleEn: "BEEWAZ Platform",
    descFa: "سیستم تجارت الکترونیک و CRM سازمانی برای بازار ایران. چند‌مستاجره، بومی‌سازی‌شده با پشتیبانی از درگاه‌های پرداخت ایرانی و سرویس پیامک. رهبری تیم ۶ مهندس.",
    descEn: "Enterprise e-commerce & CRM system for the Iranian market. Multi-tenant, localized with Iranian payment gateways and SMS integrations. Leading a 6-engineer team.",
    tags: ["Next.js 16", "Tailwind 4", "PostgreSQL", "Drizzle ORM", "SMS API", "Payment"],
  },
  {
    icon: "🤖",
    gradient: "#8B5CF6",
    titleFa: "Pipeline بومی‌سازی هوش مصنوعی",
    titleEn: "AI Localization Pipeline",
    descFa: "سیستم چند مرحله‌ای برای ترجمه و دوبله محتوای آموزشی به فارسی با استفاده از LLM. از تشخیص گفتار تا سنتز صدا با کیفیت بالا.",
    descEn: "Multi-stage AI-powered pipeline for translating and dubbing educational content into Persian using LLMs. From speech recognition to high-quality voice synthesis.",
    tags: ["Python", "OpenAI API", "Whisper", "TTS", "FFmpeg", "LLM"],
  },
  {
    icon: "⚙️",
    gradient: "#3B82F6",
    titleFa: "زیرساخت سرور & سخت‌افزار",
    titleEn: "Server Infrastructure & Hardware",
    descFa: "طراحی و پیاده‌سازی سرور سفارشی، پورتینگ فریمور AT32، و راهکارهای خنک‌کننده نوآورانه. مدیریت کامل stack از سخت‌افزار تا Docker.",
    descEn: "Custom server hardware design, AT32 chip firmware porting, and innovative cooling solutions. Full-stack management from hardware to Docker containers.",
    tags: ["Ubuntu 24", "Docker", "Coolify", "AT32", "STM32", "C/C++", "Bare Metal"],
  },
];

export function Projects() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";

  return (
    <section
      id="projects"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0F172A 0%, #111827 50%, #0F172A 100%)" }}
    >
      {/* Accent blobs */}
      <div
        className="absolute top-1/4 start-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)", filter: "blur(60px)" }}
      />
      <div
        className="absolute bottom-1/4 end-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={isRtl ? "text-right" : "text-left"}>
          <SectionHeader
            badge={isRtl ? "پروژه‌ها" : "Projects"}
            title={isRtl ? "کارهایی که ساخته‌ام" : "Things I've Built"}
            subtitle={isRtl
              ? "هر پروژه یک چالش واقعی، یک راهکار مهندسی‌شده و یک نتیجه قابل اندازه‌گیری."
              : "Each project is a real challenge, an engineered solution, and a measurable outcome."
            }
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={i}
              icon={project.icon}
              gradient={project.gradient}
              title={isRtl ? project.titleFa : project.titleEn}
              description={isRtl ? project.descFa : project.descEn}
              tags={project.tags}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">
            {isRtl ? "برای همکاری در پروژه بعدی‌تان آماده‌ام" : "Ready to collaborate on your next project"}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/10 hover:border-indigo-400 rounded-xl transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {isRtl ? "بیایید صحبت کنیم" : "Let's Talk"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
