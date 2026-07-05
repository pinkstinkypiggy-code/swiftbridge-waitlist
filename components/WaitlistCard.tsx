"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistCard() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setError("That doesn't look like an email — mind checking it?");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message !== "Failed to fetch"
          ? err.message
          : "Couldn't reach the server — please try again."
      );
    }
  }

  return (
    <div className="rounded-[18px] bg-gradient-to-br from-sky-400/40 via-white/10 to-violet-500/40 p-px shadow-[0_0_90px_-18px_rgba(109,99,255,0.55)]">
      <div className="rounded-[17px] bg-[#0a0d1f]/75 px-6 py-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-slate-100">
            Join the waitlist
          </h2>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-slate-500">
            conversion engine
          </span>
        </div>

        {status === "success" ? (
          <div className="flex min-h-[76px] flex-col justify-center gap-1">
            <p className="text-base font-medium text-emerald-300">
              You&apos;re on the list ✓
            </p>
            <p className="text-xs text-slate-400">
              We&apos;ll email you when the bridge opens.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2.5">
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              required
              autoComplete="email"
              placeholder="you@yourapp.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/60 focus:bg-white/[0.09] focus:ring-2 focus:ring-sky-400/20"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10">
                {status === "loading" ? "Crossing the bridge…" : "Join the waitlist"}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`min-h-4 text-xs ${status === "error" ? "text-rose-300" : "text-slate-500"}`}
            >
              {status === "error" ? error : "Early access · No spam, ever."}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
