import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoAnim from "@/assets/logo-animation.mp4";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Fallback timer in case video fails or is too long
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for fade out animation
        }, 4500); // 4.5 seconds max

        return () => clearTimeout(timer);
    }, [onComplete]);

    const handleVideoEnd = () => {
        setIsVisible(false);
        setTimeout(onComplete, 500);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center overflow-hidden"
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnd}
                        className="max-w-md w-full h-auto opacity-80"
                    >
                        <source src={logoAnim} type="video/mp4" />
                    </video>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
