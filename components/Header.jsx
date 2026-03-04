"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const { cartCount, orderHistory } = useCart();

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-1.5 sm:gap-2 active:opacity-70 transition-opacity">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                    </svg>
                    <span className="text-lg sm:text-xl font-bold text-green-700 tracking-tight">Ecoyaan</span>
                </Link>

                <div className="flex items-center gap-0.5 sm:gap-2">
                    <span className="text-xs text-gray-400 hidden lg:block">🌱 Sustainable Shopping</span>

                    {/* Orders */}
                    <Link
                        href="/orders"
                        className="relative p-2.5 sm:p-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        title="Order History"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {orderHistory.length > 0 && (
                            <span className="absolute top-1 right-1 bg-gray-700 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {orderHistory.length}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="relative p-2.5 sm:p-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                        title="Cart"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 bg-green-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
