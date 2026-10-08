"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserInfo = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const closeMenu = () => {
    (document.activeElement as HTMLElement | null)?.blur();
  };

  const handleSignout = async () => {
    closeMenu();
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি!");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    router.push("/");
  };

  if (isPending) {
    return <div className="skeleton h-10 w-28 rounded-lg"></div>;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost px-2 sm:px-4">
            <span className="flex size-9 items-center justify-center overflow-hidden rounded-[10px] bg-primary font-semibold text-primary-content">
              {user.image ? (
                <img
                  alt={user.name}
                  src={user.image}
                  className="size-full object-cover"
                />
              ) : (
                user.name.charAt(0)
              )}
            </span>
            <span className="hidden font-medium sm:inline">{user.name}</span>
            <span className="text-xs">▾</span>
          </div>

          <div
            tabIndex={0}
            className="dropdown-content z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
          >
            <div className="px-3 py-2">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>

            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-base-200"
            >
              👤 আমার প্রোফাইল
            </Link>

            <button
              onClick={handleSignout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-error hover:bg-base-200"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href={"/signin"}>
            <button className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</button>
          </Link>
          <Link href={"/signup"}>
            <button className="btn btn-primary btn-sm sm:btn-md">সাইন আপ</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
