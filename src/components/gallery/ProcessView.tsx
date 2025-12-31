import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessViewProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
}

export const ProcessView = ({
    beforeImage,
    afterImage,
    beforeLabel = "Concept Sketch",
    afterLabel = "Realized Project",
    className,
}: ProcessViewProps) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    // Handle resizing to ensure the clipped image stays correct width
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        observer.observe(containerRef.current);
        
        // Initial set
        setContainerWidth(containerRef.current.offsetWidth);

        return () => observer.disconnect();
    }, []);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        handleMove(e.clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        handleMove(e.touches[0].clientX);
    };

    const startDrag = () => {
        isDragging.current = true;
    };

    const stopDrag = () => {
        isDragging.current = false;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            setSliderPosition((prev) => Math.max(0, prev - 5));
        } else if (e.key === "ArrowRight") {
            setSliderPosition((prev) => Math.min(100, prev + 5));
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden select-none cursor-col-resize touch-none rounded-lg shadow-2xl bg-charcoal group focus:outline-none focus:ring-2 focus:ring-gold/50 border border-white/10",
                className
            )}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            onMouseUp={stopDrag}
            onTouchEnd={stopDrag}
            onMouseLeave={stopDrag}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Compare before and after images"
        >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
                <img
                    src={afterImage}
                    alt={afterLabel}
                    className="w-full h-full object-cover"
                    draggable={false}
                />
                <div className="absolute top-6 right-6 bg-charcoal/80 backdrop-blur-sm px-4 py-2 border border-white/10 rounded-sm z-10">
                    <span className="text-xs tracking-[0.2em] font-bold text-cream uppercase">{afterLabel}</span>
                </div>
            </div>

            {/* Before Image (Foreground - Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="absolute top-0 left-0 h-full max-w-none object-cover"
                    style={{ width: containerWidth || "100%" }} 
                    draggable={false}
                />
                <div className="absolute top-6 left-6 bg-gold/90 backdrop-blur-md px-5 py-2 border border-white/10 rounded-full z-10 shadow-lg">
                    <span className="text-xs tracking-[0.2em] font-bold text-charcoal uppercase">{beforeLabel}</span>
                </div>

                {/* Dark overlay on sketch for mood */}
                <div className="absolute inset-0 bg-sepia/20 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 flex items-center justify-center group"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] border-4 border-gold transition-transform group-hover:scale-110">
                    <GripVertical className="w-5 h-5 text-gold" />
                </div>
                <div className="absolute top-0 bottom-0 w-8 bg-white/0 group-hover:bg-white/10 transition-colors -translate-x-1/2 left-1/2" />
            </div>

            {/* Interaction Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal/60 backdrop-blur-md px-4 py-2 rounded-full pointer-events-none"
            >
                <p className="text-[10px] tracking-widest text-white/70 uppercase">Drag to Compare</p>
            </motion.div>
        </div>
    );
};
