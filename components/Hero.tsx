"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const fadeUp = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] as const },
        };

  return (
    <div className="flex flex-col items-center gap-5 px-6 pt-10 text-center md:pt-14">
      <motion.span
        {...fadeUp(0)}
        className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-sky-300/90"
      >
        Now boarding · early access
      </motion.span>

      <motion.h1
        {...fadeUp(0.12)}
        className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
      >
        From{" "}
        <span className="bg-gradient-to-r from-orange-300 to-rose-400 bg-clip-text text-transparent">
          SwiftUI
        </span>{" "}
        to{" "}
        <span className="bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent">
          Flutter
        </span>
        .
      </motion.h1>

      <motion.p
        {...fadeUp(0.24)}
        className="max-w-xl text-balance text-sm leading-relaxed text-slate-400 sm:text-base"
      >
        Port your iOS app to Android — file by file. SwiftBridge translates your
        SwiftUI views into idiomatic Flutter widgets. Join the waitlist for
        early access.
      </motion.p>
    </div>
  );
}
