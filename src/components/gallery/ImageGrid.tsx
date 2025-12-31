import * as React from "react";
import { useState } from "react";
import { GripVertical } from "lucide-react";
import { ImageCard, ProjectImage } from "./ImageCard";
import { motion } from "framer-motion";

interface ImageGridProps {
    images: ProjectImage[];
    onDelete: (image: ProjectImage) => void;
    onToggleBeforeAfter: (image: ProjectImage, field: 'is_before' | 'is_after') => void;
    onReorder: (newImages: ProjectImage[]) => void;
}

export const ImageGrid = ({
    images,
    onDelete,
    onToggleBeforeAfter,
    onReorder
}: ImageGridProps) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        setDragOverIndex(index);
    };

    const handleDragEnd = () => {
        if (draggedIndex === null || dragOverIndex === null || draggedIndex === dragOverIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const newImages = [...images];
        const draggedImage = newImages[draggedIndex];
        newImages.splice(draggedIndex, 1);
        newImages.splice(dragOverIndex, 0, draggedImage);

        onReorder(newImages);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    if (images.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-serif text-cream luxury-heading">
                        Project Images <span className="text-gold/60 text-lg">({images.length})</span>
                    </h2>
                </div>
                <div className="bg-white/5 rounded-full px-4 py-1.5 border border-white/5 flex items-center gap-2 text-xs text-cream/60">
                    <GripVertical className="h-3 w-3 text-gold" />
                    <span className="uppercase tracking-widest font-medium">Drag to reorder</span>
                </div>
            </div>
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {images.map((image, index) => (
                    <ImageCard
                        key={image.id}
                        image={image}
                        index={index}
                        isDragging={draggedIndex === index}
                        isDropTarget={dragOverIndex === index && draggedIndex !== index}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        onDragLeave={() => setDragOverIndex(null)}
                        onDelete={onDelete}
                        onToggleBeforeAfter={onToggleBeforeAfter}
                    />
                ))}
            </motion.div>
        </div>
    );
};
