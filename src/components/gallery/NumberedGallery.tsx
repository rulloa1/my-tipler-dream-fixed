import { useState, useEffect, useRef } from "react";
import { Plus, X, Copy, Check, Upload, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { SmelekLetterCard } from "./SmelekLetterCard";

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

interface NumberedGalleryProps {
  images: string[];
  projectTitle: string;
  projectId?: string;
  onImageClick: (index: number) => void;
  onOrderChange?: (newImages: string[]) => Promise<boolean> | void;
  onEditImage?: (image: string) => void;
  onAddImage?: (file: File) => Promise<void>;
  onRemoveImage?: (index: number) => void;
  isEditable?: boolean;
}

// Sortable Image Component
function SortableImage({
  id,
  image,
  index,
  projectTitle,
  isEditable,
  onImageClick,
  onRemove,
  onReplace,
  onEdit,
}: {
  id: string;
  image: string;
  index: number;
  projectTitle: string;
  isEditable: boolean;
  onImageClick: (index: number) => void;
  onRemove?: (index: number) => void;
  onReplace?: (index: number) => void;
  onEdit?: (image: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  const isVideo = image.match(/\.(mp4|webm|ogg)$/i) || image.includes('youtube.com') || image.includes('vimeo.com');

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`aspect-square overflow-hidden group relative bg-black/20 ${isEditable ? "touch-none" : ""}`}
      {...(isEditable ? attributes : {})}
      {...(isEditable ? listeners : {})}
    >
      {/* Controls - only show if editable */}
      {isEditable && (
        <>
          <div className="absolute top-2 left-2 z-10 bg-charcoal/80 text-cream px-2 py-1 rounded text-xs font-mono">
            {index + 1}
          </div>

          <div className="absolute top-2 right-2 z-10 flex gap-1 bg-charcoal/80 rounded-md p-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onReplace?.(index);
              }}
              className="p-1.5 rounded hover:bg-primary hover:text-charcoal text-cream transition-colors"
              title="Replace image"
            >
              <Upload className="w-4 h-4" />
            </button>
            {onRemove && (
              <button
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (confirm("Are you sure you want to remove this item?")) {
                    onRemove(index);
                  }
                }}
                className="p-1.5 rounded hover:bg-destructive hover:text-white text-cream transition-colors"
                title="Remove item"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {onEdit && !isVideo && (
            <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(image);
                }}
                className="bg-charcoal/80 text-cream p-2 rounded-md hover:bg-primary hover:text-charcoal backdrop-blur-sm"
                title="Redesign with AI"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-wand-2"
                >
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
                  <path d="m14 7 3 3" />
                  <path d="M5 6v4" />
                  <path d="M19 14v4" />
                  <path d="M10 2v2" />
                  <path d="M7 8H3" />
                  <path d="M21 16h-4" />
                  <path d="M11 3H9" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-charcoal fill-current ml-1" />
          </div>
        </div>
      )}

      {image === "special://smelek-letter" ? (
        <div
          className="w-full h-full cursor-pointer"
          onClick={() => onImageClick(index)}
        >
          <SmelekLetterCard />
        </div>
      ) : isVideo ? (
        <div
          onClick={() => !isDragging && onImageClick(index)}
          className="w-full h-full cursor-pointer bg-charcoal flex items-center justify-center group"
        >
          <img
            src={`https://img.youtube.com/vi/${image.split('v=')[1]?.split('&')[0]}/0.jpg`}
            alt="Video Thumbnail"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/og-image.png";
              (e.target as HTMLImageElement).className = "w-full h-full object-cover opacity-20 grayscale";
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
        </div>
      ) : (
        <img
          src={image}
          alt={`${projectTitle} - Item ${index + 1}`}
          onClick={() => {
            if (!isDragging) onImageClick(index);
          }}
          className={`w-full h-full object-cover transition-transform duration-500 ${isEditable ? "" : "group-hover:scale-110 cursor-pointer"}`}
        />
      )}
    </div>
  );
}

export const NumberedGallery = ({
  images: externalImages,
  projectTitle,
  projectId,
  onImageClick,
  onOrderChange,
  onEditImage,
  onAddImage,
  onRemoveImage,
  isEditable = false,
}: NumberedGalleryProps) => {
  const { toast } = useToast();
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const addInputRef = useRef<HTMLInputElement>(null);
  
  // Internal state with unique IDs
  const [items, setItems] = useState<{ id: string; url: string }[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement to start drag, allowing clicks
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sync with external images
  useEffect(() => {
    // Check if external images match current items by URL to avoid re-generating IDs unnecessarily
    const currentUrls = items.map(i => i.url);
    const isSame = externalImages.length === currentUrls.length && 
                   externalImages.every((url, i) => url === currentUrls[i]);
    
    if (!isSame) {
      // Map to new items with unique IDs
      // Try to preserve IDs for URLs that haven't moved or are same? 
      // For simplicity and robustness against duplicates, we generate new IDs if the list changed.
      // But this might kill drag if parent updates during drag.
      // Assuming parent updates happen only after drag end.
      setItems(externalImages.map(url => ({ 
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2), 
        url 
      })));
    }
  }, [externalImages, items]); // We don't include items in dependency to avoid loop, logic relies on functional update or careful check

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems); // Optimistic UI update
        
        const newUrls = newItems.map(i => i.url);
        await onOrderChange?.(newUrls);
      }
    }
  };

  const handleCopyConfig = () => {
    const config = JSON.stringify(items.map(i => i.url), null, 2);
    navigator.clipboard.writeText(config);
    setIsCopied(true);
    toast({
      title: "Configuration Copied",
      description: "Paste this into src/data/projects.ts to save changes permanently.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReplaceClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleAddClick = () => {
    addInputRef.current?.click();
  };

  const handleFileChange = async (index: number | null, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file type", description: "Please upload an image.", variant: "destructive" });
      return;
    }

    try {
      if (index === null) {
        await onAddImage?.(file);
      } else {
        // Replace logic
        let publicUrl;
        if (projectId && supabase) {
          try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${projectId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const { error: uploadError } = await supabase.storage.from('project-gallery').upload(fileName, file);
            if (!uploadError) {
              const { data } = supabase.storage.from('project-gallery').getPublicUrl(fileName);
              publicUrl = data.publicUrl;
            }
          } catch (e) { console.warn("Upload failed", e) }
        }
        if (!publicUrl) publicUrl = URL.createObjectURL(file);

        // Optimistic update
        const newItems = [...items];
        newItems[index] = { ...newItems[index], url: publicUrl };
        setItems(newItems);

        await onOrderChange?.(newItems.map(i => i.url));
        toast({ title: "Image replaced" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Failed", variant: "destructive" });
    }
    e.target.value = '';
  };

  return (
    <>
      {isEditable && (
        <div className="mb-6 flex justify-between items-center bg-card/10 p-4 rounded-lg border border-primary/20">
          <div className="text-cream text-sm">
            <span className="font-bold text-primary">Edit Mode Active</span>
            <span className="mx-2">|</span>
            Drag and drop images to reorder.
          </div>
          <Button
            onClick={handleCopyConfig}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-primary/50 hover:bg-primary/20 text-cream"
          >
            {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {isCopied ? "Copied!" : "Copy Configuration"}
          </Button>
        </div>
      )}

      {/* Hidden inputs for replacement - mapped by index */}
      {items.map((item, index) => (
        <input
          key={`input-${item.id}`} // Use ID for key
          type="file"
          accept="image/*"
          ref={(el) => { fileInputRefs.current[index] = el; }}
          onChange={(e) => handleFileChange(index, e)}
          className="hidden"
        />
      ))}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(i => i.id)} // Pass IDs, not URLs
          strategy={rectSortingStrategy}
          disabled={!isEditable}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {items.map((item, index) => (
              <SortableImage
                key={item.id} // Stable ID as key
                id={item.id}  // Pass ID to sortable
                image={item.url}
                index={index}
                projectTitle={projectTitle}
                isEditable={isEditable}
                onImageClick={onImageClick}
                onReplace={handleReplaceClick}
                onRemove={onRemoveImage}
                onEdit={onEditImage}
              />
            ))}

            {/* Add Image Card */}
            {isEditable && (
              <div
                onClick={handleAddClick}
                className="aspect-square border-2 border-dashed border-gold/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-2 group-hover:bg-gold group-hover:text-charcoal transition-colors text-gold">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-cream/60 font-medium group-hover:text-gold">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  ref={addInputRef}
                  onChange={(e) => handleFileChange(null, e)}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};
