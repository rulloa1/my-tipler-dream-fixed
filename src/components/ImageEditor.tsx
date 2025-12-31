import { Button } from "@/components/ui/button";

interface ImageEditorProps {
    imageUrl: string;
    onSave: (editedUrl: string) => void;
    onCancel: () => void;
}

const ImageEditor = ({ imageUrl, onSave, onCancel }: ImageEditorProps) => {
    return (
        <div className="p-4 border rounded-md bg-background">
            <h3 className="text-lg font-medium mb-4">Edit Image</h3>
            <div className="aspect-video bg-muted mb-4 relative overflow-hidden">
                <img src={imageUrl} alt="Editing" className="max-w-full h-full object-contain mx-auto" />
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSave(imageUrl)}>Save</Button>
            </div>
        </div>
    );
};

export default ImageEditor;
