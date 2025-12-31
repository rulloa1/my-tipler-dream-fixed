import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

export interface PremiumButtonProps extends ButtonProps {
    magnetic?: boolean;
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
    ({ className, children, magnetic = true, ...props }, ref) => {
        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        const springConfig = { damping: 20, stiffness: 150 };
        const springX = useSpring(mouseX, springConfig);
        const springY = useSpring(mouseY, springConfig);

        const moveX = useTransform(springX, (v) => (magnetic ? v * 15 : 0));
        const moveY = useTransform(springY, (v) => (magnetic ? v * 15 : 0));

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };

        const handleMouseLeave = () => {
            mouseX.set(0);
            mouseY.set(0);
        };

        return (
            <motion.div
                style={{ x: moveX, y: moveY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="inline-block"
            >
                <Button
                    ref={ref}
                    className={cn(
                        "premium-shimmer relative tracking-widest font-bold uppercase overflow-hidden",
                        className
                    )}
                    {...props}
                >
                    <motion.span
                        initial={{ y: 0 }}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                    >
                        {children}
                    </motion.span>
                </Button>
            </motion.div>
        );
    }
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };
