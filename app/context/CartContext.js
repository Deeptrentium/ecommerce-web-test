'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, qty = 1) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i =>
                    i.id === product.id ? { ...i, qty: i.qty + qty } : i
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                emoji: product.emoji,
                category: product.category,
                qty,
            }];
        });
    };

    const updateQty = (id, delta) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setCartItems([]);

    const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
}
