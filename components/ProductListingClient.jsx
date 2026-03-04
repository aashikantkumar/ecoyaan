"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

function ProductCard({ product }) {
    const { addToCart, cartItems } = useCart();
    const inCart = cartItems.find((item) => item.product_id === product.product_id);
    const qty = inCart ? inCart.quantity : 0;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden
                    active:scale-[0.98] transition-all duration-200 group">
            {/* Image */}
            <div className="relative w-full aspect-square bg-green-50 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.product_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized
                />
                {qty > 0 && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                        {qty} in cart
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5">
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg leading-snug mb-1">
                    {product.product_name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center justify-between gap-3">
                    <span className="text-xl font-bold text-green-700">
                        ₹{product.product_price.toLocaleString("en-IN")}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-semibold
                       px-4 py-2.5 rounded-xl transition-all duration-150
                       shadow-md shadow-green-600/20 active:scale-95 cursor-pointer
                       min-h-[44px]"
                    >
                        {qty > 0 ? "Add More" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductListingClient({ products }) {
    const router = useRouter();
    const { cartCount } = useCart();

    return (
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-24 sm:pb-12">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Eco Products</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Choose sustainable, choose better 🌿</p>
            </div>

            {/* Grid — 1 col on phone, 2 on tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8">
                {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </div>

            {/* Sticky bottom Go-to-Cart on mobile */}
            {cartCount > 0 && (
                <>
                    {/* Floating bottom bar on mobile */}
                    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-100 shadow-lg sm:hidden z-40"
                        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
                        <button
                            onClick={() => router.push("/cart")}
                            className="w-full bg-green-600 active:bg-green-700 text-white font-semibold
                         py-3.5 rounded-xl transition-all duration-150 active:scale-[0.98]
                         flex items-center justify-center gap-2 cursor-pointer min-h-[52px]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            Go to Cart · {cartCount} {cartCount === 1 ? "item" : "items"}
                        </button>
                    </div>
                    {/* Inline button on desktop */}
                    <div className="hidden sm:flex justify-center">
                        <button
                            onClick={() => router.push("/cart")}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold
                         px-8 py-3.5 rounded-xl transition-all duration-200
                         shadow-lg shadow-green-600/25 active:scale-[0.98] cursor-pointer
                         inline-flex items-center gap-2"
                        >
                            Go to Cart ({cartCount} {cartCount === 1 ? "item" : "items"}) →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
