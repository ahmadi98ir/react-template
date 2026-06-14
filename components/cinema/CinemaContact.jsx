"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { useLocale } from "next-intl";

const CONTACT_CARDS_EN = [
  {
    icon: "✉️",
    label: "Email",
    value: "mahdi@ahmadi98.ir",
    href: "mailto:mahdi@ahmadi98.ir",
    color: "#00f3ff",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/ahmadi98ir",
    href: "https://linkedin.com/in/ahmadi98ir",
    color: "#9d00ff",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/ahmadi98ir",
    href: "https://github.com/ahmadi98ir",
    color: "#00f3ff",
  },
];

const CONTACT_CARDS_FA = [
  {
    icon: "✉️",
    label: "ایمیل",
    value: "mahdi@ahmadi98.ir",
    href: "mailto:mahdi@ahmadi98.ir",
    color: "#00f3ff",
  },
  {
    icon: "💼",
    label: "لینکدین",
    value: "linkedin.com/in/ahmadi98ir",
    href: "https://linkedin.com/in/ahmadi98ir",
    color: "#9d00ff",
  },
  {
    icon: "🐙",
    label: "گیت‌هاب",
    value: "github.com/ahmadi98ir",
    href: "https://github.com/ahmadi98ir",
    color: "#00f3ff",
  },
];

export function CinemaContact() {
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cards = isRtl ? CONTACT_CARDS_FA : CONTACT_CARDS_EN;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error("send_failed");
      setSent(true);
    } catch {
      setError(isRtl ? "ارسال ناموفق بود. لطفاً دوباره امتحان کنید." : "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020617 0%, #060c28 100%)" }}
    >
      {/* Ambient */}
      <div
        className="absolute bottom-0 start-1/3 w-[400px] h-[400px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #00f3ff 0%, transparent 65%)", filter: "blur(100px)" }}
      />
      <div
        className="absolute top-0 end-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #9d00ff 0%, transparent 65%)", filter: "blur(80px)" }}
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
            / Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 leading-tight">
            {isRtl ? (
              <>بیایید چیزی<br /><span className="text-cinema-gradient">بسازیم</span></>
            ) : (
              <>Let's Build<br /><span className="text-cinema-gradient">Something Together</span></>
            )}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: contact cards + tagline */}
          <div className={isRtl ? "order-2 text-right" : "order-1"}>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed mb-10"
            >
              {isRtl
                ? "آماده همکاری در پروژه‌های سازمانی، مشاوره فنی یا ساخت محصول از صفر هستم. ایده‌ات را به من بگو."
                : "Available for enterprise projects, technical consulting, or building a product from scratch. Tell me about your idea."}
            </motion.p>

            <div className="space-y-4">
              {cards.map((card, i) => (
                <motion.a
                  key={i}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                  whileHover={{ x: isRtl ? -4 : 4 }}
                  className={`flex items-center gap-4 p-4 rounded-xl glass transition-all group ${isRtl ? "flex-row-reverse" : ""}`}
                  style={{ border: `1px solid ${card.color}14` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${card.color}12` }}
                  >
                    {card.icon}
                  </div>
                  <div className={isRtl ? "text-right" : ""}>
                    <div className="text-xs text-slate-500 mb-0.5">{card.label}</div>
                    <div className="text-sm font-semibold en" style={{ color: card.color }}>
                      {card.value}
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors ${isRtl ? "me-auto rotate-180" : "ms-auto"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className={`mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-sm text-xs ${isRtl ? "flex-row-reverse" : ""}`}
              style={{ border: "1px solid rgba(0,243,255,0.15)" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse" />
              <span className="text-[#00f3ff] font-semibold">
                {isRtl ? "در دسترس برای پروژه جدید" : "Open to new projects"}
              </span>
            </motion.div>
          </div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`order-1 lg:order-${isRtl ? "1" : "2"}`}
          >
            <div
              className="glass rounded-2xl p-8"
              style={{ border: "1px solid rgba(0,243,255,0.08)" }}
            >
              {sent ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold text-slate-200 mb-2">
                    {isRtl ? "پیام دریافت شد!" : "Message Received!"}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {isRtl ? "به زودی پاسخ می‌دهم." : "I'll get back to you shortly."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" dir={isRtl ? "rtl" : "ltr"}>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      {isRtl ? "نام" : "Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      placeholder={isRtl ? "مهدی احمدی" : "Your name"}
                      className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:ring-1 transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(0,243,255,0.35)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,243,255,0.06)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      {isRtl ? "ایمیل" : "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all en"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(0,243,255,0.35)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,243,255,0.06)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      {isRtl ? "پیام" : "Message"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      placeholder={isRtl ? "درباره پروژه‌ات بگو…" : "Tell me about your project…"}
                      className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-all resize-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(0,243,255,0.35)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,243,255,0.06)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-red-400 text-center">{error}</p>
                  )}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={loading ? {} : { scale: 1.02 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                    className="btn-cinema-primary w-full py-3.5 rounded-xl text-sm font-extrabold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? (isRtl ? "در حال ارسال…" : "Sending…")
                      : (isRtl ? "ارسال پیام" : "Send Message")}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
