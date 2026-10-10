import CategoryProducts from "@/components/CategoryProducts";
import { notFound } from "next/navigation";
import { toBn } from "@/lib/format";

interface Category {
  slug: string;
  nameBn: string;
  icon: string;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: { dir: string; pct: number };
}

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const categoryRes = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/categories/${encodeURIComponent(categoryId)}`,
  );

  const category: Category | null = categoryRes.ok
    ? await categoryRes.json()
    : null;

  if (!category?.slug) {
    notFound();
  }

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
  );

  const products: Product[] = res.ok ? await res.json() : [];

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts products={products} />
    </div>
  );
};

export default CategoryPage;
