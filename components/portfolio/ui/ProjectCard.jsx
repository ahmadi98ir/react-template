"use client";
import { motion } from "framer-motion";

export function ProjectCard({ title, description, tags, icon, gradient, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative glass-card p-6 md:p-8 overflow-hidden cursor-default"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${gradient}22 0%, transparent 70%)` }}
      />
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${gradient}, transparent)` }}
      />

      <div className="relative">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 shadow-lg"
          style={{ background: `${gradient}22`, border: `1px solid ${gradient}44` }}
        >
          {icon}
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-5">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 text-slate-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
