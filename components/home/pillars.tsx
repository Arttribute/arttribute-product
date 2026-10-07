import { ArrowUpRight } from "lucide-react";
import { ProductMark } from "@/components/site/product-mark";
import { PRODUCTS } from "@/lib/site";

export function Pillars() {
  return (
    <div className="brand-container brand-rule-line">
      <div className="brand-product-strip">
        {PRODUCTS.map((product) => (
          <a href={`#${product.anchor}`} key={product.key}>
            <ProductMark product={product.key} className="h-9 w-9 rounded-md" />
            <span>
              <span className="block text-sm font-medium tracking-tight">
                {product.name}
              </span>
              <span className="mt-1 block text-xs text-[#666b73]">
                {product.area}
              </span>
            </span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
