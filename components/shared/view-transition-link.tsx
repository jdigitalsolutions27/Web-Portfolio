"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type AnchorHTMLAttributes, forwardRef, type MouseEvent, type PropsWithChildren } from "react";

type ViewTransitionLinkProps = PropsWithChildren<
  LinkProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
      onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    }
>;

export const ViewTransitionLink = forwardRef<HTMLAnchorElement, ViewTransitionLinkProps>(function ViewTransitionLink(
  { href, children, onClick, ...props },
  ref,
) {
  const router = useRouter();
  const hrefString =
    typeof href === "string"
      ? href
      : `${href.pathname ?? ""}${
          href.query
            ? `?${new URLSearchParams(
                Object.entries(href.query).reduce<Record<string, string>>((acc, [key, value]) => {
                  if (value === undefined) return acc;
                  acc[key] = Array.isArray(value) ? value.join(",") : String(value);
                  return acc;
                }, {}),
              ).toString()}`
            : ""
        }${href.hash ? `#${href.hash}` : ""}`;

  return (
    <Link
      ref={ref}
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0 ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          typeof (document as Document & { startViewTransition?: (callback: () => void) => void }).startViewTransition !== "function"
        ) {
          return;
        }

        event.preventDefault();
        (document as Document & { startViewTransition: (callback: () => void) => void }).startViewTransition(() => {
          router.push(hrefString);
        });
      }}
    >
      {children}
    </Link>
  );
});
