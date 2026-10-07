import Image from "next/image";
import type { Product } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Each product's own mark, at one consistent tile size. */
export function ProductMark({ product, className }: { product: Product["key"]; className?: string }) {
  const tile = cn("relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl", className);
  if (product === "agent-commons") {
    return (
      <span className={cn(tile, "border border-border bg-white")}>
        <Image src="/products/agent-commons.svg" alt="" width={40} height={40} className="h-full w-full" />
      </span>
    );
  }
  if (product === "commonlab") {
    return (
      <span className={tile}>
        <Image src="/products/commonlab.svg" alt="" width={40} height={40} className="h-full w-full" />
      </span>
    );
  }
  return (
    <span className={cn(tile, "bg-stone-900 text-[13px] font-semibold tracking-tight text-white")}>PK</span>
  );
}
