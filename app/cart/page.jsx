"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/OrderSummary";

/**
 * Cart Page — Shows items added from the product listing.
 * Allows quantity adjustment and proceeds to checkout.
 */
export default function CartPage() {
    const router = useRouter();
    const { cartItems, shippingFee, addToCart, removeFromCart, cartCount } = useCart();

    if (cartCount === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 pb-12 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Add some eco-friendly products first!</p>
                    <button
                        onClick={() => router.push("/")}
                        className="text-green-600 hover:text-green-700 font-semibold underline cursor-pointer"
                    >
                        ← Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pb-12">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
                <p className="text-gray-500 mt-1">Review your eco-friendly picks</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Cart Items — 3 columns on large screens */}
                <div className="lg:col-span-3 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.product_id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-5 items-center
                         hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                                <Image
                                    src={item.image}
                                    alt={item.product_name}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate">
                                    {item.product_name}
                                </h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    ₹{item.product_price} each
                                </p>
                                {/* Quantity controls */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        onClick={() => removeFromCart(item.product_id)}
                                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600
                               flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                                    >
                                        −
                                    </button>
                                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600
                               flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-700 text-lg">
                                    ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary — 2 columns on large screens */}
                <div className="lg:col-span-2 space-y-4">
                    <OrderSummary cartItems={cartItems} shippingFee={shippingFee} />

                    <button
                        onClick={() => router.push("/shipping")}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold
                       py-3.5 rounded-xl transition-all duration-200
                       shadow-lg shadow-green-600/25 hover:shadow-green-700/30
                       active:scale-[0.98] cursor-pointer"
                    >
                        Proceed to Checkout →
                    </button>
                </div>
            </div>
        </div>
    );
}
