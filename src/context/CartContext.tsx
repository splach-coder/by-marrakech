'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

export interface CartItem {
    id: string;
    title: string;
    type: 'tour' | 'experience' | 'activity' | 'service';
    price?: string; // e.g. "From €50"
    date?: string;
    guests?: number;
    image?: string;
    url?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    // Persist cart in local storage
    const [items, setItems] = useLocalStorage<CartItem[]>('bymarrakech-cart', []);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            const currentItems = prevItems || [];

            // Check for duplicate based on ID and Date
            const existingItemIndex = currentItems.findIndex(
                (item) => item.id === newItem.id && item.date === newItem.date
            );

            if (existingItemIndex > -1) {
                // Update existing item's guest count
                const updatedItems = [...currentItems];
                const existingItem = updatedItems[existingItemIndex];

                updatedItems[existingItemIndex] = {
                    ...existingItem,
                    guests: (existingItem.guests || 0) + (newItem.guests || 0)
                };

                return updatedItems;
            }

            // Add as new item
            // Ensure ID is preserved as the product ID, but if we needed a unique row ID we might need a separate field.
            // For now, ID + Date is logically unique enough for the cart's purpose.
            return [...currentItems, newItem];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => (prev || []).filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    // Prevent hydration mismatch by returning empty structure until mounted
    if (!isMounted) {
        return (
            <CartContext.Provider
                value={{
                    items: [],
                    addItem: () => { },
                    removeItem: () => { },
                    clearCart: () => { },
                    isCartOpen: false,
                    toggleCart: () => { },
                    cartTotal: 0,
                }}
            >
                {children}
            </CartContext.Provider>
        );
    }

    return (
        <CartContext.Provider
            value={{
                items: items || [],
                addItem,
                removeItem,
                clearCart,
                isCartOpen,
                toggleCart,
                cartTotal: (items || []).length,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
