"use client";
import { motion } from "framer-motion";

export function SectionHeader({ badge, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${center ? "text-center" : ""}`}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
