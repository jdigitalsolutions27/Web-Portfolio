export function LearningWidget() {
  return (
    <aside className="mx-auto mt-8 max-w-6xl px-6">
      <div className="grid gap-3 rounded-2xl border border-white/10 bg-zinc-900/60 p-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Now Building</p>
          <p className="mt-2 text-sm text-zinc-200">Advocacy-first platforms, conversion-focused dashboards, and SEO-driven web apps.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Currently Learning</p>
          <p className="mt-2 text-sm text-zinc-200">Advanced motion systems with GSAP, server-first rendering patterns, and cloud-native data workflows.</p>
        </div>
      </div>
    </aside>
  );
}

