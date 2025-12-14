'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    MapPin,
    ChevronDown,
    Calendar,
    Map as MapIcon,
    List,
    Info,
    Coffee,
    Camera,
    Moon,
    Sun,
    Flag
} from 'lucide-react';

import RouteMapDrawing from './RouteMapDrawing';

// Types adapted from siteData
export type ItineraryStep = {
    time?: string;
    title: string;
    description: string;
    location?: string;
    highlights?: string[];
};

export type DayItinerary = {
    day: number;
    title: string;
    location?: string;
    description: string;
    highlights?: string[];
    steps?: ItineraryStep[];
};

interface ItineraryProps {
    days?: DayItinerary[];
    steps?: ItineraryStep[];
    title?: string;
    defaultView?: 'timeline' | 'map';
}

export default function Itinerary({ days, steps, title = "Itinerary", defaultView = 'timeline' }: ItineraryProps) {
    const [viewMode, setViewMode] = useState<'timeline' | 'map'>(defaultView);
    const [expandedDn, setExpandedDn] = useState<string | null>(null); // dayIndex-stepIndex

    // Normalize data into DayGroups
    const normalizedData = NormalizeData(days, steps);

    const toggleExpand = (id: string) => {
        setExpandedDn(expandedDn === id ? null : id);
    };

    // Extract all unique locations/titles from all itinerary items for the map
    const allStops: string[] = [];
    normalizedData.forEach(day => {
        day.items.forEach(item => {
            const stopName = item.location || item.title;
            if (stopName && !allStops.includes(stopName)) {
                allStops.push(stopName);
            }
        });
    });
    const mapStops = allStops.slice(0, 8); // Limit to 8 stops for visual clarity

    return (
        <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
            {/* Creative Header */}
            <div className="relative p-1">
                <div className="absolute inset-0 bg-stone-50/50" />
                <div className="relative flex items-center justify-between p-6 z-10">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-3">
                            {title}
                            {viewMode === 'map' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 animate-pulse">
                                    Exploration Mode
                                </span>
                            )}
                        </h3>
                    </div>

                    {/* Floating Tab Interaction */}
                    <div className="relative flex bg-gray-200/50 p-1.5 rounded-full overflow-hidden backdrop-blur-sm">
                        {/* Sliding Background */}
                        <div
                            className={`absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm transition-all duration-300 ease-spring ${viewMode === 'timeline' ? 'left-1.5 w-[calc(50%-4px)]' : 'left-[50%] w-[calc(50%-4px)]'
                                }`}
                        />

                        <button
                            onClick={() => setViewMode('timeline')}
                            className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors ${viewMode === 'timeline' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            <span>Timeline</span>
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`relative z-10 flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-colors ${viewMode === 'map' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <MapIcon className="w-4 h-4" />
                            <span>Map View</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Display */}
            <div className="p-8 bg-white min-h-[400px]">
                {viewMode === 'map' ? (
                    <div className="relative group">
                        {/* Decorative corners for Map */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-300 rounded-tl-lg z-20" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-300 rounded-tr-lg z-20" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-300 rounded-bl-lg z-20" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-300 rounded-br-lg z-20" />

                        <div className="rounded-xl overflow-hidden border-4 border-stone-100 shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-700 origin-bottom">
                            <RouteMapDrawing
                                stops={mapStops}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {normalizedData.map((day, dayIdx) => (
                            <div key={`day-${dayIdx}`} className="relative">
                                {/* Day Header (only if multiple days) */}
                                {normalizedData.length > 1 && (
                                    <div className="flex items-center gap-4 mb-6 sticky top-0 bg-white/95 backdrop-blur-sm z-20 py-2">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                            <Calendar className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-primary tracking-wider uppercase mb-0.5">
                                                Day {day.dayNumber}
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900">{day.title}</h4>
                                        </div>
                                    </div>
                                )}

                                {/* Timeline Line */}
                                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-100 hidden md:block" />

                                <div className="space-y-4">
                                    {day.items.map((item, itemIdx) => {
                                        const itemId = `${dayIdx}-${itemIdx}`;
                                        const isExpanded = expandedDn === itemId;
                                        const Icon = GetIconForTitle(item.title);

                                        return (
                                            <motion.div
                                                key={itemId}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                className="relative group md:pl-16"
                                            >
                                                {/* Desktop Timeline Node */}
                                                <div className="absolute left-3.5 top-6 w-5 h-5 -ml-px hidden md:flex items-center justify-center z-10">
                                                    <div className="w-3 h-3 rounded-full bg-gray-300 group-hover:bg-primary transition-colors ring-4 ring-white" />
                                                </div>

                                                <div
                                                    className={`
                                                        rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                                                        ${isExpanded
                                                            ? 'bg-white border-primary/30 shadow-lg ring-1 ring-primary/10'
                                                            : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
                                                        }
                                                    `}
                                                    onClick={() => toggleExpand(itemId)}
                                                >
                                                    {/* Card Header (Compact View) */}
                                                    <div className="p-4 md:p-5 flex gap-4 items-start">
                                                        {/* Icon Box */}
                                                        <div className={`
                                                            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                                                            ${isExpanded ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}
                                                        `}>
                                                            <Icon className="w-6 h-6" />
                                                        </div>

                                                        <div className="flex-grow min-w-0 pt-1">
                                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                                                                <h5 className="font-bold text-gray-900 truncate pr-2">
                                                                    {item.title}
                                                                </h5>
                                                                {item.time && (
                                                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-md self-start md:self-auto">
                                                                        <Clock className="w-3.5 h-3.5" />
                                                                        {item.time}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="text-gray-500 text-sm line-clamp-1 group-hover:text-gray-700">
                                                                {item.description}
                                                            </div>
                                                        </div>

                                                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 mt-2 ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                                                    </div>

                                                    {/* Expanded Content */}
                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <div className="px-5 pb-5 pt-0 border-t border-gray-50 mt-2">
                                                                    <div className="pt-4 space-y-4">
                                                                        <p className="text-gray-600 leading-relaxed">
                                                                            {item.description}
                                                                        </p>

                                                                        {item.highlights && item.highlights.length > 0 && (
                                                                            <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100/50">
                                                                                <div className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                                                                    <Flag className="w-3.5 h-3.5" /> Highlights
                                                                                </div>
                                                                                <ul className="space-y-1.5">
                                                                                    {item.highlights.map((h, i) => (
                                                                                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                                                            <span className="block w-1 h-1 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                                                                                            {h}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}

                                                                        {item.location && (
                                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                                <MapPin className="w-4 h-4" />
                                                                                <span>{item.location}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper to normalize content
function NormalizeData(days?: DayItinerary[], steps?: ItineraryStep[]) {
    if (days && days.length > 0) {
        return days.map((d, i) => ({
            dayNumber: i + 1,
            title: d.title || `Day ${i + 1}`,
            items: d.steps || [{
                title: d.title,
                description: d.description,
                time: undefined,
                location: d.location,
                highlights: d.highlights
            }]
        }));
    }

    if (steps && steps.length > 0) {
        // Try to group by "Day X" titles
        const hasDayStructure = steps.some(s => s.title.match(/^Day \d+:/i));

        if (hasDayStructure) {
            const groups: { dayNumber: number; title: string; items: ItineraryStep[] }[] = [];
            let currentDay = 0;

            steps.forEach(step => {
                const dayMatch = step.title.match(/^Day (\d+):?(.*)/i);
                if (dayMatch) {
                    currentDay = parseInt(dayMatch[1]);
                    groups.push({
                        dayNumber: currentDay,
                        title: dayMatch[2].trim() || `Day ${currentDay}`,
                        items: [{ ...step, title: dayMatch[2].trim() || step.title }]
                    });
                } else if (currentDay > 0) {
                    // Append to last day
                    groups[groups.length - 1].items.push(step);
                } else {
                    // No day start yet? put in day 1
                    if (groups.length === 0) groups.push({ dayNumber: 1, title: "Itinerary", items: [] });
                    groups[0].items.push(step);
                }
            });
            return groups;
        }

        // Flat list treated as single day
        return [{
            dayNumber: 1,
            title: "Full Schedule",
            items: steps
        }];
    }

    return [];
}

function GetIconForTitle(title: string) {
    const lower = title.toLowerCase();
    if (lower.includes('breakfast')) return Coffee;
    if (lower.includes('lunch') || lower.includes('dinner') || lower.includes('meal')) return Coffee;
    if (lower.includes('hotel') || lower.includes('night') || lower.includes('arrival')) return Moon;
    if (lower.includes('departure') || lower.includes('return') || lower.includes('pick up')) return Flag;
    if (lower.includes('photo') || lower.includes('view') || lower.includes('stop')) return Camera;
    if (lower.includes('visit') || lower.includes('explore')) return MapPin;
    if (lower.includes('morning') || lower.includes('sunrise')) return Sun;
    return Info;
}
