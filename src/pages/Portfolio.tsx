import Layout from "@/components/layout/Layout";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { projects, categories } from "@/data/projects";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useProjectOrder } from "@/hooks/useProjectOrder";

// DnD Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable Project Card Wrapper
const SortableProjectCard = ({
  project,
  children,
  isEditable
}: {
  project: { id: string };
  children: React.ReactNode;
  isEditable: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
    position: "relative" as const,
  };

  if (!isEditable) {
    return <>{children}</>;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      {/* Visual indicator for drag handle if needed, or just draggable card */}
      {children}
      {isEditable && (
        <div className="absolute top-2 right-2 bg-charcoal/80 text-cream p-1 rounded z-50 pointer-events-none opacity-50">
          <Settings2 className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState(categoryFromUrl || "All");
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);

  // Use the new project order hook
  const {
    projects: orderedProjects,
    isEditable,
    toggleEditMode,
    saveProjectOrder
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

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement to start drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = orderedProjects.findIndex((p) => p.id === active.id);
      const newIndex = orderedProjects.findIndex((p) => p.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newProjects = arrayMove(orderedProjects, oldIndex, newIndex);
        saveProjectOrder(newProjects);
      }
    }
  };

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

              <Button
                variant="outline"
                size="sm"
                onClick={toggleEditMode}
                className="border-primary/50 text-charcoal hover:bg-primary hover:text-charcoal transition-colors text-[10px] flex items-center gap-2 h-8"
              >
                <Settings2 className="w-3 h-3" />
                {isEditable ? "Done" : "Edit Order"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid - Premium Framer Layout */}
      <section className="py-24 bg-background min-h-screen">
        <div className="container mx-auto px-12 lg:px-20">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredProjects.map((p) => p.id)}
              strategy={rectSortingStrategy}
              disabled={!isEditable || activeFilter !== "All"}
            >
              <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <SortableProjectCard
                      key={project.id}
                      project={project}
                      isEditable={isEditable && activeFilter === "All"}
                    >
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        transition={{
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                          delay: (index % 3) * 0.1
                        }}
                        className="h-full"
                      >
                        <Link
                          to={`/project/${project.id}`}
                          className="group block h-full"
                          onClick={(e) => {
                            if (isEditable && activeFilter === "All") {
                              e.preventDefault();
                            }
                          }}
                        >
                          {/* Perspective Image Container */}
                          <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-8 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[2px] flex items-center justify-center">
                              <div className="px-8 py-4 border border-cream/30 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                                <span className="text-cream text-[10px] tracking-[0.4em] uppercase font-bold">View Archive</span>
                              </div>
                            </div>
                            <div className="absolute top-6 left-6 inline-block py-1 px-3 bg-charcoal/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                              <p className="text-cream text-[8px] tracking-[0.2em] uppercase font-bold">{project.category}</p>
                            </div>
                          </div>

                          {/* Text Content - Refined Alignment */}
                          <div className="space-y-3 px-1">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-[1px] bg-gold opacity-30 group-hover:w-16 group-hover:bg-gold transition-all duration-700" />
                              <span className="text-[10px] tracking-[0.2em] text-gold uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                Explore
                              </span>
                            </div>
                            <h3 className="font-serif text-3xl text-charcoal group-hover:text-primary transition-colors duration-500 leading-tight">
                              {project.title}
                            </h3>
                            <div className="flex justify-between items-center pt-2 border-t border-border/50">
                              <p className="text-xs text-muted-foreground font-light tracking-wide italic">
                                {project.location}
                              </p>
                              <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </SortableProjectCard>
                  ))}
                </AnimatePresence>
              </motion.div>
            </SortableContext>
          </DndContext>

          {/* CTA - Refined */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-24"
          >
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-500 text-[11px] tracking-[0.2em] uppercase font-light px-10 py-6"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-3" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
