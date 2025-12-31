import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
const CTASection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return <section ref={ref} className="relative py-32 overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="/projects/development-civil/development (1).jpg"
        alt="Construction Development"
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-charcoal/80" />
    </div>

    <div className="container mx-auto px-6 relative z-10 text-center">
      <div className={cn("max-w-3xl mx-auto transition-all duration-700", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-cream mb-6 leading-tight">
          Ready to Build Your Dream Home?
        </h2>
        <p className="text-cream/80 text-lg md:text-xl mb-10 leading-relaxed">
          Let's discuss your vision and create something extraordinary together. I'm ready to bring your ideas to life with unparalleled craftsmanship and attention to detail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button size="lg" className="bg-gold text-charcoal hover:bg-white px-10 py-6 text-sm tracking-widest uppercase font-bold transition-all duration-300">
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button size="lg" variant="outline" className="border-cream text-cream hover:bg-cream hover:text-charcoal px-10 py-6 text-sm tracking-widest uppercase font-bold transition-all duration-300">
              View My Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>;
};
export default CTASection;