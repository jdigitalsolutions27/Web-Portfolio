"use client";

import { useSyncExternalStore } from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => {
        if (!mounted) return;
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {mounted && resolvedTheme ? (
        isDark ? <SunMedium size={18} aria-hidden /> : <MoonStar size={18} aria-hidden />
      ) : (
        <span className="h-[18px] w-[18px]" aria-hidden />
      )}
    </Button>
  );
}

