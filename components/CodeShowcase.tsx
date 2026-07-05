"use client";

import { motion, useReducedMotion } from "framer-motion";

type Span = { t: string; c?: string };
type Line = Span[];

/* Xcode-ish palette */
const X = {
  kw: "text-[#ff7ab2]",
  ty: "text-[#6bdfff]",
  st: "text-[#ff8170]",
  nu: "text-[#d9c97c]",
  at: "text-[#b281eb]",
  pr: "text-[#78c2b3]",
  pl: "text-[#e6e9f5]",
  pu: "text-slate-400",
};

/* VS Code-ish palette */
const V = {
  kw: "text-[#c586c0]",
  ty: "text-[#4ec9b0]",
  st: "text-[#ce9178]",
  nu: "text-[#b5cea8]",
  at: "text-[#569cd6]",
  pr: "text-[#9cdcfe]",
  fn: "text-[#dcdcaa]",
  pl: "text-[#d4d4d4]",
  pu: "text-slate-400",
};

const SWIFT_LINES: Line[] = [
  [{ t: "import ", c: X.kw }, { t: "SwiftUI", c: X.ty }],
  [],
  [
    { t: "struct ", c: X.kw },
    { t: "CheckoutCard", c: X.ty },
    { t: ": ", c: X.pu },
    { t: "View", c: X.ty },
    { t: " {", c: X.pu },
  ],
  [
    { t: "    " },
    { t: "@State", c: X.at },
    { t: " private var ", c: X.kw },
    { t: "quantity", c: X.pl },
    { t: " = ", c: X.pu },
    { t: "1", c: X.nu },
  ],
  [],
  [
    { t: "    " },
    { t: "var ", c: X.kw },
    { t: "body", c: X.pl },
    { t: ": ", c: X.pu },
    { t: "some ", c: X.kw },
    { t: "View", c: X.ty },
    { t: " {", c: X.pu },
  ],
  [
    { t: "        " },
    { t: "VStack", c: X.ty },
    { t: "(", c: X.pu },
    { t: "spacing", c: X.pr },
    { t: ": ", c: X.pu },
    { t: "12", c: X.nu },
    { t: ") {", c: X.pu },
  ],
  [
    { t: "            " },
    { t: "Text", c: X.ty },
    { t: "(", c: X.pu },
    { t: '"Your order"', c: X.st },
    { t: ")", c: X.pu },
  ],
  [
    { t: "                ." },
    { t: "font", c: X.pr },
    { t: "(.", c: X.pu },
    { t: "headline", c: X.pr },
    { t: ")", c: X.pu },
  ],
  [
    { t: "            " },
    { t: "Stepper", c: X.ty },
    { t: "(", c: X.pu },
    { t: '"Qty \\(quantity)"', c: X.st },
    { t: ",", c: X.pu },
  ],
  [
    { t: "                    " },
    { t: "value", c: X.pr },
    { t: ": ", c: X.pu },
    { t: "$quantity", c: X.pl },
    { t: ")", c: X.pu },
  ],
  [
    { t: "            " },
    { t: "Button", c: X.ty },
    { t: "(", c: X.pu },
    { t: '"Pay now"', c: X.st },
    { t: ") { ", c: X.pu },
    { t: "pay", c: X.pr },
    { t: "() }", c: X.pu },
  ],
  [
    { t: "                ." },
    { t: "buttonStyle", c: X.pr },
    { t: "(.", c: X.pu },
    { t: "borderedProminent", c: X.pr },
    { t: ")", c: X.pu },
  ],
  [{ t: "        }", c: X.pu }],
  [
    { t: "        ." },
    { t: "padding", c: X.pr },
    { t: "()", c: X.pu },
  ],
  [{ t: "    }", c: X.pu }],
  [{ t: "}", c: X.pu }],
];

