"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export function Button({ href, children, variant = "primary", onClick, className = "" }) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white glow-btn",
    outline:
      "border border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400",
    ghost:
      "text-slate-300 hover:text-white hover:bg-white/5",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  const inner = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cls}
      onClick={onClick}
    >
      {children}
    </motion.span>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return inner;
}
