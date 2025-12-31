import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Loader2, Wand2, Download, Save } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AIRedesignDialogProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string | null;
    onSave: (newImageUrl: string) => void;
}

// Convert image URL to Base64
const urlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const AIRedesignDialog = ({ isOpen, onClose, imageUrl, onSave }: AIRedesignDialogProps) => {
    const [style, setStyle] = useState("modern luxury");
    const [creativity, setCreativity] = useState([50]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!imageUrl) return;

        setIsGenerating(true);
        setStatusMessage("Analyzing room structure...");
        setGeneratedImage(null);

        try {
            // Get Base64 of the image
            const base64Image = await urlToBase64(imageUrl);

            // Call the edge function instead of OpenAI directly
            const { data, error } = await supabase.functions.invoke('generate-design', {
                body: { imageBase64: base64Image, style }
            });

            if (error) {
                throw new Error(error.message || 'Failed to generate design');
            }

            if (data?.imageUrl) {
                setGeneratedImage(data.imageUrl);
                toast.success("Design generated!");
            } else {
                throw new Error("No image returned");
            }

        } catch (error) {
            console.error("AI Generation Error:", error);
            toast.error("Failed to generate design. Check console.");
        } finally {
            setIsGenerating(false);
            setStatusMessage("");
        }
    };

    const handleSave = () => {
        if (generatedImage) {
            onSave(generatedImage);
            onClose();
        }
    };

    const downloadImage = () => {
        if (generatedImage) {
            window.open(generatedImage, "_blank");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl bg-card text-card-foreground">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif text-primary flex items-center gap-2">
                        <Wand2 className="w-6 h-6" />
                        AI Interior Redesign
                    </DialogTitle>
                    <DialogDescription>
                        Experiment with different styles using AI-powered design generation.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    {/* Controls Sidebar */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label>Design Style</Label>
                            <Select value={style} onValueChange={setStyle}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Modern Luxury">Modern Luxury</SelectItem>
                                    <SelectItem value="Minimalist Scandinavian">Scandinavian</SelectItem>
                                    <SelectItem value="Industrial Chic">Industrial Chic</SelectItem>
                                    <SelectItem value="Modern Farmhouse">Modern Farmhouse</SelectItem>
                                    <SelectItem value="Mid-Century Modern">Mid-Century Modern</SelectItem>
                                    <SelectItem value="Coastal Contemporary">Coastal</SelectItem>
                                    <SelectItem value="Dark Academia">Dark Academia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Creativity Level: {creativity}%</Label>
                            <Slider
                                value={creativity}
                                onValueChange={setCreativity}
                                max={100}
                                step={1}
                                className="py-4"
                            />
                            <p className="text-xs text-muted-foreground">
                                (Note: AI will reimagine the space based on the layout, not strictly adhere to pixel placement.)
                            </p>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            disabled={isGenerating || !imageUrl}
                            className="w-full"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Generate Redesign
                                </>
                            )}
                        </Button>

                        {isGenerating && (
                            <p className="text-sm text-center text-primary animate-pulse">
                                {statusMessage}
                            </p>
                        )}
                    </div>

                    {/* Preview Area */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="space-y-2 flex flex-col">
                                <Label>Original</Label>
                                <div className="flex-1 rounded-lg overflow-hidden border bg-muted/50 relative min-h-[300px]">
                                    {imageUrl && <img src={imageUrl} alt="Original" className="absolute inset-0 w-full h-full object-cover" />}
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <Label>AI Proposal</Label>
                                <div className="flex-1 rounded-lg overflow-hidden border bg-muted/50 relative min-h-[300px] flex items-center justify-center group">
                                    {generatedImage ? (
                                        <>
                                            <img src={generatedImage} alt="Generated" className="absolute inset-0 w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button variant="secondary" size="sm" onClick={downloadImage}>
                                                    <Download className="mr-2 h-4 w-4" /> Open Full Res
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center p-4 text-muted-foreground">
                                            <Wand2 className="mx-auto h-8 w-8 mb-2 opacity-50" />
                                            <p className="text-sm">Select style & generate</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!generatedImage}>
                        <Save className="mr-2 h-4 w-4" />
                        Add to Gallery
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
