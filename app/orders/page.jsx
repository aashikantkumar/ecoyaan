"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function OrdersPage() {
    const router = useRouter();
    const { orderHistory } = useCart();

    return (
        <div className="max-w-3xl mx-auto px-3 sm:px-4 pb-12">
            <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order History</h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">All your eco-friendly purchases</p>
            </div>

            {orderHistory.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">No orders yet</h2>
                    <p className="text-gray-500 mb-6 text-sm">Your completed orders will appear here.</p>
                    <LiquidButton onClick={() => router.push("/")}
                        variant="primary"
                        size="xl"
                        className="min-h-[48px]">
                        Start Shopping
                    </LiquidButton>
                </div>
            ) : (
                <div className="space-y-4 sm:space-y-5">
                    {orderHistory.map((order) => (
                        <div key={order.orderId}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                            {/* Order header */}
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                                <div>
                                    <p className="font-mono text-xs sm:text-sm font-bold text-gray-800">{order.orderId}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {new Date(order.placedAt).toLocaleString("en-IN", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    ✓ Delivered
                                </span>
                            </div>

                            {/* Items */}
                            <div className="space-y-1.5 mb-4">
                                {order.items.map((item) => (
                                    <div key={item.product_id} className="flex justify-between text-sm text-gray-600">
                                        <span className="truncate pr-2">
                                            {item.product_name} <span className="text-gray-400">× {item.quantity}</span>
                                        </span>
                                        <span className="flex-shrink-0 font-medium text-gray-800">
                                            ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Totals + address */}
                            <div className="border-t border-gray-100 pt-3 flex flex-wrap gap-3 justify-between items-end">
                                <div className="text-sm text-gray-500">
                                    <p>Subtotal ₹{order.subtotal.toLocaleString("en-IN")} + Shipping ₹{order.shippingFee}</p>
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

                    <div className="text-center pt-2">
                        <LiquidButton onClick={() => router.push("/")}
                            variant="link"
                            size="sm"
                            className="min-h-[44px] font-semibold">
                            ← Continue Shopping
                        </LiquidButton>
                    </div>
                </div>
            )}
        </div>
    );
}
