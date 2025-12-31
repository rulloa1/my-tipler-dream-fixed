import { ReactNode, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NumberedGallery } from "@/components/gallery/NumberedGallery";
import { motion, AnimatePresence } from "framer-motion";
import { SmelekLetterCard } from "@/components/gallery/SmelekLetterCard";
import CTASection from "@/components/home/CTASection";

interface DetailLayoutProps {
  // Data
  title: string;
  category?: string;
  
  // Gallery Props (passed from useGalleryOrder hook in parent)
  galleryImages: string[];
  isLoading: boolean;
  isEditable: boolean;
  onOrderChange: (newImages: string[]) => Promise<boolean> | void;
  onEditImage?: (image: string) => void;
  onAddImage?: (file: File) => Promise<void>;
  onRemoveImage?: (index: number) => void;
  toggleEditMode: () => void;
  isAdmin?: boolean;

  // Content Sections
  hero: ReactNode;
  content: ReactNode;
  afterGallery?: ReactNode;
  
  // Navigation
  backLink: { to: string; label: string };
  prevItem?: { id: string; title: string; coverImage: string; link: string } | null;
  nextItem?: { id: string; title: string; coverImage: string; link: string } | null;
  
  // Optional
  showCTA?: boolean;
}

export const DetailLayout = ({
  title,
  category,
  galleryImages,
  isLoading,
  isEditable,
  onOrderChange,
  onEditImage,
  onAddImage,
  onRemoveImage,
  toggleEditMode,
  isAdmin,
  hero,
  content,
  afterGallery,
  backLink,
  prevItem,
  nextItem,
  showCTA = false
}: DetailLayoutProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Scroll to top when title/id changes (handled by parent key usually, but good safety)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = useCallback(() => {
    if (selectedImage !== null && selectedImage < galleryImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  }, [selectedImage, galleryImages.length]);
  
  const prevImage = useCallback(() => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  }, [selectedImage]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, nextImage, prevImage]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        {hero}

        {/* Main Content */}
        {content}

        {/* Gallery Section */}
        <section className="py-16 bg-charcoal">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-serif text-cream mb-2">Gallery</h2>
                  {isAdmin && (
                    <p className="text-cream/60 text-sm">Enter a number to reorder images</p>
                  )}
                </div>
              </div>

              {isLoading ? (
                <div className="text-cream/60">Loading gallery...</div>
              ) : (
                <NumberedGallery
                  images={galleryImages}
                  projectTitle={title}
                  onImageClick={openLightbox}
                  onOrderChange={onOrderChange}
                  onEditImage={onEditImage}
                  onAddImage={onAddImage}
                  onRemoveImage={onRemoveImage}
                  isEditable={isEditable}
                />
              )}

              <div className="mt-8 flex justify-end">
                <Button
                  variant="outline"
                  onClick={toggleEditMode}
                  className="border-primary/50 text-cream hover:bg-primary hover:text-charcoal transition-colors text-xs flex items-center gap-2"
                >
                  <Settings2 className="w-3 h-3" />
                  {isEditable ? "Disable Editing" : "Enable Editing"}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Projects or other content */}
{afterGallery && <div className="after-gallery">{afterGallery}</div>}



        {/* Navigation Footer */}
        <section className="py-24 bg-cream border-y border-border relative overflow-hidden">
           {/* Decorative background element similar to ProjectDetail */}
          <div className="absolute top-0 right-0 w-1/4 h-full bg-charcoal/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            {/* Back Link Mobile Only (redundant but nice for UX) */}
            <div className="md:hidden mb-12">
               <Link to={backLink.to} className="inline-flex items-center gap-2 text-gold tracking-widest text-[10px] uppercase font-bold">
                <ArrowLeft className="w-4 h-4" /> {backLink.label}
               </Link>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              {prevItem ? (
                <Link to={prevItem.link} className="group flex items-center gap-8 max-w-sm w-full md:w-auto">
                  <div className="w-20 h-20 overflow-hidden relative border border-gold/20 flex-shrink-0 hidden sm:block">
                    <img src={prevItem.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-gold font-bold mb-2 flex items-center gap-2">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Previous
                    </p>
                    <p className="font-serif text-2xl text-charcoal group-hover:text-gold transition-colors">{prevItem.title}</p>
                  </div>
                </Link>
              ) : <div />}

              {nextItem ? (
                <Link to={nextItem.link} className="group flex items-center gap-8 max-w-sm w-full md:w-auto text-right justify-end md:justify-start">
                  <div className="flex flex-col items-end">
                    <p className="text-[10px] tracking-widest uppercase text-gold font-bold mb-2 flex items-center gap-2 justify-end">
                      Next <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </p>
                    <p className="font-serif text-2xl text-charcoal group-hover:text-gold transition-colors">{nextItem.title}</p>
                  </div>
                  <div className="w-20 h-20 overflow-hidden relative border border-gold/20 flex-shrink-0 hidden sm:block">
                    <img src={nextItem.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt="" />
                  </div>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>

        {showCTA && <CTASection />}

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-xl flex items-center justify-center"
            >
              <button 
                onClick={closeLightbox} 
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[101] p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md" 
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              <button 
                onClick={prevImage} 
                disabled={selectedImage === 0} 
                className="absolute left-6 text-white/70 hover:text-white transition-colors disabled:opacity-30 z-50 p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md hidden md:block" 
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>

              {/* Content Switcher */}
              <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
                  {galleryImages[selectedImage] === "special://smelek-letter" ? (
                    <div className="max-w-[85vw] max-h-[85vh] bg-cream shadow-2xl overflow-y-auto w-full">
                      <SmelekLetterCard />
                    </div>
                  ) : galleryImages[selectedImage].match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      src={galleryImages[selectedImage]}
                      controls
                      autoPlay
                      className="max-h-[85vh] max-w-[85vw] shadow-2xl"
                    />
                  ) : galleryImages[selectedImage].includes('youtube.com') || galleryImages[selectedImage].includes('youtu.be') ? (
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${galleryImages[selectedImage].includes('v=') ? galleryImages[selectedImage].split('v=')[1].split('&')[0] : galleryImages[selectedImage].split('/').pop()}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="max-h-[85vh] max-w-[85vw] w-full aspect-video shadow-2xl"
                    ></iframe>
                  ) : (
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      src={galleryImages[selectedImage]}
                      alt={`${title} - Item ${selectedImage + 1}`}
                      className="max-h-[85vh] max-w-[85vw] object-contain"
                    />
                  )}
              </div>

              <button 
                onClick={nextImage} 
                disabled={selectedImage === galleryImages.length - 1} 
                className="absolute right-6 text-white/70 hover:text-white transition-colors disabled:opacity-30 z-[101] p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md hidden md:block" 
                aria-label="Next image"
              >
                <ChevronRight className="w-12 h-12" />
              </button>

              <div className="absolute bottom-6 text-cream/60 text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
};
