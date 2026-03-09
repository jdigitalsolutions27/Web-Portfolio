import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Page not found</h1>
      <p className="mt-3 text-zinc-300">The page you are looking for does not exist or has been moved.</p>
      <Button asChild className="mt-8">
        <Link href="/">Back Home</Link>
      </Button>
    </main>
  );
}

