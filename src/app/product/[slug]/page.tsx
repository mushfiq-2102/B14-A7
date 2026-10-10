import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatAvgPrice,
  formatPrice,
  getChange,
  getUnit,
} from "@/lib/format";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: { dir: string; pct: number };
  markets: Market[];
}

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?slug=${encodeURIComponent(slug)}`,
  );

  const products: Product[] = res.ok ? await res.json() : [];
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const change = getChange(product.change);
  const unit = getUnit(product.unit);

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );

  const diff = formatPrice(Math.abs(product.today - product.yesterday));
  const summary =
    product.change.dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${diff} টাকা`
      : product.change.dir === "down"
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${diff} টাকা`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  const stats = [
    {
      label: "সর্বনিম্ন দাম",
      value: minPrice,
      color: "text-success",
      note: "সবচেয়ে কম দামের বাজার",
    },
    {
      label: "সর্বাধিক দাম",
      value: maxPrice,
      color: "text-error",
      note: "সবচেয়ে বেশি দামের বাজার",
    },
    {
      label: "গড় দাম",
      value: avgPrice,
      color: "text-primary",
      note: `প্রতি ${unit}-এর হিসাবে`,
    },
  ];

  return (
    <div className="grid gap-6">
      {/* breadcrumbs */}
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li>{product.nameBn}</li>
        </ul>
      </div>

      {/* summary */}
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
          {product.image}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.nameBn}</h1>
          <p className="text-sm">
            প্রতি {unit} · {product.categoryNameBn}
          </p>
          <p className="mt-2 text-sm">{summary}</p>
        </div>

        <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 py-4 text-center">
          <p className="text-sm">আজকের দাম</p>
          <p className="text-3xl font-bold">{formatPrice(product.today)}</p>
          <p className="text-sm">টাকা / {unit}</p>
          <p className={`mt-1 flex items-center gap-1 text-sm font-semibold ${change.color}`}>
            <span>{change.symbol}</span>
            <span>{change.pct}%</span>
          </p>
        </div>
      </div>

      <div className="grid gap-6 rounded-2xl border border-base-300 bg-base-100 p-5">
        {/* price summary */}
        <section>
          <h2 className="mb-3 text-lg font-semibold">দামের সারসংক্ষেপ</h2>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-base-300 bg-base-100 px-6 py-4"
              >
                <p className="text-xs">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>
                  {formatPrice(s.value)} টাকা
                </p>
                <p className="text-xs">{s.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* market wise price */}
        <section>
          <h2 className="mb-3 text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="table table-zebra whitespace-nowrap">
              <thead>
                <tr className="text-sm text-base-content">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m) => (
                  <tr key={m.market}>
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{formatPrice(m.min)} টাকা</td>
                    <td className="text-right">{formatPrice(m.max)} টাকা</td>
                    <td className="text-right font-semibold">
                      {formatAvgPrice((m.min + m.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
