import CodeShowcase from "@/components/CodeShowcase";
import Hero from "@/components/Hero";
import Scene from "@/components/Scene";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col overflow-hidden">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2.5">
          {/* mini bridge glyph */}
          <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden>
            <path d="M1 13h24" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M7 3v10M19 3v10M7 3 1 13M7 3l6 10M19 3l6 10M19 3l-6 10"
              stroke="url(#lg)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="26" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            SwiftBridge
          </span>
        </div>
        <span className="flex items-baseline gap-2.5 text-base font-semibold tracking-[0.14em] sm:text-lg">
          <span className="bg-gradient-to-r from-orange-300 to-rose-400 bg-clip-text text-transparent">
            iOS
          </span>
          <span className="text-slate-500">⇄</span>
          <span className="bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent">
            Android
          </span>
        </span>
      </header>

      <Hero />

      <div className="flex flex-1 items-center py-8 md:py-0">
        <Scene />
      </div>

      <CodeShowcase />

      <footer className="px-6 pb-6 pt-2 text-center font-mono text-[0.65rem] tracking-widest text-slate-600">
        SWIFTBRIDGE © 2026
      </footer>
    </main>
  );
}
