import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Magnetic } from "@/components/shared/magnetic";

export function CtaSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(59,130,246,0.1),rgba(2,6,23,0.75))] p-10 shadow-[0_0_80px_rgba(56,189,248,0.18)]">
        <SectionHeading
          eyebrow="Ready To Collaborate"
          title="Let's build something premium"
          description="If you need a polished product that performs, converts, and scales, I can help you ship it end-to-end."
        />
        <div className="flex justify-center">
          <Magnetic>
            <Button asChild size="lg">
              <Link href="/contact">Start a Project</Link>
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}


