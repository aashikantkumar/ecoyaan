"use client";

import { createContext, useContext, useState, useCallback } from "react";

/**
 * CartContext
 * Global state for the checkout flow: cart items, shipping address, order total,
 * and a full history of placed orders.
 */
const CartContext = createContext(undefined);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [shippingFee] = useState(50);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]); // array of placed orders

    /** Add an item to the cart (or increment quantity if already present) */
    const addToCart = useCallback((product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product_id === product.product_id);
            if (existing) {
                return prev.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    /** Remove one unit of an item (or remove entirely if quantity reaches 0) */
    const removeFromCart = useCallback((productId) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product_id === productId);
            if (!existing) return prev;
            if (existing.quantity <= 1) {
                return prev.filter((item) => item.product_id !== productId);
            }
            return prev.map((item) =>
                item.product_id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    }, []);

    /**
     * placeOrder — called when the user reaches the success page.
     * Saves the current cart + address as a completed order, then clears the cart.
     * Returns the newly created order so the Success page can display it.
     */
    const placeOrder = useCallback((items, address, fee) => {
        const subtotal = items.reduce(
            (sum, item) => sum + item.product_price * item.quantity,
            0
        );
        const newOrder = {
            orderId: `ECO-${Date.now().toString(36).toUpperCase()}`,
            placedAt: new Date().toISOString(),
            items: [...items],
            shippingAddress: { ...address },
            shippingFee: fee,
            subtotal,
            grandTotal: subtotal + fee,
        };
        setOrderHistory((prev) => [newOrder, ...prev]); // newest first
        setCartItems([]);        // clear cart
        setShippingAddress(null); // reset address
        return newOrder;
    }, []);

    /** Total number of items currently in the cart */
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                shippingFee,
                shippingAddress,
                setShippingAddress,
                addToCart,
                removeFromCart,
                placeOrder,
                cartCount,
                orderHistory,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
