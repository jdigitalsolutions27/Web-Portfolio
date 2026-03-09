import { PROOF_POINTS } from "@/lib/constants";

export function ProofStrip() {
  return (
    <section aria-label="Proof points" className="px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-lg">
        {PROOF_POINTS.map((point) => (
          <p
            key={point}
            className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-wider text-cyan-100 md:text-sm"
          >
            {point}
          </p>
        ))}
      </div>
    </section>
  );
}

