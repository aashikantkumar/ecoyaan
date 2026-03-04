"use client";

import { usePathname } from "next/navigation";

const steps = [
    { label: "Shop", path: "/" },
    { label: "Cart", path: "/cart" },
    { label: "Shipping", path: "/shipping" },
    { label: "Payment", path: "/payment" },
    { label: "Success", path: "/success" },
];

export default function ProgressBar() {
    const pathname = usePathname();
    const currentIndex = steps.findIndex((s) => s.path === pathname);

    return (
        <div className="w-full max-w-2xl mx-auto py-4 px-3 sm:py-6 sm:px-4">
            <div className="flex items-center justify-between">
                {steps.map((step, i) => {
                    const isCompleted = i < currentIndex;
                    const isActive = i === currentIndex;

                    return (
                        <div key={step.label} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center">
                                {/* Step circle */}
                                <div
                                    className={`
                    w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center
                    text-xs sm:text-sm font-semibold transition-all duration-300
                    ${isCompleted
                                            ? "bg-green-600 text-white shadow-md shadow-green-600/30"
                                            : isActive
                                                ? "bg-green-600 text-white ring-4 ring-green-200 shadow-md shadow-green-600/30"
                                                : "bg-gray-200 text-gray-500"
                                        }
                  `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                {/* Label — hide non-active on very small screens */}
                                <span
                                    className={`
                    mt-1 text-[10px] sm:text-xs font-medium
                    ${isActive ? "text-green-700" : isCompleted ? "text-green-600" : "text-gray-400"}
                    ${!isActive && !isCompleted ? "hidden sm:block" : ""}
                  `}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector */}
                            {i < steps.length - 1 && (
                                <div className="flex-1 mx-1 sm:mx-2 mb-4 sm:mb-6">
                                    <div className={`h-0.5 rounded-full transition-all duration-500 ${i < currentIndex ? "bg-green-500" : "bg-gray-200"}`} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
