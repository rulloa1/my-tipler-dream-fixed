import Layout from "@/components/layout/Layout";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { projects, categories } from "@/data/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProjectOrder } from "@/hooks/useProjectOrder";
import { ProjectCard } from "@/components/ProjectCard";

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState(categoryFromUrl || "All");
  const heroRef = useRef<HTMLDivElement>(null);

  // Use the project order hook (keeping it for data fetching, but disabling drag for now)
  const {
    projects: orderedProjects,
  } = useProjectOrder(projects);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setActiveFilter(categoryFromUrl);
    } else {
      setActiveFilter("All");
    }
  }, [categoryFromUrl]);

  const filteredProjects = activeFilter === "All"
    ? orderedProjects
    : orderedProjects.filter(p => p.filterCategory === activeFilter);

  return (
    <Layout>
      {/* Cinematic Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] flex flex-col justify-end bg-charcoal overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: backgroundY, scale: backgroundScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/60 to-charcoal z-10" />
          <img
            src="/design/exterior/cover.jpg"
            alt="Portfolio Cover"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-12 lg:px-20 relative z-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold tracking-[0.4em] uppercase text-xs font-medium">
                Our Work
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif text-cream mb-8 leading-none">
              The Portfolio <br />
              <span className="italic text-white/40 font-light">Collection</span>
            </h1>

            <p className="text-lg text-cream/60 max-w-xl leading-relaxed font-light">
              A curated selection of residential, commercial, and hospitality projects
              showcasing 37 years of design excellence and meticulous craftsmanship.
            </p>
          </motion.div>
        </div>

        {/* Vertical Text Decoration */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block z-20">
          <div className="h-32 w-[1px] bg-white/10 mx-auto mb-8" />
          <p
            className="text-[10px] tracking-[0.4em] text-white/30 font-light uppercase"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            Est. 1987
          </p>
          <div className="h-32 w-[1px] bg-white/10 mx-auto mt-8" />
        </div>
      </section>

      {/* Filters - Cinematic Sticky bar */}
      <section className="bg-background/80 py-8 border-b border-border sticky top-[72px] z-40 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-12 lg:px-20">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {categories.map((cat, index) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index * 0.05) }}
                  onClick={() => {
                    setActiveFilter(cat);
                    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
                  }}
                  className="relative group py-2"
                >
                  <span className={cn(
                    "text-[10px] tracking-[0.3em] uppercase transition-all duration-500 block",
                    activeFilter === cat
                      ? "text-charcoal font-bold"
                      : "text-muted-foreground group-hover:text-charcoal font-medium"
                  )}>
                    {cat}
                  </span>
                  {activeFilter === cat && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {activeFilter !== cat && (
                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold/30 transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:block"
              >
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase opacity-50">
                  Found {filteredProjects.length} Architectural Artifacts
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Stack */}
      <section className="py-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 sm:px-12 lg:px-20">
          <div className="flex flex-col gap-0 pb-24">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
