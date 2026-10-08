import Link from "next/link";
import { formatPrice, getChange, getUnit } from "@/lib/format";

interface Product {
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: { dir: string; pct: number };
}

const ProductCard = ({ product }: { product: Product }) => {
  const change = getChange(product.change);

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="card rounded-2xl border border-base-300 bg-base-100 transition-shadow hover:shadow-md">
        <div className="card-body gap-3 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
              {product.image}
            </div>
            <div>
              <h2 className="font-semibold">{product.nameBn}</h2>
              <p className="text-xs">প্রতি {getUnit(product.unit)}</p>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs">আজকের দাম</p>
              <p className="text-xl font-bold">{formatPrice(product.today)} টাকা</p>
            </div>

            <span
              className={`flex items-center gap-1 rounded-full bg-base-200 px-2 py-1 text-xs font-semibold ${change.color}`}
            >
              <span>{change.symbol}</span>
              <span>{change.pct}%</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
