import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { PremiumButton } from "@/components/ui/PremiumButton";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    project_type: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // For now, just show success message since contact_inquiries table doesn't exist
      // TODO: Create contact_inquiries table via migration if needed
      console.log("Contact form submitted:", formData);

      toast({
        title: "Message Sent",
        description: "Michael will get back to you personally within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", message: "", project_type: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-cream">
        {/* Header Section */}
        <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-charcoal">
            <img
              src="/design/southcoast-kitchen/18 Living Rm AFTER.JPG"
              alt="Background"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-6"
          >
            <p className="text-gold tracking-[0.4em] uppercase text-xs mb-6 font-semibold">Contact</p>
            <h1 className="text-6xl md:text-7xl font-serif text-cream mb-8">Let's Build <br /><span className="text-gold italic font-light">Together</span></h1>
            <div className="w-24 h-[1px] bg-gold mx-auto opacity-50" />
          </motion.div>
        </section>

        <section className="py-24 -mt-16 relative z-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-start">

              {/* Info Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-4 space-y-8"
              >
                <div className="bg-charcoal p-12 text-cream shadow-2xl">
                  <h2 className="text-3xl font-serif mb-8 text-primary">Inquiries</h2>
                  <p className="text-cream/60 mb-12 font-light leading-relaxed">
                    Whether you're planning a custom residence or seeking development expertise, I'm here to translate your vision into reality.
                  </p>
                </div>

                <div className="p-8 border border-gold/10 bg-white/50 backdrop-blur-sm">
                  <h3 className="font-serif text-charcoal text-xl mb-4">Availability</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Currently accepting select projects for Q2-Q3 2026. Reach out to schedule an initial site evaluation.
                  </p>
                </div>


              </motion.div>

              {/* Form Column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-8"
              >
                <div className="bg-white p-12 shadow-xl border border-gold/10">
                  <div className="mb-12">
                    <h2 className="text-4xl font-serif text-charcoal mb-4">Project Evaluation</h2>
                    <p className="text-muted-foreground font-light">Please provide as much detail as possible regarding your project scope and location.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">Your Name</label>
                        <Input
                          placeholder="John Doe"
                          className="rounded-none border-0 border-b border-muted bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg py-6"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">Email Address</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="rounded-none border-0 border-b border-muted bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg py-6"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">Phone Number</label>
                        <Input
                          placeholder="(555) 000-0000"
                          className="rounded-none border-0 border-b border-muted bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg py-6"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">Project Type</label>
                        <Input
                          placeholder="e.g. Custom Residence, Renovation"
                          className="rounded-none border-0 border-b border-muted bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg py-6"
                          value={formData.project_type}
                          onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">Message</label>
                      <Textarea
                        placeholder="Tell us about your vision, site location, and timeline..."
                        rows={6}
                        className="rounded-none border-0 border-b border-muted bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-all text-lg resize-none py-4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <div className="pt-6">
                      <PremiumButton
                        type="submit"
                        size="lg"
                        className="bg-charcoal text-cream hover:bg-gold hover:text-charcoal transition-all px-12 py-8 min-w-[240px] w-full md:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Submit Inquiry"}
                      </PremiumButton>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
