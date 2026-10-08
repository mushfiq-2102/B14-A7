"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("সাইন আউট করা যায়নি!");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে!");
    router.push("/");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {isPending ? (
        <div className="skeleton h-32 rounded-2xl"></div>
      ) : (
        <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary text-3xl font-semibold text-primary-content">
            {user?.image ? (
              <img
                alt={user.name}
                src={user.image}
                className="size-full object-cover"
              />
            ) : (
              user?.name.charAt(0)
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href="/profile/update" className="btn btn-primary">
              প্রোফাইল আপডেট
            </Link>

            <button onClick={handleSignout} className="btn btn-outline btn-error">
              ↩ সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
