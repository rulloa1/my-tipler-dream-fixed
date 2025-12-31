import Layout from "@/components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import timberBeamsImg from "@/assets/detail-timber-beams.jpg";
import spaVanityImg from "@/assets/detail-spa-vanity.jpg";
import marbleBathImg from "@/assets/detail-marble-bath.jpg";
import proRangeImg from "@/assets/detail-pro-range.jpg";
import limestoneFireplaceImg from "@/assets/detail-limestone-fireplace.jpg";
import leatherCabinetryImg from "@/assets/detail-leather-cabinetry.jpg";
import { designAlbums } from "@/data/design-albums";

const Design = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col lg:flex-row">
        {/* Left - Hero Image */}
        <div className="relative flex-1 bg-charcoal flex items-center justify-center overflow-hidden min-h-[50vh] lg:min-h-screen">
          <motion.div
            className="absolute inset-0"
            style={{ y: backgroundY, scale: backgroundScale }}
          >
            <img
              src={timberBeamsImg}
              alt="Architecture Detail"
              className="h-full w-full object-cover opacity-80"
            />
          </motion.div>
          <div className="absolute inset-0 bg-charcoal/20" />

          {/* Vertical Side Text */}
          <div className="absolute bottom-12 left-12 hidden lg:block z-20">
            <p className="text-[10px] tracking-[0.35em] text-cream/80 font-light uppercase" style={{ writingMode: 'vertical-rl' }}>
              Est. 1987
            </p>
          </div>
        </div>

        {/* Right - Content */}
        <div className="relative flex-1 bg-background flex flex-col justify-center px-8 lg:px-24 py-16 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Michael Chandler</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-light text-foreground mb-8 leading-tight">
              Design<br />
              <span className="text-muted-foreground">Build</span><br />
              Develop
            </h1>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mb-12 font-light">
              37 years of creating exceptional residential environments through thoughtful design and meticulous craftsmanship.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/portfolio">
                <Button className="bg-charcoal text-cream hover:bg-gold hover:text-charcoal transition-all text-xs tracking-[0.2em] uppercase px-8 py-6 rounded-none">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Vertical PORTFOLIO text */}
          <div className="absolute top-0 right-0 h-full w-24 border-l border-border hidden lg:flex items-center justify-center">
            <p className="text-[10px] tracking-[0.4em] text-muted-foreground/30 font-light uppercase rotate-90 whitespace-nowrap">
              Portfolio
            </p>
          </div>
        </div>
      </section>

      {/* 01 DESIGN CONCEPTS */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Large Background Number */}
        <div className="absolute top-0 left-0 text-[20rem] font-serif text-muted/20 -translate-y-1/4 -translate-x-1/4 select-none pointer-events-none">
          01
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-gold text-xs tracking-[0.2em] uppercase block mb-4">01 Design Concepts</span>
              <h2 className="text-4xl font-serif font-light text-foreground">Mood Board</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-md font-light">
              Texture, light, and material warmth form the foundation of our aesthetic language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { img: spaVanityImg, title: "Primary Suites", desc: "Spa-inspired serenity" },
              { img: leatherCabinetryImg, title: "Custom Details", desc: "Handcrafted millwork" },
              { img: marbleBathImg, title: "Natural Stone", desc: "Timeless elegance" },
              { img: proRangeImg, title: "Chef's Kitchens", desc: "Culinary excellence" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[400px] overflow-hidden"
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-6 left-6 text-cream">
                  <h3 className="text-lg font-serif mb-1">{item.title}</h3>
                  <p className="text-[10px] tracking-widest uppercase opacity-80">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Styles List */}
          <div className="mt-24 pt-12 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { id: "01", name: "Coastal Modern", desc: "Oceanfront living" },
                { id: "02", name: "Hill Country", desc: "Native limestone" },
                { id: "03", name: "Mountain Lodge", desc: "Heavy timber" },
                { id: "04", name: "Resort Living", desc: "Hospitality-inspired" },
              ].map((style) => (
                <div key={style.id} className="group cursor-default">
                  <span className="text-xs text-gold/60 mb-2 block">{style.id}</span>
                  <h4 className="text-xl font-serif text-foreground mb-1 group-hover:text-gold transition-colors">{style.name}</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{style.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 DESIGN COLLECTIONS */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="absolute right-0 top-0 text-[15rem] font-serif text-charcoal/5 -translate-y-1/4 translate-x-1/4 select-none pointer-events-none">
          02
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-gold text-xs tracking-[0.2em] uppercase block mb-4">02 Collections</span>
              <h2 className="text-4xl font-serif font-light text-foreground">Design Albums</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-md font-light">
              Explore our curated collections of luxury environments and specialty finishes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designAlbums.map((album, i) => (
              <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/design/${album.id}`)}
              >
                <div className="relative aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-cream text-[10px] tracking-[0.3em] uppercase border border-cream/30 px-6 py-3 backdrop-blur-sm">
                      View Collection
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-serif text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {album.title}
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-light">
                  {album.images.length} Images
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 CAPABILITIES */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute left-0 top-1/2 text-[20rem] font-serif text-charcoal/5 -translate-y-1/2 -translate-x-1/4 select-none pointer-events-none">
          03
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="mb-20">
            <span className="text-gold text-xs tracking-[0.2em] uppercase block mb-4">03 Capabilities</span>
            <h2 className="text-4xl font-serif font-light text-foreground">Skills & Services</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
            {[
              {
                title: "Architecture",
                items: ["Site-Responsive Design", "Structural Coordination", "Smart Home Integration"]
              },
              {
                title: "Interiors",
                items: ["Custom Millwork", "Lighting Design", "Curated Materials"]
              },
              {
                title: "Development",
                items: ["Feasibility Analysis", "Entitlement Processing", "Construction Management"]
              }
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-2xl font-serif mb-8 text-charcoal">{service.title}</h3>
                <ul className="space-y-4">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center text-sm text-muted-foreground font-light border-b border-charcoal/10 pb-4">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-4" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 PHILOSOPHY */}
      <section className="py-32 bg-foreground text-cream relative">
        <div className="absolute left-12 top-12 text-[10rem] font-serif text-cream/5 select-none font-light">
          04
        </div>

        <div className="container mx-auto px-6 lg:px-24 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-gold text-xs tracking-[0.2em] uppercase block mb-8">03 Philosophy</span>
            <blockquote className="text-3xl md:text-5xl font-serif font-light leading-snug mb-8">
              "We don't simply build structures—we craft environments that enhance how people live, work, and experience their world."
            </blockquote>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[3/4] max-w-md mx-auto relative transform md:translate-y-12">
              <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-gold/30 -translate-y-4 translate-x-4 mb-4" />
              <img src={limestoneFireplaceImg} alt="Philosophy" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* 05 PROCESS */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <span className="text-gold text-xs tracking-[0.2em] uppercase block mb-12">05 Our Approach</span>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding vision, site conditions, and project requirements." },
              { step: "02", title: "Design", desc: "Collaborative development with architects and interior designers." },
              { step: "03", title: "Development", desc: "Detailed planning, budgeting, and construction scheduling." },
              { step: "04", title: "Delivery", desc: "Meticulous construction execution and quality assurance." },
            ].map((phase, i) => (
              <div key={phase.step} className="relative pt-8 border-t border-border hover:border-gold transition-colors duration-500 group">
                <span className="absolute top-0 left-0 -translate-y-1/2 bg-background pr-4 text-4xl font-serif text-muted-foreground/20 group-hover:text-gold/40 transition-colors">
                  {phase.step}
                </span>
                <h3 className="text-xl font-serif mb-4 mt-4">{phase.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="h-[60vh] relative flex items-center justify-center bg-charcoal">
        <div className="absolute inset-0">
          <img src={proRangeImg} alt="Contact Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/80" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-serif text-cream mb-8 font-light">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-12 max-w-md mx-auto font-light">
            Every exceptional project starts with a conversation. Let's discuss your vision.
          </p>
          <Link to="/contact">
            <Button className="bg-gold text-charcoal hover:bg-cream hover:text-charcoal transition-all text-xs tracking-[0.2em] uppercase px-10 py-6">
              Schedule Consultation
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Design;
