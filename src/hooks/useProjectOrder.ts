import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Project } from "@/data/projects";

export const useProjectOrder = (defaultProjects: Project[]) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if current user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsAdmin(false);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      setIsAdmin(!!data);
    };
    checkAdminStatus();
  }, []);

  // Load saved project order
  useEffect(() => {
    const loadProjectOrder = async () => {
      setIsLoading(true);

      // We use a special ID "portfolio-main" to store the global project order
      const { data: orderData, error: orderError } = await supabase
        .from("project_gallery_orders")
        .select("image_order")
        .eq("project_id", "portfolio-main")
        .maybeSingle();

      if (!orderError && orderData?.image_order) {
        const savedOrderIds = orderData.image_order as string[];
        
        // Create a map for O(1) lookup
        const projectMap = new Map(defaultProjects.map(p => [p.id, p]));
        
        // Reconstruct the sorted array
        const sortedProjects: Project[] = [];
        const seenIds = new Set<string>();

        // Add projects in the saved order if they exist
        savedOrderIds.forEach(id => {
          const project = projectMap.get(id);
          if (project) {
            sortedProjects.push(project);
            seenIds.add(id);
          }
        });

        // Add any new projects that weren't in the saved order
        defaultProjects.forEach(p => {
          if (!seenIds.has(p.id)) {
            sortedProjects.push(p);
          }
        });

        setProjects(sortedProjects);
      } else {
        setProjects(defaultProjects);
      }
      setIsLoading(false);
    };

    loadProjectOrder();
  }, [defaultProjects]);

  const saveProjectOrder = async (newProjects: Project[]) => {
    const newOrderIds = newProjects.map(p => p.id);
    
    // Log for developer convenience
    console.log("New Project Order IDs:");
    console.log(JSON.stringify(newOrderIds, null, 2));

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in to save to Database.");
      setProjects(newProjects);
      return true;
    }

    const { error } = await supabase
      .from("project_gallery_orders")
      .upsert({
        project_id: "portfolio-main",
        image_order: newOrderIds, // We reuse the image_order column for project IDs
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      }, {
        onConflict: "project_id"
      });

    if (error) {
      console.error("Error saving project order:", error);
      toast.error("Failed to save project order");
      return false;
    }

    setProjects(newProjects);
    toast.success("Project order saved");
    return true;
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(prev => {
      const newState = !prev;
      if (newState) {
        toast.success("Edit mode enabled - You can now drag to reorder projects");
      } else {
        toast.info("Edit mode disabled");
      }
      return newState;
    });
  };

  const isEditable = isAdmin || isEditMode;

  return { projects, isLoading, isAdmin, isEditable, toggleEditMode, saveProjectOrder };
};
