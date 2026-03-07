"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { BackgroundGradientDemo } from "@/components/ui/background-gradient-demo";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function ProductListingClient({ products }) {
    const router = useRouter();
    const { cartCount, addToCart } = useCart();

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-12">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Eco Products</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Choose sustainable, choose better 🌿</p>
            </div>

            {/* Use the same gradient style card for all products */}
            <div className="space-y-8 sm:space-y-10 mb-8">
                {products.map((product) => (
                    <BackgroundGradientDemo
                        key={product.product_id}
                        product={product}
                        onBuyNow={() => addToCart(product)}
                    />
                ))}
            </div>

            {/* Floating side Go-to-Cart */}
            {cartCount > 0 && (
                <div className="fixed right-3 bottom-5 z-40 sm:right-5 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto">
                    <div className="sm:hidden">
                        <LiquidButton
                            onClick={() => router.push("/cart")}
                            variant="primary"
                            size="icon"
                            className="relative h-12 w-12 shadow-xl"
                            aria-label={`Go to cart with ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-slate-900 shadow">
                                {cartCount}
                            </span>
                        </LiquidButton>
                    </div>
                    <div className="hidden sm:block">
                        <LiquidButton
                            onClick={() => router.push("/cart")}
                            variant="primary"
                            size="xl"
                            className="inline-flex min-h-[52px] items-center gap-2 shadow-xl"
                        >
                            Go to Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
                        </LiquidButton>
                    </div>
                </div>
            )}
        </div>
    );
}
