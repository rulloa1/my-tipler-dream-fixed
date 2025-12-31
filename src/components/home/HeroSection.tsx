import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumButton } from "@/components/ui/PremiumButton";
import roysLogo from "@/assets/royscompany-logo.png";

const heroImages = [
  "/projects/S. Florida High Rise Luxe/Miami001 COVER.jpg",
  "/projects/High Alpine Mtn. Ranch/High001 COVER.JPG",
  "/design/southcoast-kitchen/36 AFTER.JPG",
  "/projects/hospitality-pool-cover.jpg"
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <section className="relative h-screen overflow-hidden bg-charcoal">
      {/* Background Images with Zoom Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentSlide]}
            alt="Luxury architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-5xl flex flex-col items-center"
        >
          <p className="text-primary tracking-[0.5em] uppercase text-xs mb-6 font-semibold">Master Builder & Designer</p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-cream mb-8 tracking-tighter leading-[0.95] md:leading-[0.9]">
            Michael <br />
            <span className="italic font-light">Chandler</span>
          </h1>

          <div className="w-24 h-[1px] bg-gold mx-auto mb-12 opacity-50" />

          {/* Refined Stats Container */}
          <div className="grid grid-cols-2 gap-12 md:gap-32 mb-12 max-w-2xl mx-auto">
            <div className="text-center group">
              <span className="block text-5xl md:text-7xl font-light text-primary leading-none mb-3 group-hover:scale-110 transition-transform duration-500">
                19
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-cream/60 uppercase font-medium">
                Signature Projects
              </span>
            </div>
            <div className="text-center group">
              <span className="block text-5xl md:text-7xl font-light text-primary leading-none mb-3 group-hover:scale-110 transition-transform duration-500">
                37
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-cream/60 uppercase font-medium">
                Years of Legacy
              </span>
            </div>
          </div>

          {/* Partner Badge */}
          <motion.a
            href="https://royscompany.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-12 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[10px] tracking-widest text-cream/60 uppercase">Partner of</span>
            <img src={roysLogo} alt="RoysCompany" className="h-5 w-auto opacity-80" />
          </motion.a>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/portfolio">
              <PremiumButton size="lg" className="bg-primary text-charcoal hover:bg-gold-dark px-12 py-8 min-w-[240px]">
                Explore Portfolio
              </PremiumButton>
            </Link>
            <Link to="/contact">
              <PremiumButton
                size="lg"
                variant="outline"
                className="border-cream/20 bg-white/5 backdrop-blur-md text-cream hover:bg-cream hover:text-charcoal px-12 py-8 min-w-[240px]"
              >
                Start Inquiry
                <ArrowRight className="w-4 h-4 ml-3" />
              </PremiumButton>
            </Link>
            <a href="https://t.me/royAIsolutionsBot" target="_blank" rel="noopener noreferrer">
              <PremiumButton
                size="lg"
                variant="outline"
                className="border-cream/20 bg-white/5 backdrop-blur-md text-cream hover:bg-cream hover:text-charcoal px-12 py-8 min-w-[240px]"
              >
                Chat with AI
                <MessageCircle className="w-4 h-4 ml-3" />
              </PremiumButton>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Slide Navigation - Refined Dots */}
      <div className="absolute bottom-12 left-12 z-30 hidden md:flex flex-col gap-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group flex items-center gap-4"
          >
            <div className={`h-[1px] transition-all duration-500 ${index === currentSlide ? "w-12 bg-primary" : "w-6 bg-cream/20 group-hover:w-12 group-hover:bg-cream/40"}`} />
            <span className={`text-[10px] tracking-widest transition-opacity duration-500 ${index === currentSlide ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-100 text-cream/40"}`}>
              0{index + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Arrow Controls - Minimal */}
      <div className="absolute bottom-12 right-12 z-30 flex gap-4">
        <button
          onClick={prevSlide}
          className="w-14 h-14 border border-white/10 flex items-center justify-center text-cream/40 hover:text-primary hover:border-primary transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 border border-white/10 flex items-center justify-center text-cream/40 hover:text-primary hover:border-primary transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent mx-auto opacity-50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
