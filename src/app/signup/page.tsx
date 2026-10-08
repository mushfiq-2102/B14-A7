"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { confirmPassword, ...user } = Object.fromEntries(
      formData.entries(),
    ) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (user.password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (data) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
      router.push("/signin");
    }

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি!");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 py-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-sm">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        <form onSubmit={onSubmit}>
          <fieldset className="fieldset gap-4">
            <div>
              <label className="label text-sm font-medium text-base-content">নাম</label>
              <input
                name="name"
                type="text"
                required
                className="input w-full"
                placeholder="যেমন: রহিম উদ্দিন"
              />
            </div>

            <div>
              <label className="label text-sm font-medium text-base-content">ইমেইল</label>
              <input
                name="email"
                type="email"
                required
                className="input w-full"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="label text-sm font-medium text-base-content">পাসওয়ার্ড</label>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                className="input w-full"
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
            </div>

            <div>
              <label className="label text-sm font-medium text-base-content">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                className="input w-full"
                placeholder="আবার লিখুন"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full">
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </fieldset>
        </form>

        <div className="divider text-xs">অথবা</div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline flex-1 border-base-300"
          >
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            onClick={handleGithubSignIn}
            className="btn btn-outline flex-1 border-base-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-6 text-center text-sm">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-semibold text-primary hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="text-center text-sm hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUpPage;
