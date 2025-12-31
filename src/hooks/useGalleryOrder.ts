import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useGalleryOrder = (projectId: string, defaultImages: string[]) => {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current user is admin - defaults to false for security
  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsAdmin(false); // Default to false for security

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return; // No user = definitely not admin

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!data); // Only true if admin role found
    };
    checkAdminStatus();
  }, []);

  // Load saved gallery order
  useEffect(() => {
    const loadGalleryOrder = async () => {
      setIsLoading(true);

      // Load from project_gallery_orders
      const { data: orderData, error: orderError } = await supabase
        .from("project_gallery_orders")
        .select("image_order")
        .eq("project_id", projectId)
        .maybeSingle();

      if (!orderError && orderData?.image_order) {
        const savedOrder = orderData.image_order as string[];
        const newImages = defaultImages.filter(img => !savedOrder.includes(img));
        setImages([...savedOrder.filter(img => defaultImages.includes(img)), ...newImages]);
      } else {
        setImages(defaultImages);
      }
      setIsLoading(false);
    };

    loadGalleryOrder();
  }, [projectId, defaultImages]);

  const saveGalleryOrder = async (newImages: string[]) => {
    // Log for developer convenience
    console.log("New Gallery Order (Copy to projects.ts):");
    console.log(JSON.stringify(newImages, null, 2));

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to save to Database. Check console for code snippet.");
      // We still update local state so they can see it working
      setImages(newImages);
      return true; // Pretend success for local interaction
    }

    const { error } = await supabase
      .from("project_gallery_orders")
      .upsert({
        project_id: projectId,
        image_order: newImages,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      }, {
        onConflict: "project_id"
      });

    if (error) {
      console.error("Error saving gallery order:", error);
      toast.error("Failed to save gallery order");
      return false;
    }

    setImages(newImages);
    toast.success("Gallery order saved");
    return true;
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => setIsEditMode(prev => !prev);

  // Allow editing if admin OR manually enabled
  const isEditable = isAdmin || isEditMode;

  return { images, isLoading, isAdmin, isEditable, toggleEditMode, saveGalleryOrder };
};
