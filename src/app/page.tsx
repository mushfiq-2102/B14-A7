import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getBanglaDate, toBn } from "@/lib/format";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: { dir: string; pct: number };
}

export default async function Home() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const products: Product[] = await res.json();
  const date = getBanglaDate();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  const movers = [
    { title: "আজ দাম বেড়েছে", symbol: "▲", color: "text-success", items: risers },
    { title: "আজ দাম কমেছে", symbol: "▼", color: "text-error", items: fallers },
  ];

  return (
    <div className="grid gap-10">
      {/* hero section */}
      <section className="rounded-3xl border border-base-300 bg-base-100">
        <div className="flex flex-col-reverse items-center justify-between gap-6 p-6 sm:p-10 md:flex-row">
          <div className="flex max-w-xl flex-col items-start gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {date}
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-1">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a href="#সব-পণ্য" className="btn btn-primary mt-3">
              সব পণ্য দেখুন
            </a>
          </div>

          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={315}
            height={263}
            priority
            className="h-auto w-52 sm:w-72"
          />
        </div>
      </section>

      {/* price movers sections */}
      {movers.map((m) => (
        <section key={m.title}>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <span className={`text-base ${m.color}`}>{m.symbol}</span>
            {m.title}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {m.items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}

      {/* all products section */}
      <section id="সব-পণ্য" className="scroll-mt-36">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-1 text-sm">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
