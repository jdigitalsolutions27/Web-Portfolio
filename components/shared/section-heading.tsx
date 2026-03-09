import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-10 max-w-3xl text-center", className)}>
      {eyebrow ? <Badge className="mb-4" variant="default">{eyebrow}</Badge> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-pretty text-zinc-300">{description}</p> : null}
    </div>
  );
}

