import { useState, useEffect } from "react";
import { useProjectsByCategory } from "@/hooks/useProjects";
import { ImageUploader } from "@/components/gallery/ImageUploader";
import { ImageGrid } from "@/components/gallery/ImageGrid";
import { ProjectImage } from "@/components/gallery/ImageCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/data/projects";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, LogOut, LayoutDashboard, Image as ImageIcon, CheckCircle2 } from "lucide-react";

// URL validation schema - only allow http/https URLs that look like images
const imageUrlSchema = z.string()
  .trim()
  .url({ message: "Invalid URL format" })
  .refine((url) => {
    try {
      const parsed = new URL(url);
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return false;
      }
      // Block javascript: and data: protocols
      if (url.toLowerCase().startsWith('javascript:') || url.toLowerCase().startsWith('data:')) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }, { message: "URL must use http or https protocol" })
  .refine((url) => {
    // Check for common image extensions or known image hosting patterns
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif|heic|heif)(\?.*)?$/i;
    const imageHostingPatterns = [
      /supabase\.co\/storage/i,
      /cloudinary\.com/i,
      /imgur\.com/i,
      /unsplash\.com/i,
      /pexels\.com/i,
      /googleusercontent\.com/i,
    ];

    // Allow if it has image extension OR is from known image hosting
    const hasImageExtension = imageExtensions.test(url);
    const isFromImageHost = imageHostingPatterns.some(pattern => pattern.test(url));

    return hasImageExtension || isFromImageHost;
  }, { message: "URL must point to an image file (jpg, png, gif, webp, etc.)" });

const validateImageUrl = (url: string): { valid: boolean; error?: string } => {
  const result = imageUrlSchema.safeParse(url);
  if (result.success) {
    return { valid: true };
  }
  return { valid: false, error: result.error.errors[0]?.message || "Invalid URL" };
};

const ImageGalleryManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const { projects, loading } = useProjectsByCategory(selectedCategory);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const activeProject = projects.find(p => p.id === selectedProject);

  const [localImages, setLocalImages] = useState<ProjectImage[]>([]);

  // Check admin status on mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);
        setAuthChecked(true);
        return;
      }

      // Check if user has admin role
      const { data: adminCheck } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      setIsAdmin(!!adminCheck);
      setAuthChecked(true);
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (activeProject?.images) {
      const mappedImages = activeProject.images.map(img => ({
        id: img.id || "temp-id-" + img.display_order,
        project_id: activeProject.id,
        image_url: img.image_url,
        title: activeProject.title,
        description: null,
        display_order: img.display_order,
        is_before: false,
        is_after: false
      }));
      setLocalImages(mappedImages);
    }
  }, [activeProject]);

  const [uploading, setUploading] = useState(false);

  // Helper to verify admin before operations
  const verifyAdmin = (): boolean => {
    if (!isAdmin) {
      toast.error("Admin access required for this operation");
      return false;
    }
    return true;
  };

  const handleUpload = async (file: File) => {
    if (!selectedProject) return;
    if (!verifyAdmin()) return;

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedProject}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-gallery')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-gallery')
        .getPublicUrl(fileName);

      await handleUrlAdd(publicUrl, file.name);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleUrlAdd = async (url: string, title: string) => {
    if (!selectedProject) return;
    if (!verifyAdmin()) return;

    // Validate URL before processing
    const validation = validateImageUrl(url);
    if (!validation.valid) {
      toast.error(validation.error || "Invalid image URL");
      return;
    }

    setUploading(true);

    const newOrder = localImages.length;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await supabase.from('project_images' as any).insert({
      project_id: selectedProject,
      image_url: url,
      display_order: newOrder,
      rotation_angle: 0
    }).select().single();

    if (error) {
      toast.error("Failed to add image");
      console.error(error);
    } else {
      toast.success("Image added successfully");
      // Update local state
      if (activeProject && data) {
        const typedData = data as unknown as { id: string };
        const newImage: ProjectImage = {
          id: typedData.id,
          project_id: selectedProject,
          image_url: url,
          title: activeProject.title,
          description: null,
          display_order: newOrder,
          is_before: false,
          is_after: false
        };
        setLocalImages([...localImages, newImage]);
      }
    }
    setUploading(false);
  };

  const handleDelete = async (image: ProjectImage) => {
    if (!verifyAdmin()) return;
    if (!confirm("Are you sure you want to delete this image?")) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from('project_images' as any).delete().eq('id', image.id);

    if (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image");
    } else {
      toast.success("Image deleted");
      setLocalImages(localImages.filter(img => img.id !== image.id));
    }
  };

  const handleReorder = async (newOrder: ProjectImage[]) => {
    if (!verifyAdmin()) return;

    // Optimistic update
    setLocalImages(newOrder);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from('project_images' as any).upsert(
      newOrder.map((img, index) => ({
        id: img.id,
        project_id: img.project_id,
        image_url: img.image_url,
        display_order: index
      })),
      { onConflict: 'id' } // Specifying conflict on ID
    );

    if (error) {
      console.error("Error reordering:", error);
      toast.error("Failed to save order");
    } else {
      toast.success("Order saved");
    }
  };

  const handleToggle = async (image: ProjectImage, field: 'is_before' | 'is_after') => {
    if (!verifyAdmin()) return;

    const newValue = !image[field];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await supabase.from('project_images' as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update({ [field]: newValue } as any)
      .eq('id', image.id);

    if (error) {
      console.error(`Error toggling ${field}:`, error);
      toast.error(`Failed to update ${field} status`);
    } else {
      setLocalImages(localImages.map(img =>
        img.id === image.id ? { ...img, [field]: newValue } : img
      ));
      toast.success(`${field === 'is_before' ? 'Before' : 'After'} status updated`);
    }
  };

  // Show loading while checking auth
  if (!authChecked) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-charcoal">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-6"
        >
          <Card className="bg-charcoal-light border-white/10 shadow-2xl overflow-hidden">
            <CardContent className="pt-10 pb-8 px-8 text-center">
              <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <LogOut className="h-8 w-8 text-red-400" />
              </div>
              <h1 className="text-3xl font-serif text-cream mb-3 luxury-heading">Access Denied</h1>
              <p className="text-cream/50 mb-8 font-light">You need administrator privileges to access the Gallery Manager.</p>
              <Button
                className="bg-gold hover:bg-gold-light text-charcoal w-full h-12"
                onClick={async () => {
                  await supabase.auth.signOut();
                }}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal pb-20">
      {/* Premium Header */}
      <div className="bg-charcoal-light border-b border-white/5 sticky top-0 z-30 backdrop-blur-md bg-opacity-80">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-serif text-cream luxury-heading">Gallery Manager</h1>
              <p className="text-xs text-cream/40 uppercase tracking-widest hidden sm:block">Content Management System</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="text-cream/60 hover:text-gold hover:bg-gold/10"
              onClick={async () => {
                await supabase.auth.signOut();
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 space-y-8 animate-fade-in-up">
        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-charcoal-light/50 border-white/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <label className="text-xs uppercase tracking-widest text-cream/30 mb-2 block">Filter by Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full h-12 bg-black/20 border-white/10 text-cream focus:ring-gold/20">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-charcoal border-white/10 text-cream">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="focus:bg-gold/20 focus:text-gold">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="bg-charcoal-light/50 border-white/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <label className="text-xs uppercase tracking-widest text-cream/30 mb-2 block">Select Project</label>
              <Select value={selectedProject || ""} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-full h-12 bg-black/20 border-white/10 text-cream focus:ring-gold/20">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent className="bg-charcoal border-white/10 text-cream">
                  {projects.map(p => (
                    <SelectItem key={p.id} value={p.id} className="focus:bg-gold/20 focus:text-gold">{p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <AnimatePresence mode="wait">
          {activeProject ? (
            <motion.div
              key="active-project"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-charcoal-light border-white/5 shadow-xl overflow-hidden">
                <CardHeader className="bg-black/20 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-gold/60" />
                    <CardTitle className="text-cream text-xl font-serif tracking-wide">{activeProject.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8 p-6 sm:p-8">
                  <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                    <ImageUploader
                      selectedProject={selectedProject}
                      uploading={uploading}
                      onFileUpload={handleUpload}
                      onUrlAdd={handleUrlAdd}
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
                    <h3 className="text-sm uppercase tracking-widest text-cream/40 mb-6 font-medium">Gallery Ordering & Layout</h3>

                    <ImageGrid
                      images={localImages}
                      onDelete={handleDelete}
                      onReorder={handleReorder}
                      onToggleBeforeAfter={handleToggle}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center bg-white/5 rounded-3xl border border-white/5 border-dashed"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-8 w-8 text-gold/40" />
              </div>
              <h3 className="text-cream text-lg font-serif mb-2">{loading ? "Loading projects..." : "Select a project"}</h3>
              <p className="text-cream/40 max-w-sm">
                {loading ? "Fetching your portfolio data" : "Choose a project from the dropdown above to manage its gallery images and layout."}
              </p>
              {loading && <Loader2 className="h-6 w-6 text-gold animate-spin mt-6" />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageGalleryManager;
