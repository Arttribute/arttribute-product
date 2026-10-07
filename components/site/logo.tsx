import Link from "next/link";
import { cn } from "@/lib/utils";

/** The Arttribute cube, in its original pink, plum and indigo. */
export function CubeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="4 2.5 24 27"
      fill="none"
      aria-hidden
      className={cn("h-6 w-auto", className)}
    >
      <path
        d="M16.1191 3.20123L27.1486 9.66137L16.5918 16.5942L4.85327 9.66137L16.1191 3.20123Z"
        fill="#F74581"
      />
      <path
        d="M4.85327 9.66138L16.5918 16.5942V28.6479L5.01084 22.1877L4.85327 9.66138Z"
        fill="#813380"
      />
      <path
        d="M16.5918 16.5942L27.1486 9.66138V22.109L16.5918 28.5691V16.5942Z"
        fill="#1A237E"
      />
      <path
        d="M4.85716 9.92495L4.85326 9.66133L5.01082 9.74011L16.6707 28.4905L16.5918 28.6478L16.476 28.5874L4.85716 9.92495Z"
        fill="#F74581"
      />
    </svg>
  );
}

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Arttribute home"
      className={cn(
        "group flex items-center gap-2.5 text-[23px] font-semibold tracking-[-0.05em] text-foreground",
        className,
      )}
    >
      <CubeMark className="h-[28px]" />
      Arttribute
    </Link>
  );
}