const DART_LINES: Line[] = [
  [
    { t: "import ", c: V.kw },
    { t: "'package:flutter/material.dart'", c: V.st },
    { t: ";", c: V.pu },
  ],
  [],
  [
    { t: "class ", c: V.kw },
    { t: "CheckoutCard", c: V.ty },
    { t: " extends ", c: V.kw },
    { t: "StatefulWidget", c: V.ty },
    { t: " {", c: V.pu },
  ],
  [
    { t: "  " },
    { t: "@override", c: V.at },
  ],
  [
    { t: "  " },
    { t: "State", c: V.ty },
    { t: "<", c: V.pu },
    { t: "CheckoutCard", c: V.ty },
    { t: "> ", c: V.pu },
    { t: "createState", c: V.fn },
    { t: "() =>", c: V.pu },
  ],
  [
    { t: "      " },
    { t: "_CardState", c: V.ty },
    { t: "();", c: V.pu },
  ],
  [{ t: "}", c: V.pu }],
  [],
  [
    { t: "class ", c: V.kw },
    { t: "_CardState", c: V.ty },
    { t: " extends ", c: V.kw },
    { t: "State", c: V.ty },
    { t: "<", c: V.pu },
    { t: "CheckoutCard", c: V.ty },
    { t: "> {", c: V.pu },
  ],
  [
    { t: "  " },
    { t: "int", c: V.at },
    { t: " quantity = ", c: V.pl },
    { t: "1", c: V.nu },
    { t: ";", c: V.pu },
  ],
  [],
  [
    { t: "  " },
    { t: "@override", c: V.at },
  ],
  [
    { t: "  " },
    { t: "Widget", c: V.ty },
    { t: " " },
    { t: "build", c: V.fn },
    { t: "(", c: V.pu },
    { t: "BuildContext", c: V.ty },
    { t: " context) {", c: V.pl },
  ],
  [
    { t: "    " },
    { t: "return ", c: V.kw },
    { t: "Column", c: V.ty },
    { t: "(", c: V.pu },
    { t: "children", c: V.pr },
    { t: ": [", c: V.pu },
  ],
  [
    { t: "      " },
    { t: "Text", c: V.ty },
    { t: "(", c: V.pu },
    { t: "'Your order'", c: V.st },
    { t: ", ", c: V.pu },
    { t: "style", c: V.pr },
    { t: ": heading),", c: V.pl },
  ],
  [
    { t: "      " },
    { t: "QuantityStepper", c: V.ty },
    { t: "(", c: V.pu },
    { t: "value", c: V.pr },
    { t: ": quantity),", c: V.pl },
  ],
  [
    { t: "      " },
    { t: "FilledButton", c: V.ty },
    { t: "(", c: V.pu },
    { t: "onPressed", c: V.pr },
    { t: ": pay,", c: V.pl },
  ],
  [
    { t: "          " },
    { t: "child", c: V.pr },
    { t: ": ", c: V.pu },
    { t: "Text", c: V.ty },
    { t: "(", c: V.pu },
    { t: "'Pay now'", c: V.st },
    { t: ")),", c: V.pu },
  ],
  [{ t: "    ]);", c: V.pu }],
  [{ t: "  }", c: V.pu }],
  [{ t: "}", c: V.pu }],
];

