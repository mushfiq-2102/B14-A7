"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleUpdateProfile = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
    };

    const { error } = await authClient.updateUser({
      ...newUserData,
    });

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি!");
      console.log(error);
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm">আপনার নাম পরিবর্তন করুন।</p>
      </div>

      {isPending ? (
        <div className="skeleton h-48 rounded-2xl"></div>
      ) : (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
          <form onSubmit={handleUpdateProfile}>
            <fieldset className="fieldset gap-4">
              <div>
                <label className="label text-sm font-medium text-base-content">নাম</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={user?.name}
                  className="input w-full"
                  placeholder="আপনার নাম"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                তথ্য আপডেট করুন
              </button>
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProfilePage;
