import { Project } from "@/hooks/useProjects";
import { Link } from "react-router-dom";

interface ProjectGalleryProps {
    projects: Project[];
}

const ProjectGallery = ({ projects }: ProjectGalleryProps) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <Link key={project.id} to={`/project/${project.id}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-muted mb-4">
                        {project.image_url ? (
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <span className="text-gray-400">No Image</span>
                            </div>
                        )}
                    </div>
                    <h3 className="text-lg font-serif">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.category}</p>
                </Link>
            ))}
        </div>
    );
};

export default ProjectGallery;
