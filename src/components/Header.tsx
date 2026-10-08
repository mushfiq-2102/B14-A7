import Link from "next/link";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import { getBanglaDate } from "@/lib/format";

const Header = () => {
  const date = getBanglaDate();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex flex-col">
            <span className="text-xl font-bold leading-6">বাজার দর</span>
            <span className="text-xs">{date}</span>
          </span>
        </Link>

        <UserInfo />
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
