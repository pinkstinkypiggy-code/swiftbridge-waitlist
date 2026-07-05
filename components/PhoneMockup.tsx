const SKELETON_WIDTHS = ["82%", "64%", "74%", "48%"];

export default function PhoneMockup({ platform }: { platform: "ios" | "android" }) {
  const ios = platform === "ios";
  return (
    <div
      className={`relative w-full aspect-[9/19] rounded-[2rem] border p-[5%] bg-gradient-to-b from-[#141a36] to-[#080b1c] ${
        ios
          ? "border-sky-200/25 shadow-[0_0_60px_-12px_rgba(125,178,255,0.35)]"
          : "border-cyan-300/25 shadow-[0_0_60px_-12px_rgba(56,189,248,0.4)]"
      }`}
    >
      {/* side buttons */}
      <div className="absolute -left-[2px] top-[22%] h-[9%] w-[2px] rounded-full bg-slate-500/60" />
      <div className="absolute -right-[2px] top-[30%] h-[13%] w-[2px] rounded-full bg-slate-500/60" />

      {/* screen */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-[1.4rem] ${
          ios
            ? "bg-[radial-gradient(120%_90%_at_50%_0%,#1c2547_0%,#0a0e22_70%)]"
            : "bg-[radial-gradient(120%_90%_at_50%_0%,#0e2f42_0%,#081120_70%)]"
        }`}
      >
        {/* notch: Dynamic Island vs punch-hole */}
        {ios ? (
          <div className="absolute left-1/2 top-[4%] h-[3.5%] w-[34%] -translate-x-1/2 rounded-full bg-black/90" />
        ) : (
          <div className="absolute left-1/2 top-[4%] size-[3.5%] min-h-1.5 min-w-1.5 -translate-x-1/2 rounded-full bg-black/90" />
        )}

        {/* file icon + name */}
        <div className="flex h-full flex-col items-center justify-center gap-[7%] px-[8%]">
          <div
            className={`flex aspect-square w-[42%] items-center justify-center rounded-2xl text-xl font-bold text-white ${
              ios
                ? "bg-gradient-to-br from-orange-400 to-rose-500 shadow-[0_0_30px_-4px_rgba(249,115,22,0.55)]"
                : "bg-gradient-to-br from-sky-400 to-cyan-500 shadow-[0_0_30px_-4px_rgba(56,189,248,0.55)]"
            }`}
          >
            {ios ? "S" : "D"}
          </div>
          <p
            className={`max-w-full truncate font-mono text-[0.58rem] leading-none ${
              ios ? "text-orange-200/90" : "text-cyan-200/90"
            }`}
          >
            {ios ? "CheckoutCard.swift" : "checkout_card.dart"}
          </p>
          {/* skeleton code lines */}
          <div className="flex w-full flex-col gap-[6px]">
            {SKELETON_WIDTHS.map((w, i) => (
              <div
                key={i}
                style={{ width: w, marginLeft: i === 1 || i === 2 ? "10%" : 0 }}
                className={`h-[3px] rounded-full ${ios ? "bg-sky-200/20" : "bg-cyan-200/20"}`}
              />
            ))}
          </div>
        </div>

        {/* home indicator */}
        <div className="absolute bottom-[2.5%] left-1/2 h-[3px] w-[30%] -translate-x-1/2 rounded-full bg-white/25" />
      </div>
    </div>
  );
}
