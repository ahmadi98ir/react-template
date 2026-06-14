"use client";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { SectionHeader } from "./ui/SectionHeader";

const CONTACT_ITEMS = [
  { icon: "📧", labelFa: "ایمیل", labelEn: "Email", valueFa: "mahdi@ahmadi98.ir", valueEn: "mahdi@ahmadi98.ir", href: "mailto:mahdi@ahmadi98.ir" },
  { icon: "💼", labelFa: "لینکدین", labelEn: "LinkedIn", valueFa: "linkedin.com/in/ahmadi98ir", valueEn: "linkedin.com/in/ahmadi98ir", href: "#" },
  { icon: "💻", labelFa: "گیت‌هاب", labelEn: "GitHub", valueFa: "github.com/ahmadi98ir", valueEn: "github.com/ahmadi98ir", href: "https://github.com/ahmadi98ir" },
];

export function Contact() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#0F172A" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeader
            badge={isRtl ? "تماس" : "Contact"}
            title={isRtl ? "بیایید چیزی استثنایی بسازیم" : "Let's Build Something Exceptional"}
            subtitle={isRtl
              ? "مشکل پیچیده‌ای دارید یا پروژه‌ای بلندپروازانه؟ دوست دارم بشنوم."
              : "Have a complex problem or an ambitious project? I'd love to hear about it."
            }
            center
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {CONTACT_ITEMS.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card p-6 text-center hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                {isRtl ? item.labelFa : item.labelEn}
              </p>
              <p className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors" dir="ltr">
                {isRtl ? item.valueFa : item.valueEn}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Quick message box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 relative overflow-hidden"
          style={{ borderColor: "rgba(99,102,241,0.15)" }}
        >
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                {isRtl ? "نام شما" : "Your Name"}
              </label>
              <input
                type="text"
                placeholder={isRtl ? "مثلاً: علی محمدی" : "e.g. John Doe"}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                {isRtl ? "ایمیل" : "Email"}
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                dir="ltr"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-400 mb-2">
              {isRtl ? "پیام شما" : "Your Message"}
            </label>
            <textarea
              rows={4}
              placeholder={isRtl ? "درباره پروژه‌تان توضیح دهید..." : "Describe your project..."}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
            />
          </div>
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl glow-btn transition-all duration-300"
          >
            {isRtl ? "ارسال پیام" : "Send Message"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
