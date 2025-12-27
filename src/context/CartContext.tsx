'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
    id: string;
    title: string;
    type: 'tour' | 'experience' | 'activity' | 'service';
    price?: string;
    date?: string;
    guests?: number;
    image?: string;
    url?: string;
    quantity?: number;
}

// Helper to parse price string
export const parsePrice = (priceStr?: string): number => {
    if (!priceStr) return 0;
    // Extract first number found (handling potential "From $XX" or "$XX/day")
    const matches = priceStr.match(/(\d+)/);
    if (matches && matches[0]) {
        return parseInt(matches[0], 10);
    }
    return 0;
};

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, type: string) => void;
    updateItem: (id: string, type: string, updates: Partial<CartItem>) => void;
    reorderItems: (newOrder: CartItem[]) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    toggleCart: () => void;
    cartTotal: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'xhosen-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setItems(parsed);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isMounted) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
            } catch (error) {
                console.error('Error saving cart:', error);
            }
        }
    }, [items, isMounted]);

    const totalPrice = items.reduce((acc, item) => {
        const unitPrice = parsePrice(item.price);
        return acc + (unitPrice * (item.guests || 1));
    }, 0);

    const addItem = (newItem: CartItem) => {
        setItems((currentItems) => {
            // Check for duplicate based on ID and TYPE
            const exists = currentItems.some(
                (item) => item.id === newItem.id && item.type === newItem.type
            );

            if (exists) {
                // Already in cart, don't add again
                console.log('Item already in cart:', newItem.id, newItem.type);
                return currentItems;
            }

            // Add new item with default guests
            console.log('Adding item to cart:', newItem.id, newItem.type);
            return [...currentItems, { ...newItem, guests: newItem.guests || 1 }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string, type: string) => {
        setItems((currentItems) =>
            currentItems.filter((item) => !(item.id === id && item.type === type))
        );
    };

    const updateItem = (id: string, type: string, updates: Partial<CartItem>) => {
        setItems((currentItems) => {
            return currentItems.map((item) => {
                if (item.id === id && item.type === type) {
                    return { ...item, ...updates };
                }
                return item;
            });
        });
    };

    const reorderItems = (newOrder: CartItem[]) => {
        setItems(newOrder);
    };

    const clearCart = () => {
        setItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen((prev) => !prev);
    };

    // Prevent hydration mismatch
    if (!isMounted) {
        return (
            <CartContext.Provider
                value={{
                    items: [],
                    addItem: () => { },
                    removeItem: () => { },
                    updateItem: () => { },
                    reorderItems: () => { },
                    clearCart: () => { },
                    isCartOpen: false,
                    toggleCart: () => { },
                    cartTotal: 0,
                    totalPrice: 0,
                }}
            >
                {children}
            </CartContext.Provider>
        );
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateItem,
                reorderItems,
                clearCart,
                isCartOpen,
                toggleCart,
                cartTotal: items.length,
                totalPrice,
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
