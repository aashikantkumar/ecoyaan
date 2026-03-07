"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export default function SuccessPage() {
    const router = useRouter();
    const { orderHistory } = useCart();
    const order = orderHistory[0];

    if (!order) {
        return (
            <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-12 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                    <p className="text-gray-500 mb-4">No order found. Please complete checkout first.</p>
                    <LiquidButton
                        onClick={() => router.push("/")}
                        variant="link"
                        size="sm"
                        className="font-medium"
                    >
                        Browse Products
                    </LiquidButton>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-3 sm:px-4 pb-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-12 text-center">
                {/* Animated checkmark */}
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-5 animate-bounce">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Order Successful! 🎉</h1>
                <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
                    Thank you for choosing eco-friendly products!
                </p>

                {/* Order details */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 text-left mb-6 sm:mb-8 space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono font-semibold text-gray-800 text-xs sm:text-sm">{order.orderId}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 space-y-2">
                        {order.items.map((item) => (
                            <div key={item.product_id} className="flex justify-between text-sm text-gray-600">
                                <span className="pr-2 truncate">{item.product_name} × {item.quantity}</span>
                                <span className="flex-shrink-0">₹{(item.product_price * item.quantity).toLocaleString("en-IN")}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-3 space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span><span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span><span>₹{order.shippingFee}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
                            <span>Total Paid</span>
                            <span className="text-green-700">₹{order.grandTotal.toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                    {order.shippingAddress && (
                        <div className="border-t border-gray-200 pt-3">
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Delivering to</p>
                            <p className="text-sm font-medium text-gray-800">{order.shippingAddress.fullName}</p>
                            <p className="text-sm text-gray-600">
                                {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pinCode}
                            </p>
                        </div>
                    )}
                </div>

                {/* Action buttons — stack on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <LiquidButton onClick={() => router.push("/orders")}
                        variant="secondary"
                        size="xl"
                        className="min-h-[52px]">
                        📦 View Order History
                    </LiquidButton>
                    <LiquidButton onClick={() => router.push("/")}
                        variant="primary"
                        size="xl"
                        className="min-h-[52px]">
                        ← Shop More
                    </LiquidButton>
                </div>
            </div>
        </div>
    );
}
