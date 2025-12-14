'use client';

import { motion } from 'framer-motion';

interface RouteMapDrawingProps {
    stops?: string[];
}

export default function RouteMapDrawing({ stops = [] }: RouteMapDrawingProps) {
    // Default stops if none provided
    const displayStops = stops.length > 0 ? stops : ["Start", "Point A", "Point B", "End"];
    const totalStops = displayStops.length;

    return (
        <div className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden relative shadow-sm">
            {/* Minimal Header */}
            <div className="absolute top-4 left-4 z-10">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
                    <span className="text-[10px] font-bold tracking-widest text-gray-900 uppercase">Route</span>
                </div>
            </div>

            {/* Journey Visualization */}
            <div className="w-full h-[400px] flex items-center justify-center p-8">
                <div className="relative w-full max-w-4xl h-[200px]">
                    {/* The Clean Path */}
                    <svg
                        className="absolute inset-0 w-full h-full overflow-visible"
                        viewBox="0 0 800 200"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 50 100 Q 200 50, 400 100 T 750 100"
                            stroke="#111827" // gray-900
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Dynamic Points along the path */}
                        {displayStops.map((stop, index) => {
                            // Calculate approximate position along the bezier curve
                            // Simple linear interpolation for x, curve approximation for y
                            // Curve is M50,100 -> Q200,50 -> 400,100 -> T750,100
                            // Let's create specific points for cleaner look if count is low, or dynamic calculation

                            // Simple mapping for visual demo:
                            const percent = index / (totalStops - 1);
                            const x = 50 + (700 * percent);

                            // Rough y approximation for the wave:
                            // normalized -1 to 1 based on x
                            // This matches the D path somewhat loosely
                            let y = 100;
                            if (percent > 0.1 && percent < 0.9) {
                                y = 100 + (Math.sin(percent * Math.PI * 2) * -30);
                            }

                            return (
                                <g key={index} transform={`translate(${x}, ${y})`}>

                                    {/* Line connecting point to label */}
                                    <motion.line
                                        initial={{ opacity: 0, y2: 0 }}
                                        whileInView={{ opacity: 1, y2: index % 2 === 0 ? 40 : -40 }}
                                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.4 }}
                                        x1="0" y1={index % 2 === 0 ? 15 : -15}
                                        x2="0" y2={index % 2 === 0 ? 40 : -40}
                                        stroke="#E5E7EB"
                                        strokeWidth="1"
                                    />

                                    {/* Stop Dot */}
                                    <motion.circle
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: 0.3 + (index * 0.1) }}
                                        cx="0" cy="0" r="4"
                                        fill="#FBBF24" // amber-400
                                        stroke="white"
                                        strokeWidth="2"
                                    />

                                    {/* Label Card */}
                                    <motion.foreignObject
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + (index * 0.1) }}
                                        x="-60"
                                        y={index % 2 === 0 ? 45 : -85}
                                        width="120"
                                        height="50"
                                        style={{ overflow: 'visible' }}
                                    >
                                        <div className={`flex flex-col items-center justify-center text-center ${index % 2 === 0 ? 'pt-0' : 'pb-0'}`}>
                                            <div className="bg-white border border-gray-100 shadow-sm px-3 py-1.5 rounded-lg">
                                                <div className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">
                                                    {index === 0 ? 'Start' : index === totalStops - 1 ? 'End' : `Stop ${index + 1}`}
                                                </div>
                                                <div className="text-xs font-bold text-gray-900 whitespace-nowrap">{stop}</div>
                                            </div>
                                        </div>
                                    </motion.foreignObject>
                                </g>
                            )
                        })}
                    </svg>
                </div>
            </div>
        </div>
    );
}
