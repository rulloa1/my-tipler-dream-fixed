import { Link } from "react-router-dom";
import { Phone, MapPin, Facebook, Instagram, Linkedin, ArrowUpRight, Send } from "lucide-react";
import mcLogo from "@/assets/mc-logo.png";
import roysLogo from "@/assets/royscompany-logo.png";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Send, href: "https://t.me/royAIsolutionsBot" }
  ];

  return (
    <footer className="bg-charcoal text-cream pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background number */}
      <div className="absolute -bottom-10 -right-10 text-[20rem] font-serif text-white/5 pointer-events-none select-none leading-none flex items-end">
        MC
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-12 mb-20">

          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="inline-block group">
              <img
                src={mcLogo}
                alt="Michael Chandler Logo"
                className="h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-xl font-serif text-cream/80 max-w-md leading-relaxed">
              Crafting legacy environments through 37 years of <span className="text-primary italic">uncompromising</span> design and master building.
            </p>
            <div className="flex gap-5">
              {socialLinks.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.href} 
                  target={item.icon === Send ? "_blank" : "_self"}
                  rel={item.icon === Send ? "noopener noreferrer" : ""}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-charcoal transition-all duration-500"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold">Studio</h4>
              <nav className="flex flex-col gap-4">
                {["Home", "Portfolio", "Design", "Services", "Contact"].map((item) => (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-cream/50 hover:text-primary transition-colors text-sm flex items-center group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold">Inquiries</h4>
              <div className="space-y-4">
                <a href="tel:+14352377373" className="block group">
                  <p className="text-[10px] text-cream/30 uppercase tracking-widest mb-1">Direct Line</p>
                  <p className="text-sm group-hover:text-primary transition-colors">(435) 237-7373</p>
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold">Location</h4>
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <p className="text-sm text-cream/50 leading-relaxed font-light">
                  8215 Winding Hill Ln<br />
                  Spring, TX 77379<br />
                  <span className="text-[10px] text-cream/30 mt-2 block">Available Worldwide</span>
                </p>
              </div>
              <Link to="/admin/gallery" className="inline-block mt-4 text-[10px] tracking-widest uppercase text-cream/20 hover:text-primary transition-colors">
                Internal Portal Registry →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <Link to="/privacy" className="text-[10px] tracking-widest uppercase text-cream/30 hover:text-cream transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[10px] tracking-widest uppercase text-cream/30 hover:text-cream transition-colors">Terms</Link>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[10px] tracking-[0.2em] uppercase text-cream/30">
              © {currentYear} Michael Chandler Design <span className="mx-2">|</span> Built for Legacy
            </p>
            <div className="flex items-center gap-2 text-[10px] text-cream/30">
              <span>RoyalSolutions.me is a proud affiliate of</span>
              <a href="https://royscompany.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={roysLogo} alt="RoysCompany" className="h-4 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
