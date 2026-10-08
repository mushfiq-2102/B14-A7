const LoadingPage = () => {
    return (
        <div className="grid gap-4">
            {/* title skeleton */}
            <div className="skeleton h-8 w-52"></div>

            {/* product cards skeleton */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="skeleton h-[138px] rounded-2xl"></div>
                ))}
            </div>
        </div>
    );
};

export default LoadingPage;
