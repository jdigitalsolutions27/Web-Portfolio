import Link from "next/link";
import { Mail, PhoneCall, MapPin } from "lucide-react";
import { PROFILE } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function ContactTeaserSection() {
  return (
    <section id="contact-teaser" className="px-6 pb-24 pt-8">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Contact</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">Let&apos;s discuss your next product build.</h3>
          <p className="mt-3 max-w-2xl text-zinc-300">
            I am available for freelance and contract projects involving full-stack development, dashboard systems,
            and performance-first website experiences.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/contact">Go to Contact Page</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-3 text-sm text-zinc-200">
          <p className="inline-flex items-center gap-2"><Mail size={15} /> {PROFILE.email}</p>
          <p className="inline-flex items-center gap-2"><PhoneCall size={15} /> {PROFILE.phone}</p>
          <p className="inline-flex items-center gap-2"><MapPin size={15} /> {PROFILE.location}</p>
        </div>
      </div>
    </section>
  );
}


