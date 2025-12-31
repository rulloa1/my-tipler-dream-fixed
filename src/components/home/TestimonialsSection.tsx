import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    quote: "Michael transformed my vision into a stunning reality. His attention to detail and commitment to excellence exceeded all my expectations. My home is truly a masterpiece.",
    author: "Robert & Sarah Thompson",
    location: "Coastal Modern Estate",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
  },
  {
    id: 2,
    quote: "Working with Michael was an absolute pleasure. He listened to my needs, offered brilliant solutions, and delivered on time and within budget. Highly recommend!",
    author: "Jennifer Martinez",
    location: "Urban Loft Renovation",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
  {
    id: 3,
    quote: "The craftsmanship and quality of work is unmatched. Michael brought my mountain retreat dream to life with incredible skill and professionalism.",
    author: "David & Linda Chen",
    location: "Mountain Retreat",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-cream rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-cream rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-serif text-cream mb-6">What My Clients Say</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className={cn(
          "max-w-4xl mx-auto transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 ${
                  index === currentIndex
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 absolute inset-0 translate-x-full"
                }`}
              >
                <div className="text-center">
                  <Quote className="w-16 h-16 text-primary mx-auto mb-8 opacity-50" />
                  <blockquote className="text-xl md:text-2xl text-cream/90 font-light leading-relaxed mb-10 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                    />
                    <div className="text-left">
                      <p className="text-cream font-serif text-lg">{testimonial.author}</p>
                      <p className="text-primary text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 border border-cream/30 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-cream" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-cream/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 border border-cream/30 hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5 text-cream" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
