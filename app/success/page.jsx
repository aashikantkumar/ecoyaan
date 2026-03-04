"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

/**
 * Success Page
 * On first mount, calls placeOrder() to save the order to history and clear the cart.
 * Displays the confirmed order details.
 */
export default function SuccessPage() {
    const router = useRouter();
    const { cartItems, shippingFee, shippingAddress, placeOrder, orderHistory } = useCart();

    // Use a ref to ensure placeOrder() is only called once (Strict Mode safe)
    const orderPlaced = useRef(false);
    const placedOrderRef = useRef(null);

    useEffect(() => {
        if (!orderPlaced.current && cartItems.length > 0 && shippingAddress) {
            orderPlaced.current = true;
            placedOrderRef.current = placeOrder(cartItems, shippingAddress, shippingFee);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Show the just-placed order if available, otherwise the most recent from history
    const order = placedOrderRef.current || orderHistory[0];

    if (!order) {
        return (
            <div className="max-w-2xl mx-auto px-4 pb-12 text-center">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
                    <p className="text-gray-500 mb-4">No order found. Please complete checkout first.</p>
                    <button
                        onClick={() => router.push("/")}
                        className="text-green-600 hover:text-green-700 font-medium underline cursor-pointer"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 pb-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 text-center">
                {/* Animated green checkmark */}
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Successful! 🎉</h1>
                <p className="text-gray-500 mb-8">Thank you for choosing eco-friendly products!</p>

                {/* Order details card */}
                <div className="bg-gray-50 rounded-xl p-6 text-left mb-8 space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono font-semibold text-gray-800">{order.orderId}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3 space-y-2">
                        {order.items.map((item) => (
                            <div key={item.product_id} className="flex justify-between text-sm text-gray-600">
                                <span>{item.product_name} × {item.quantity}</span>
                                <span>₹{(item.product_price * item.quantity).toLocaleString("en-IN")}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-3 space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span>₹{order.shippingFee}</span>
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

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => router.push("/orders")}
                        className="border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold
                       px-6 py-3 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                        📦 View Order History
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold
                       px-6 py-3 rounded-xl transition-all duration-200
                       shadow-lg shadow-green-600/25 hover:shadow-green-700/30
                       active:scale-[0.98] cursor-pointer"
                    >
                        ← Shop More
                    </button>
                </div>
            </div>
        </div>
    );
}
