"use client";

export default function Loading({ size = "w-16 h-16", color = "border-sky-400/80" }) {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-100">
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Spinner */}
            <div
                className={`${size} border-8 ${color} border-t-transparent rounded-full animate-spin 
                    shadow-[0_0_25px_rgba(56,189,248,0.7)] relative`}
            ></div>
        </div>
    );
}

