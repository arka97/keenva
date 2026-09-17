import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vial } from "@/components/vial";
import { families, type Product } from "@/lib/catalog";
import { money } from "@/lib/utils";
import { useCommerce } from "@/store/commerce";

export function ProductCard({ product }: { product: Product }) {
  const mode = useCommerce((s) => s.mode);
  const addToCart = useCommerce((s) => s.addToCart);
  const addToQuote = useCommerce((s) => s.addToQuote);
  const family = families.find((f) => f.id === product.family);
  const from = product.packs[0];

  function add() {
    const pack = product.packs[0]?.label;
    if (!pack) return;
    if (mode === "labs") {
      addToQuote(product.id, pack, 1);
      toast.success(`Added ${product.name} to RFQ`);
    } else {
      addToCart(product.id, pack, 1);
      toast.success(`Added ${product.name} to cart`);
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-card transition-colors duration-150 hover:border-spruce">
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="relative flex h-36 items-center justify-center bg-mist"
      >
        {product.badge ? (
          <Badge className="absolute top-3 left-3 border-spruce bg-spruce text-paper">
            {product.badge}
          </Badge>
        ) : null}
        <Vial family={product.family} />
        <span className="absolute right-3 bottom-2.5 font-mono text-xs text-subtle">
          {product.sku}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-mono text-xs tracking-wide text-muted uppercase">
          {family?.name}
        </p>
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="text-base leading-snug font-semibold text-ink hover:text-spruce"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">{product.sub}</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <div className="text-lg font-semibold tracking-tight">
              {mode === "labs" ? "List" : "From"} {money(from.price)}
            </div>
            <div className="text-xs text-subtle">{from.label}</div>
          </div>
          <Button size="sm" variant={mode === "labs" ? "leaf" : "primary"} onClick={add}>
            <Plus className="size-4" />
            {mode === "labs" ? "Quote" : "Add"}
          </Button>
        </div>
      </div>
    </article>
  );
}
