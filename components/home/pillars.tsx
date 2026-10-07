import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductMark } from "@/components/site/product-mark";
import { Reveal } from "@/components/site/reveal";
import { Hl, Section, SectionHeading } from "@/components/site/section";
import { PRODUCTS } from "@/lib/site";

export function Pillars() {
  return (
    <Section id="work" className="border-t border-border bg-white">
      <Reveal>
        <SectionHeading
          eyebrow="What we build"
          title={
            <>
              Control over AI comes down to <Hl>three things</Hl>.
            </>
          }
          body="Where it runs, how well people use it, and whether its work can be traced. We build one product for each."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PRODUCTS.map((product, index) => (
          <Reveal key={product.key} delay={0.06 * index} className="h-full">
            <Link
              href={`#${product.anchor}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-page p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white hover:shadow-floating"
            >
              <div className="flex items-center justify-between">
                <ProductMark product={product.key} />
                <span className="font-mono text-xs text-stone-400">0{index + 1}</span>
              </div>
              <p className="mt-6 text-sm text-stone-500">{product.area}</p>
              <h3 className="mt-1.5 text-xl font-medium tracking-[-0.025em] text-stone-950">{product.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-7 text-stone-600">{product.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-900">
                {product.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
