"use client";

import { usePathname } from "next/navigation";
import { CheckBox } from "@/components/ui/checkbox";

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
                                <div className="flex h-7 w-7 items-center justify-center sm:h-9 sm:w-9">
                                    {isCompleted ? (
                                        <div className="pointer-events-none">
                                            <CheckBox
                                                checked
                                                onClick={() => { }}
                                                size={30}
                                                color="#0f172a"
                                                duration={0.55}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className={`
                      w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center
                      text-xs sm:text-sm font-semibold transition-all duration-300
                      ${isActive
                                                    ? "bg-slate-900 text-white ring-4 ring-slate-200 shadow-md shadow-slate-900/20"
                                                    : "bg-gray-200 text-gray-500"
                                                }
                    `}
                                        >
                                            {i + 1}
                                        </div>
                                    )}
                                </div>
                                {/* Label — hide non-active on very small screens */}
                                <span
                                    className={`
                    mt-1 text-[10px] sm:text-xs font-medium
                    ${isActive ? "text-slate-900" : isCompleted ? "text-slate-700" : "text-gray-400"}
                    ${!isActive && !isCompleted ? "hidden sm:block" : ""}
                  `}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector */}
                            {i < steps.length - 1 && (
                                <div className="flex-1 mx-1 sm:mx-2 mb-4 sm:mb-6">
                                    <div className={`h-0.5 rounded-full transition-all duration-500 ${i < currentIndex ? "bg-slate-700" : "bg-gray-200"}`} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
