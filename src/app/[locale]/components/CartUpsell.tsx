'use client';

import { useCart } from '@/context/CartContext';
import { Car } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartUpsell() {
    const { items, addItem } = useCart();

    // Check if cart has items but NO 'service' type items
    const hasItems = items.length > 0;
    const hasService = items.some(item => item.type === 'service');
    const shouldShow = hasItems && !hasService;

    if (!shouldShow) return null;

    const handleAddTransfer = () => {
        addItem({
            id: 'upsell-transfer',
            title: 'Private Airport Transfer / Driver',
            type: 'service',
            price: 'On Request',
            image: '/images/services/luxury_driver_service.png', // Fallback or generic
            guests: 2 // Default assumption, editable later
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mx-6 mb-4 bg-gradient-to-r from-stone-50 to-amber-50 rounded-xl border border-amber-100"
        >
            <div className="flex gap-4">
                <div className="bg-white p-2 rounded-lg h-fit shadow-sm text-primary">
                    <Car className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Need a Ride?</h4>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                        Add a private driver or airport transfer to complete your smooth arrival.
                    </p>
                    <button
                        onClick={handleAddTransfer}
                        className="text-xs font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                        + Add Transfer Service
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
