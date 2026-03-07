"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

/**
 * CartContext
 * Global state for the checkout flow: cart items, shipping address, order total,
 * and a full history of placed orders.
 */
const CartContext = createContext(undefined);
const STORAGE_KEY = "ecoyaa.checkout.state.v1";

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [shippingFee] = useState(50);
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [selectedShippingAddressId, setSelectedShippingAddressId] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]); // array of placed orders
    const [hasHydratedStorage, setHasHydratedStorage] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                setHasHydratedStorage(true);
                return;
            }

            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.cartItems)) {
                setCartItems(parsed.cartItems);
            }
            if (Array.isArray(parsed.shippingAddresses)) {
                setShippingAddresses(parsed.shippingAddresses);
            }
            if (typeof parsed.selectedShippingAddressId === "string" || parsed.selectedShippingAddressId === null) {
                setSelectedShippingAddressId(parsed.selectedShippingAddressId);
            }
            if (Array.isArray(parsed.orderHistory)) {
                setOrderHistory(parsed.orderHistory);
            }
        } catch {
            // Ignore corrupt storage and keep runtime defaults.
        } finally {
            setHasHydratedStorage(true);
        }
    }, []);

    useEffect(() => {
        if (!hasHydratedStorage) return;

        const snapshot = {
            cartItems,
            shippingAddresses,
            selectedShippingAddressId,
            orderHistory,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    }, [hasHydratedStorage, cartItems, shippingAddresses, selectedShippingAddressId, orderHistory]);

    useEffect(() => {
        if (!shippingAddresses.length) {
            if (selectedShippingAddressId !== null) {
                setSelectedShippingAddressId(null);
            }
            return;
        }

        const selectedExists = shippingAddresses.some(
            (address) => address.id === selectedShippingAddressId
        );
        if (!selectedExists) {
            setSelectedShippingAddressId(shippingAddresses[0].id);
        }
    }, [shippingAddresses, selectedShippingAddressId]);

    const shippingAddress = useMemo(
        () =>
            shippingAddresses.find((address) => address.id === selectedShippingAddressId) ||
            null,
        [shippingAddresses, selectedShippingAddressId]
    );

    const addShippingAddress = useCallback((address, options = {}) => {
        const { select = true } = options;
        const newAddress = {
            id: `ADDR-${Date.now().toString(36).toUpperCase()}-${Math.random()
                .toString(36)
                .slice(2, 7)
                .toUpperCase()}`,
            fullName: address.fullName?.trim() || "",
            email: address.email?.trim() || "",
            phone: address.phone?.trim() || "",
            pinCode: address.pinCode?.trim() || "",
            city: address.city?.trim() || "",
            state: address.state?.trim() || "",
            createdAt: new Date().toISOString(),
        };

        setShippingAddresses((prev) => [newAddress, ...prev]);
        if (select) {
            setSelectedShippingAddressId(newAddress.id);
        }
        return newAddress.id;
    }, []);

    const setShippingAddress = useCallback(
        (address) => addShippingAddress(address, { select: true }),
        [addShippingAddress]
    );

    const selectShippingAddress = useCallback((addressId) => {
        setSelectedShippingAddressId(addressId);
    }, []);

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
        if (!address) return null;
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
        setCartItems([]); // clear cart
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
                shippingAddresses,
                selectedShippingAddressId,
                setShippingAddress,
                addShippingAddress,
                selectShippingAddress,
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
