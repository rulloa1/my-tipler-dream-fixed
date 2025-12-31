import * as React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Trash2, GripVertical, Play } from "lucide-react";

export interface ProjectImage {
    id: string;
    project_id: string;
    image_url: string;
    title: string | null;
    description: string | null;
    display_order: number;
    is_before: boolean;
    is_after: boolean;
}

interface ImageCardProps {
    image: ProjectImage;
    index: number;
    isDragging: boolean;
    isDropTarget: boolean;
    onDragStart: (index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragEnd: () => void;
    onDragLeave: () => void;
    onDelete: (image: ProjectImage) => void;
    onToggleBeforeAfter: (image: ProjectImage, field: 'is_before' | 'is_after') => void;
}

export const ImageCard = ({
    image,
    index,
    isDragging,
    isDropTarget,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragLeave,
    onDelete,
    onToggleBeforeAfter
}: ImageCardProps) => {
    return (
        <div
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
            onDragLeave={onDragLeave}
            className={`relative group rounded-xl transition-all duration-300 cursor-move overflow-hidden border ${isDragging
                ? 'opacity-40 scale-95 ring-2 ring-gold border-gold'
                : isDropTarget
                    ? 'ring-2 ring-gold scale-105 shadow-2xl border-gold z-10'
                    : 'bg-charcoal-light border-white/5 hover:border-gold/30 hover:shadow-xl hover:translate-y-[-2px]'
                }`}
        >
            <div className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-md rounded-lg p-2 shadow-lg group-hover:bg-gold transition-colors duration-300">
                <GripVertical className="h-4 w-4 text-white group-hover:text-charcoal" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

            <div className="relative aspect-square overflow-hidden bg-charcoal-dark">
                {image.image_url.match(/\.(mp4|webm|ogg)$/i) || image.image_url.includes('youtube.com') || image.image_url.includes('vimeo.com') ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                        <img
                            src={image.image_url.includes('youtube.com') ? `https://img.youtube.com/vi/${image.image_url.split('v=')[1]?.split('&')[0]}/0.jpg` : image.image_url}
                            alt={image.title || "Project video"}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                                (e.target as HTMLImageElement).className = "w-full h-full object-cover opacity-20 grayscale";
                            }}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                                <Play className="w-5 h-5 text-charcoal fill-current ml-0.5" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <img
                        src={image.image_url}
                        alt={image.title || "Project image"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                    />
                )}
            </div>

            <div className="p-4 space-y-4 bg-charcoal-light">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-cream/40 uppercase tracking-widest">Image {index + 1}</p>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(image)}
                        className="h-8 w-8 text-cream/40 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className={`
                        flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer hover:bg-white/5
                        ${image.is_before ? 'bg-gold/10 border-gold/30' : 'bg-transparent border-white/5'}
                    `}
                        onClick={() => onToggleBeforeAfter(image, 'is_before')}
                    >
                        <Checkbox
                            checked={image.is_before}
                            onCheckedChange={() => onToggleBeforeAfter(image, 'is_before')}
                            className="border-white/20 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <Label className="text-xs font-medium text-cream cursor-pointer">Before</Label>
                    </div>

                    <div className={`
                        flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer hover:bg-white/5
                        ${image.is_after ? 'bg-gold/10 border-gold/30' : 'bg-transparent border-white/5'}
                    `}
                        onClick={() => onToggleBeforeAfter(image, 'is_after')}
                    >
                        <Checkbox
                            checked={image.is_after}
                            onCheckedChange={() => onToggleBeforeAfter(image, 'is_after')}
                            className="border-white/20 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                        />
                        <Label className="text-xs font-medium text-cream cursor-pointer">After</Label>
                    </div>
                </div>
            </div>
        </div>
    );
};
