import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="text-center max-w-lg">
                {/* Big 404 */}
                <h1 className="text-[8rem] sm:text-[10rem] font-black leading-none bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent select-none">
                    404
                </h1>

                {/* Divider line */}
                <div className="flex items-center justify-center gap-3 my-4">
                    <span className="h-px w-16 bg-primary/50"></span>
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="h-px w-16 bg-primary/50"></span>
                </div>

                {/* Message */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                    পেজটি খুঁজে পাওয়া যায়নি
                </h2>
                <p className="mb-8 leading-relaxed">
                    আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।
                    চলুন, আপনাকে হোম পেজে ফিরিয়ে নিই।
                </p>

                {/* Button */}
                <Link href="/" className="btn btn-primary">
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
