"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useTime,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * The signature loop, on a 10s timeline (progress 0 → 1):
 *   0.00–0.04  fade in at the iOS end
 *   0.04–0.42  travel to the center
 *   0.42–0.58  hold inside the glass card — the "conversion" (faces crossfade)
 *   0.58–0.90  travel to the Android end, now a .dart file
 *   0.90–0.96  particle burst + fade out
 */
const DURATION = 10000;

const PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2 + 0.4;
  const radius = 30 + (i % 3) * 14;
  return {
    dx: Math.cos(angle) * radius,
    dy: Math.sin(angle) * radius,
    size: 3 + (i % 3),
  };
});

function Particle({
  progress,
  dx,
  dy,
  size,
}: {
  progress: MotionValue<number>;
  dx: number;
  dy: number;
  size: number;
}) {
  const x = useTransform(progress, [0.9, 0.96], [0, dx]);
  const y = useTransform(progress, [0.9, 0.96], [0, dy]);
  const opacity = useTransform(progress, [0.89, 0.9, 0.96], [0, 1, 0]);
  return (
    <motion.span
      style={{ x, y, opacity, width: size, height: size }}
      className="absolute rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(103,232,249,0.7)]"
    />
  );
}

export default function FilePacket({ vertical = false }: { vertical?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackLength, setTrackLength] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () =>
      setTrackLength(vertical ? el.offsetHeight : el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [vertical]);

  const time = useTime();
  const progress = useTransform(time, (t) => (t % DURATION) / DURATION);

  const dist = useTransform(
    progress,
    [0.04, 0.42, 0.58, 0.9],
    [0, trackLength / 2, trackLength / 2, trackLength]
  );
  const opacity = useTransform(progress, [0, 0.04, 0.89, 0.93], [0, 1, 1, 0]);
  const scale = useTransform(
    progress,
    [0.42, 0.5, 0.58, 0.9, 0.95],
    [1, 0.92, 1, 1, 0.6]
  );
  const swiftOpacity = useTransform(progress, [0.46, 0.54], [1, 0]);
  const dartOpacity = useTransform(progress, [0.46, 0.54], [0, 1]);
  // comet trails, one per leg of the trip
  const swiftTrail = useTransform(progress, [0.06, 0.1, 0.38, 0.42], [0, 1, 1, 0]);
  const dartTrail = useTransform(progress, [0.58, 0.62, 0.84, 0.88], [0, 1, 1, 0]);
  // shockwave ring on arrival
  const ringScale = useTransform(progress, [0.895, 0.96], [0.3, 2]);
  const ringOpacity = useTransform(progress, [0.89, 0.9, 0.96], [0, 0.7, 0]);

  if (prefersReducedMotion) return null;

  const axis = vertical ? { y: dist } : { x: dist };

  return (
    <div
      ref={trackRef}
      className={vertical ? "absolute inset-0" : "absolute inset-0"}
      aria-hidden
    >
      {/* the traveling packet */}
      <motion.div
        style={{ ...axis, opacity, scale }}
        className={`absolute z-10 ${vertical ? "left-1/2 top-0" : "left-0 top-1/2"}`}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {/* trails */}
          <motion.div
            style={{ opacity: swiftTrail }}
            className={
              vertical
                ? "absolute bottom-full left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-t from-orange-400/80 to-transparent"
                : "absolute right-full top-1/2 h-px w-16 -translate-y-1/2 bg-gradient-to-l from-orange-400/80 to-transparent"
            }
          />
          <motion.div
            style={{ opacity: dartTrail }}
            className={
              vertical
                ? "absolute bottom-full left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-t from-sky-400/80 to-transparent"
                : "absolute right-full top-1/2 h-px w-16 -translate-y-1/2 bg-gradient-to-l from-sky-400/80 to-transparent"
            }
          />

          {/* swift face */}
          <motion.div
            style={{ opacity: swiftOpacity }}
            className="flex w-[182px] items-center gap-2.5 rounded-xl border border-orange-400/50 bg-[#180f14]/90 px-3 py-2 shadow-[0_0_24px_-2px_rgba(249,115,22,0.6)]"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-orange-400 to-rose-500 text-[0.65rem] font-bold text-white">
              S
            </span>
            <span className="truncate font-mono text-[0.66rem] text-orange-200">
              CheckoutCard.swift
            </span>
          </motion.div>

          {/* dart face */}
          <motion.div
            style={{ opacity: dartOpacity }}
            className="absolute inset-0 flex w-[182px] items-center gap-2.5 rounded-xl border border-sky-400/50 bg-[#0a1520]/90 px-3 py-2 shadow-[0_0_24px_-2px_rgba(56,189,248,0.6)]"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-sky-400 to-cyan-500 text-[0.65rem] font-bold text-white">
              D
            </span>
            <span className="truncate font-mono text-[0.66rem] text-cyan-200">
              checkout_card.dart
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* arrival burst, anchored at the far end of the track */}
      <div
        className={`absolute ${
          vertical ? "bottom-0 left-1/2" : "right-0 top-1/2"
        } z-10`}
      >
        <motion.span
          style={{ scale: ringScale, opacity: ringOpacity }}
          className="absolute -ml-6 -mt-6 size-12 rounded-full border-2 border-cyan-300/80"
        />
        {PARTICLES.map((p, i) => (
          <Particle key={i} progress={progress} {...p} />
        ))}
      </div>
    </div>
  );
}
