import { Award, Clock, Users, Building2 } from "lucide-react";
import mikeProfile from "@/assets/mike-profile.jpeg";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [{
  icon: Clock,
  value: "37+",
  label: "Years Experience"
}, {
  icon: Building2,
  value: "500+",
  label: "Projects Completed"
}, {
  icon: Users,
  value: "100%",
  label: "Client Satisfaction"
}, {
  icon: Award,
  value: "25+",
  label: "Awards Won"
}];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    ref: animationRef,
    isVisible
  } = useScrollAnimation();
  const {
    ref: statsRef,
    isVisible: statsVisible
  } = useScrollAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -20 : -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 20 : 50]);

  return <section ref={containerRef} className="py-32 bg-cream relative overflow-hidden">
    {/* Decorative background element */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-charcoal/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

    <div className="container mx-auto px-6 relative z-10">
      <div ref={animationRef} className="grid lg:grid-cols-2 gap-20 items-center">
        {/* Content */}
        <div className={cn("transition-all duration-1000", isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12")}>
          <div className="inline-block py-1 px-4 border border-gold/30 bg-gold/5 rounded-full mb-6">
            <p className="text-gold tracking-[0.3em] uppercase text-[10px] font-medium">Established 1987</p>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif text-charcoal mb-8 leading-tight">
            A Legacy of <br />
            <span className="text-primary italic">Craftsmanship</span>
          </h2>

          <div className="w-24 h-[1px] bg-gold mb-12" />

          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground font-light max-w-xl">
            <p>Through my experience of 37 years as a Business, Design, and Construction professional, I have found that exceptional results come from exceptional teams.</p>
            <p>My approach is simple: bring together the right people, create an environment built on mutual respect, and stay closely attuned to client feedback throughout every phase of a project.</p>
            <p>I've built my career on the universal business principle that quality construction isn't just about meeting standards—it's about exceeding them, by combining rigorous processes with forward-thinking design.</p>
          </div>

          <div className="mt-12 flex items-center gap-6 p-6 bg-white/50 backdrop-blur-sm border border-gold/10 rounded-2xl shadow-sm w-fit">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary shadow-lg">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                src={mikeProfile}
                alt="Michael Chandler"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-charcoal text-2xl tracking-tight">Michael Chandler</p>
              <p className="text-primary font-medium tracking-widest text-xs uppercase mt-1">Founder & Master Builder</p>
            </div>
          </div>
        </div>

        {/* Image Grid with Parallax */}
        <div className="grid grid-cols-2 gap-6 relative">
          <motion.div style={{ y: y1 }} className="space-y-6">
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <img src="/projects/S. Florida High Rise Luxe/Miami001 COVER.jpg" alt="S. Florida High Rise Luxe Condo" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
              <img src="/projects/High Alpine Mtn. Ranch/High001 COVER.JPG" alt="High Alpine Ranch Montana" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
          </motion.div>
          <motion.div style={{ y: y2 }} className="space-y-6 pt-16">
            <div className="aspect-square overflow-hidden rounded-sm shadow-2xl">
              <img src="/design/southcoast-kitchen/36 AFTER.JPG" alt="South Coast Renovation Big Sur" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <img src="/projects/hospitality-pool-cover.jpg" alt="Ultra Luxe Private Club Pool" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section with improved styling */}
      <div ref={statsRef} className="mt-32 pt-20 border-t border-gold/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16">
          {stats.map((stat, index) => <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={statsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="text-center group"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md group-hover:bg-gold/5 transition-all duration-300">
              <stat.icon className="w-8 h-8 text-primary" />
            </div>
            <p className="text-5xl font-serif text-charcoal mb-2">{stat.value}</p>
            <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-medium">{stat.label}</p>
          </motion.div>)}
        </div>
      </div>
    </div>
  </section>;
};

export default AboutSection;