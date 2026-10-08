"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { toBn } from "@/lib/format";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: { dir: string; pct: number };
}

const CategoryProducts = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState("default");

  // sort by numeric price value (not by the Bengali text)
  const sortedProducts =
    sort === "asc"
      ? [...products].sort((a, b) => a.today - b.today)
      : sort === "desc"
        ? [...products].sort((a, b) => b.today - a.today)
        : products;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
        <p className="text-5xl">🛒</p>
        <h2 className="text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
        <p>এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।</p>
        <Link href="/" className="btn btn-primary">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-base-300 bg-base-100 p-4 text-sm">
        <span>সাজান</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-sm w-auto"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="text-sm">মোট {toBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
