import { useParams, Link } from "react-router-dom";
import { designAlbums } from "@/data/design-albums";
import { useMemo } from "react";
import { useGalleryOrder } from "@/hooks/useGalleryOrder";
import { DetailLayout } from "@/components/layout/DetailLayout";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const DesignDetail = () => {
    const { id } = useParams<{ id: string }>();
    const album = designAlbums.find((a) => a.id === id);

    const defaultImages = useMemo(() => album?.images || [], [album?.images]);
    const {
        images: galleryImages,
        isLoading,
        isEditable,
        toggleEditMode,
        saveGalleryOrder
    } = useGalleryOrder(id || "design", defaultImages);

    if (!album) {
        return (
            <Layout>
                <div className="pt-32 pb-24 bg-cream min-h-screen">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl font-serif text-charcoal mb-4">Album Not Found</h1>
                        <Link to="/design">
                            <Button>Back to Design</Button>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const albumIndex = designAlbums.findIndex((a) => a.id === id);
    const nextAlbum = designAlbums[(albumIndex + 1) % designAlbums.length];
    const prevAlbum = designAlbums[(albumIndex - 1 + designAlbums.length) % designAlbums.length];

    return (
        <DetailLayout
            title={album.title}
            category="Design Album"
            galleryImages={galleryImages}
            isLoading={isLoading}
            isEditable={isEditable}
            toggleEditMode={toggleEditMode}
            onOrderChange={saveGalleryOrder}
            backLink={{ to: "/design", label: "Back to Collections" }}
            showCTA={true}
            prevItem={{
                id: prevAlbum.id,
                title: prevAlbum.title,
                coverImage: prevAlbum.coverImage,
                link: `/design/${prevAlbum.id}`
            }}
            nextItem={{
                id: nextAlbum.id,
                title: nextAlbum.title,
                coverImage: nextAlbum.coverImage,
                link: `/design/${nextAlbum.id}`
            }}
            hero={
                <section className="pt-32 pb-16 bg-cream">
                    <div className="container mx-auto px-6">
                        <Link
                            to="/design"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Collections
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-serif text-charcoal mb-4">{album.title}</h1>
                            <p className="text-xl text-muted-foreground">{album.description}</p>
                        </motion.div>
                    </div>
                </section>
            }
            content={
                 // DesignDetail doesn't have extra content between Hero and Gallery, so we pass null or empty fragment
                <></>
            }
        />
    );
};

export default DesignDetail;
