"use client";

import { useMotionValue, useReducedMotion, useSpring, useTransform, motion } from "framer-motion";
import type { MouseEvent } from "react";
import BridgeSvg from "./BridgeSvg";
import FilePacket from "./FilePacket";
import PhoneMockup from "./PhoneMockup";
import WaitlistCard from "./WaitlistCard";

// deterministic star field (no Math.random — keeps SSR and client markup identical)
const STARS = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 137.508) % 100}%`,
  top: `${(i * 61.803) % 55}%`,
  size: 1 + (i % 3) * 0.7,
  delay: `${(i % 9) * 0.7}s`,
}));

const SPRING = { stiffness: 55, damping: 16 };

export default function Scene() {
  const prefersReducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const phoneLX = useSpring(useTransform(mx, (v) => v * -16), SPRING);
  const phoneLY = useSpring(useTransform(my, (v) => v * -10), SPRING);
  const phoneRX = useSpring(useTransform(mx, (v) => v * 16), SPRING);
  const phoneRY = useSpring(useTransform(my, (v) => v * -10), SPRING);
  const bridgeX = useSpring(useTransform(mx, (v) => v * -7), SPRING);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <>
      {/* ============ desktop: the bridge ============ */}
      <div
        onMouseMove={handleMouseMove}
        className="relative mx-auto hidden w-full max-w-[1700px] md:block"
      >
        <div className="relative aspect-[1600/620] w-full">
          {/* stars */}
          {STARS.map((s, i) => (
            <span
              key={i}
              className="star"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: s.delay,
              }}
            />
          ))}

          {/* soft halo behind the center of the span */}
          <div className="absolute left-1/2 top-[58%] -z-10 h-[46%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(109,99,255,0.16),transparent)]" />

          <motion.div style={{ x: bridgeX }} className="absolute inset-0">
            <BridgeSvg className="h-full w-full" />
          </motion.div>

          {/* iOS shore */}
          <motion.div
            style={{ x: phoneLX, y: phoneLY }}
            className="absolute bottom-[36%] left-[3.5%] z-10 w-[11%] min-w-[120px] max-w-[185px]"
          >
            <div className="animate-float">
              <PhoneMockup platform="ios" />
              <p className="mt-3 text-center font-mono text-[0.65rem] tracking-widest text-slate-500">
                SWIFTUI · IOS
              </p>
            </div>
          </motion.div>

          {/* Android shore */}
          <motion.div
            style={{ x: phoneRX, y: phoneRY }}
            className="absolute bottom-[36%] right-[3.5%] z-10 w-[11%] min-w-[120px] max-w-[185px]"
          >
            <div className="animate-float-delayed">
              <PhoneMockup platform="android" />
              <p className="mt-3 text-center font-mono text-[0.65rem] tracking-widest text-slate-500">
                FLUTTER · ANDROID
              </p>
            </div>
          </motion.div>

          {/* packet track along the deck, phone to phone */}
          <div className="absolute left-[13%] right-[13%] top-[63.2%] z-10 h-px">
            <FilePacket />
          </div>

          {/* the glass card, sitting on the span */}
          <div className="absolute left-1/2 top-[62%] z-20 w-[350px] -translate-x-1/2 -translate-y-1/2">
            <WaitlistCard />
          </div>
        </div>
      </div>

      {/* ============ mobile: vertical crossing ============ */}
      <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-9 px-6 py-6 md:hidden">
        {/* vertical cable */}
        <svg
          className="absolute inset-x-0 top-16 bottom-16 mx-auto h-[calc(100%-8rem)] w-8"
          viewBox="0 0 32 800"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line x1="16" y1="0" x2="16" y2="800" stroke="#8a97e8" strokeOpacity="0.25" strokeWidth="2" />
          <line
            x1="16"
            y1="0"
            x2="16"
            y2="800"
            stroke="#93c5fd"
            strokeOpacity="0.6"
            strokeWidth="2"
            className="cable-vertical"
          />
        </svg>

        {/* packet track: from the top phone down to the bottom phone */}
        <div className="absolute bottom-28 top-28 left-1/2 z-10 w-px">
          <FilePacket vertical />
        </div>

        <div className="z-20 w-36">
          <div className="animate-float">
            <PhoneMockup platform="ios" />
            <p className="mt-2.5 text-center font-mono text-[0.6rem] tracking-widest text-slate-500">
              SWIFTUI · IOS
            </p>
          </div>
        </div>

        <div className="z-20 w-full">
          <WaitlistCard />
        </div>

        <div className="z-20 w-36">
          <div className="animate-float-delayed">
            <PhoneMockup platform="android" />
            <p className="mt-2.5 text-center font-mono text-[0.6rem] tracking-widest text-slate-500">
              FLUTTER · ANDROID
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
