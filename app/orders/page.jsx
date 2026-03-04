"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * Order History Page (`/orders`)
 * Shows all previously placed orders from the CartContext.
 */
export default function OrdersPage() {
    const router = useRouter();
    const { orderHistory } = useCart();

    return (
        <div className="max-w-3xl mx-auto px-4 pb-12">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                <p className="text-gray-500 mt-1">All your eco-friendly purchases</p>
            </div>

            {orderHistory.length === 0 ? (
                /* Empty state */
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">No orders yet</h2>
                    <p className="text-gray-500 mb-6 text-sm">
                        Your completed orders will appear here.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold
                       px-6 py-3 rounded-xl transition-all duration-200
                       shadow-lg shadow-green-600/25 cursor-pointer"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    {orderHistory.map((order) => (
                        <div
                            key={order.orderId}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6
                         hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Order header row */}
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                                <div>
                                    <p className="font-mono text-sm font-bold text-gray-800">{order.orderId}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {new Date(order.placedAt).toLocaleString("en-IN", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                    ✓ Delivered
                                </span>
                            </div>

                            {/* Order items */}
                            <div className="space-y-2 mb-4">
                                {order.items.map((item) => (
                                    <div
                                        key={item.product_id}
                                        className="flex justify-between text-sm text-gray-600"
                                    >
                                        <span>
                                            {item.product_name}{" "}
                                            <span className="text-gray-400">× {item.quantity}</span>
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Totals + address */}
                            <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-4 justify-between items-end">
                                <div className="text-sm text-gray-500">
                                    <p>
                                        Subtotal: ₹{order.subtotal.toLocaleString("en-IN")} + Shipping: ₹
                                        {order.shippingFee}
                                    </p>
                                    {order.shippingAddress && (
                                        <p className="text-xs mt-1 text-gray-400">
                                            📍 {order.shippingAddress.city}, {order.shippingAddress.state}
                                        </p>
                                    )}
                                </div>
                                <p className="text-lg font-bold text-green-700">
                                    ₹{order.grandTotal.toLocaleString("en-IN")}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Shop more CTA */}
                    <div className="text-center pt-2">
                        <button
                            onClick={() => router.push("/")}
                            className="text-green-600 hover:text-green-700 font-semibold underline cursor-pointer text-sm"
                        >
                            ← Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
