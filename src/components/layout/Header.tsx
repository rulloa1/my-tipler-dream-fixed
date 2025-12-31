import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import mcLogo from "@/assets/mc-logo.png";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Design", path: "/design" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },

  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled
          ? "bg-charcoal/98 backdrop-blur-sm py-5 shadow-2xl"
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-8 lg:px-16 flex items-center justify-between">
        {/* Logo - Minimal */}
        <Link to="/" className="flex items-center group">
          <img
            src={mcLogo}
            alt="Michael Chandler"
            className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Desktop Navigation - Refined & Minimal */}
        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-cream transition-colors duration-300 text-[11px] tracking-[0.2em] uppercase font-light relative group flex items-center gap-2"
              >
                {link.name}
                {link.icon && <link.icon className="w-4 h-4" />}
                <span className="absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 w-0 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-cream/70 hover:text-cream transition-colors duration-300 text-[11px] tracking-[0.2em] uppercase font-light relative group",
                  location.pathname === link.path && "text-cream"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500",
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            )
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-cream/80 hover:text-cream p-2 transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu - Elegant Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-charcoal flex flex-col p-12 lg:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <img src={mcLogo} alt="" className="h-8 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 border border-white/10 flex items-center justify-center text-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl font-serif tracking-tight transition-colors text-cream hover:text-primary flex items-center gap-3"
                    >
                      {link.name}
                      {link.icon && <link.icon className="w-6 h-6" />}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-4xl font-serif tracking-tight transition-colors",
                        location.pathname === link.path ? "text-primary italic" : "text-cream hover:text-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto space-y-6 pt-12 border-t border-white/5">
              <p className="text-[10px] tracking-widest text-primary uppercase font-bold">Inquiry</p>
              <a href="tel:+14352377373" className="block text-xl text-cream font-light">(435) 237-7373</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;