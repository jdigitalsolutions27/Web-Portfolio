import { PROOF_POINTS } from "@/lib/constants";

const extraPoints = [
  "23 Live Launches",
  "Modern UI Systems",
  "Conversion-Led Design",
  "Responsive by Default",
  "SEO-Ready Delivery",
] as const;

const items = [...PROOF_POINTS, ...extraPoints];

export function ProofBand() {
  return (
    <section aria-label="Proof points" className="px-6 pb-8">
      <div className="ui-surface-main layout-wide overflow-hidden rounded-full px-4 py-3">
        <div className="proof-marquee-track">
          {[...items, ...items].map((item, index) => (
            <div key={`${item}-${index}`} className="proof-pill">
              <span className="proof-pill-dot" aria-hidden />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
