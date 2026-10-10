import NavLink from "./NavLink";

interface Category {
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
  const categories: Category[] = await res.json();

  return (
    <nav className="border-t border-base-200 bg-base-100">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
        {categories.map((c) => (
          <NavLink key={c.slug} href={`/category/${c.slug}`}>
            <span>{c.icon}</span>
            <span>{c.nameBn}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