function CodeWindow({
  title,
  lines,
  flavor,
}: {
  title: string;
  lines: Line[];
  flavor: "xcode" | "vscode";
}) {
  const xcode = flavor === "xcode";
  return (
    <div
      className={`rounded-2xl p-[1.5px] ${
        xcode
          ? "bg-gradient-to-br from-orange-400/80 via-rose-500/40 to-orange-400/10 shadow-[0_0_70px_-16px_rgba(249,115,22,0.55)]"
          : "bg-gradient-to-br from-sky-400/80 via-violet-500/40 to-cyan-400/10 shadow-[0_0_70px_-16px_rgba(56,189,248,0.55)]"
      }`}
    >
      <div
        className={`overflow-hidden rounded-[15px] ${
          xcode ? "bg-[#151a28]/95" : "bg-[#10141f]/95"
        } backdrop-blur`}
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <span
            className={`ml-3 font-mono text-[0.66rem] ${
              xcode ? "text-orange-200/80" : "text-cyan-200/80"
            }`}
          >
            {title}
          </span>
          <span className="ml-auto font-mono text-[0.58rem] uppercase tracking-widest text-slate-600">
            {xcode ? "Xcode" : "VS Code"}
          </span>
        </div>
        {/* code */}
        <pre className="overflow-x-auto px-3 py-3.5 font-mono text-[0.58rem] leading-[1.7] sm:px-4 sm:text-[0.66rem]">
          {lines.map((line, i) => (
            <div key={i} className="flex whitespace-pre">
              <span className="mr-4 w-4 shrink-0 select-none text-right text-slate-600">
                {i + 1}
              </span>
              <span>
                {line.length === 0
                  ? " "
                  : line.map((s, j) => (
                      <span key={j} className={s.c ?? "text-slate-300"}>
                        {s.t}
                      </span>
                    ))}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

function FloatingWindow({
  children,
  rotate,
  delay,
  floatDelay,
}: {
  children: React.ReactNode;
  rotate: number;
  delay: number;
  floatDelay: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <div className="min-w-0">{children}</div>;
  return (
    <motion.div
      className="min-w-0"
      initial={{ opacity: 0, y: 40, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.6, 0.35, 1] }}
      whileHover={{ rotate: 0, scale: 1.02 }}
    >
      <motion.div
        animate={{ y: [0, -9, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function CodeShowcase() {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-6 pb-28 pt-16 md:pt-24">
      {/* ambient glow behind the windows */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(109,99,255,0.12),transparent)]" />

      <div className="mb-12 flex flex-col items-center gap-4 text-center md:mb-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Same screen.{" "}
          <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
            Both platforms.
          </span>
        </h2>
        <p className="max-w-lg text-balance text-sm leading-relaxed text-slate-400">
          SwiftBridge reads your SwiftUI source and writes the Flutter
          equivalent — idiomatic, readable, and yours to keep.
        </p>
      </div>

      <div className="relative grid gap-10 md:grid-cols-2 md:gap-8">
        <FloatingWindow rotate={-1.8} delay={0} floatDelay={0}>
          <CodeWindow title="CheckoutCard.swift" lines={SWIFT_LINES} flavor="xcode" />
        </FloatingWindow>

        {/* conversion chip between the stacked windows (mobile) */}
        <div className="-my-2 flex justify-center md:hidden">
          <div className="rounded-full bg-gradient-to-r from-orange-400/70 via-white/20 to-sky-400/70 p-px shadow-[0_0_40px_-6px_rgba(109,99,255,0.7)]">
            <div className="flex items-center gap-2 rounded-full bg-[#0a0d1f]/90 px-4 py-2 backdrop-blur">
              <span className="font-mono text-[0.62rem] tracking-widest text-slate-300">
                SWIFTBRIDGE
              </span>
              <span className="bg-gradient-to-r from-orange-300 to-sky-300 bg-clip-text text-sm font-bold text-transparent">
                ⇅
              </span>
            </div>
          </div>
        </div>

        <FloatingWindow rotate={1.8} delay={0.15} floatDelay={3.2}>
          <div className="md:mt-12">
            <CodeWindow title="checkout_card.dart" lines={DART_LINES} flavor="vscode" />
          </div>
        </FloatingWindow>

        {/* conversion chip between the windows */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <div className="rounded-full bg-gradient-to-r from-orange-400/70 via-white/20 to-sky-400/70 p-px shadow-[0_0_40px_-6px_rgba(109,99,255,0.7)]">
            <div className="flex items-center gap-2 rounded-full bg-[#0a0d1f]/90 px-4 py-2 backdrop-blur">
              <span className="font-mono text-[0.62rem] tracking-widest text-slate-300">
                SWIFTBRIDGE
              </span>
              <span className="bg-gradient-to-r from-orange-300 to-sky-300 bg-clip-text text-sm font-bold text-transparent">
                ⇄
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
