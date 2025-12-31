import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, Link as LinkIcon, Plus } from "lucide-react";

interface ImageUploaderProps {
    selectedProject: string | null;
    uploading: boolean;
    onFileUpload: (file: File) => void;
    onUrlAdd: (url: string, title: string) => void;
}

export const ImageUploader = ({
    selectedProject,
    uploading,
    onFileUpload,
    onUrlAdd,
}: ImageUploaderProps) => {
    const [imageUrl, setImageUrl] = useState("");
    const [imageTitle, setImageTitle] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !selectedProject) {
            toast.error("Please select a file and project");
            return;
        }
        onFileUpload(file);
        if (event.target) event.target.value = "";
    };

    const handleUrlSubmit = () => {
        if (!imageUrl.trim() || !selectedProject) {
            toast.error("Please enter an image URL and select a project");
            return;
        }
        onUrlAdd(imageUrl, imageTitle);
        setImageUrl("");
        setImageTitle("");
    };

    if (!selectedProject) return null;

    return (
        <div className="w-full">
            <h3 className="text-sm uppercase tracking-widest text-cream/40 mb-4 font-medium">Add New Imagery</h3>

            <Tabs defaultValue="upload" className="w-full">
                <TabsList className="bg-black/20 border border-white/5 w-full justify-start p-1 h-auto mb-6">
                    <TabsTrigger
                        value="upload"
                        className="data-[state=active]:bg-gold data-[state=active]:text-charcoal text-cream/60 py-2.5 px-6"
                    >
                        <UploadCloud className="w-4 h-4 mr-2" />
                        Upload Device
                    </TabsTrigger>
                    <TabsTrigger
                        value="url"
                        className="data-[state=active]:bg-gold data-[state=active]:text-charcoal text-cream/60 py-2.5 px-6"
                    >
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Add via URL
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-0">
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-gold/30 transition-colors bg-white/2 group cursor-pointer relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <UploadCloud className="w-6 h-6 text-gold opacity-80" />
                            </div>
                            <div>
                                <h4 className="text-cream font-medium">Click to upload image</h4>
                                <p className="text-xs text-cream/40 mt-1">SVG, PNG, JPG or WEBP (max 10MB)</p>
                            </div>
                            {uploading && (
                                <div className="text-gold text-xs font-medium animate-pulse">Uploading...</div>
                            )}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="url" className="mt-0 space-y-4">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="image-title" className="text-xs uppercase tracking-widest text-cream/30">Image Title (Optional)</Label>
                            <Input
                                id="image-title"
                                type="text"
                                placeholder="e.g., Living Room Perspective"
                                value={imageTitle}
                                onChange={(e) => setImageTitle(e.target.value)}
                                disabled={uploading}
                                className="bg-black/20 border-white/10 text-cream placeholder:text-white/20 h-10 focus:border-gold/50 focus:ring-gold/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image-url" className="text-xs uppercase tracking-widest text-cream/30">Image URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="image-url"
                                    type="text"
                                    placeholder="https://"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    disabled={uploading}
                                    className="bg-black/20 border-white/10 text-cream placeholder:text-white/20 h-10 focus:border-gold/50 focus:ring-gold/20"
                                />
                                <Button
                                    onClick={handleUrlSubmit}
                                    disabled={uploading || !imageUrl.trim()}
                                    className="bg-gold hover:bg-gold-light text-charcoal font-medium"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
