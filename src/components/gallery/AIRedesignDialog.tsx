import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageEditor from "@/components/ImageEditor";

interface AIRedesignDialogProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    onSave: (newUrl: string) => void;
}

export const AIRedesignDialog = ({ isOpen, onClose, imageUrl, onSave }: AIRedesignDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl w-full bg-background p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle>AI Redesign</DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-2">
                    <ImageEditor
                        imageUrl={imageUrl}
                        onSave={(url) => {
                            onSave(url);
                            onClose();
                        }}
                        onCancel={onClose}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};
