import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Compass, PenTool, HardHat, ClipboardCheck, Shield, Leaf, ArrowRight, CheckCircle, Building2, LandPlot, Users, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { useRef } from "react";
import { developmentConcepts } from "@/data/developmentConcepts";

const services = [
  { icon: Compass, title: "Planning", description: "Comprehensive site analysis, zoning research, and project feasibility studies.", features: ["Site Analysis", "Zoning Research", "Budget Planning", "Timeline Development"] },
  { icon: PenTool, title: "Design", description: "Custom architectural design reflecting your unique style and vision.", features: ["Architectural Design", "Interior Design", "3D Visualization", "Material Selection"] },
  { icon: HardHat, title: "Construction", description: "Expert construction with skilled craftsmen and premium materials.", features: ["Foundation Work", "Structural Framing", "Roofing & Siding", "Interior Finishing"] },
  { icon: ClipboardCheck, title: "Project Management", description: "Seamless coordination keeping timelines and budgets on track.", features: ["Vendor Coordination", "Schedule Management", "Budget Tracking", "Progress Reports"] },
  { icon: Shield, title: "Quality Assurance", description: "Rigorous quality control at every stage for exceptional results.", features: ["Regular Inspections", "Code Compliance", "Material Testing", "Final Walkthrough"] },
  { icon: Leaf, title: "Sustainability", description: "Eco-friendly practices and energy-efficient solutions.", features: ["Energy Efficiency", "Sustainable Materials", "Solar Integration", "Water Conservation"] },
];

const Services = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center bg-charcoal overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop')] bg-cover bg-center opacity-20 transform scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-cream" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold tracking-[0.3em] uppercase text-sm mb-6 font-light">Comprehensive Expertise</p>
            <h1 className="text-5xl md:text-7xl font-serif text-cream mb-8 font-light">
              Our Services
            </h1>
            <div className="w-24 h-[1px] bg-gold/50 mx-auto mb-8" />
            <p className="text-cream/80 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              From initial concept to final touches, we provide a seamless, integrated approach to creating exceptional environments.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Services Grid */}
      <section className="py-24 bg-cream relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-gold text-xs tracking-[0.2em] uppercase block mb-4">What We Do</span>
            <h2 className="text-4xl font-serif text-charcoal font-light">Core Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white p-10 shadow-sm border border-border/50 hover:border-gold/30 hover:shadow-md transition-all duration-500"
              >
                <div className="w-14 h-14 bg-cream flex items-center justify-center rounded-full mb-8 group-hover:bg-charcoal transition-colors duration-500 border border-border">
                  <service.icon className="w-6 h-6 text-charcoal group-hover:text-gold transition-colors duration-500" />
                </div>

                <h3 className="text-2xl font-serif text-charcoal mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-8 font-light leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground/80 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Concepts Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-gold text-xs tracking-[0.2em] uppercase block mb-4">Capabilities</span>
              <h2 className="text-4xl font-serif text-charcoal font-light">Development Expertise</h2>
            </div>
            <p className="text-muted-foreground max-w-md font-light text-sm">
              Beyond construction, we offer strategic insight into land development and community planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentConcepts.map((concept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 border border-border hover:border-gold/40 transition-all duration-300 group"
              >
                <div className="mb-6">
                  {index === 0 && <LandPlot className="w-8 h-8 text-charcoal/50 group-hover:text-gold transition-colors" />}
                  {index === 1 && <Home className="w-8 h-8 text-charcoal/50 group-hover:text-gold transition-colors" />}
                  {index === 2 && <Building2 className="w-8 h-8 text-charcoal/50 group-hover:text-gold transition-colors" />}
                  {index === 3 && <Users className="w-8 h-8 text-charcoal/50 group-hover:text-gold transition-colors" />}
                </div>

                <h3 className="text-xl font-serif text-charcoal mb-4 group-hover:text-gold transition-colors">
                  {concept.title}
                </h3>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {concept.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider bg-secondary px-2 py-1 text-muted-foreground group-hover:bg-gold/10 group-hover:text-charcoal transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process/CTA Section */}
      <section className="py-32 bg-charcoal text-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-charcoal-light/10 -skew-x-12 transform translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-8">
              Let's Build specific to your vision.
            </h2>
            <p className="text-cream/60 max-w-2xl mx-auto mb-12 font-light text-lg">
              Whether it's a custom home, a commercial development, or a luxury renovation, we bring 37 years of experience to every project.
            </p>

            <Link to="/contact">
              <PremiumButton
                size="lg"
                className="bg-gold text-charcoal hover:bg-cream hover:text-charcoal transition-all text-xs tracking-[0.2em] uppercase px-10 py-6 min-w-[240px]"
              >
                Start Consultation
              </PremiumButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
