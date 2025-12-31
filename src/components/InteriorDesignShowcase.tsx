import { useProjectsByCategory } from "@/hooks/useProjects";
import ProjectGallery from "./ProjectGallery";

const InteriorDesignShowcase = () => {
  const { projects: architectureProjects, loading: loadingArch } = useProjectsByCategory("Architecture");
  const { projects: interiorProjects, loading: loadingInt } = useProjectsByCategory("Interiors");

  if (loadingArch || loadingInt) {
    return <div className="py-20 text-center">Loading projects...</div>;
  }

  return (
    <div className="space-y-20">
      <section>
        <h2 className="text-3xl font-serif mb-8">Architecture</h2>
        <ProjectGallery projects={architectureProjects} />
      </section>

      <section>
        <h2 className="text-3xl font-serif mb-8">Interiors</h2>
        <ProjectGallery projects={interiorProjects} />
      </section>
    </div>
  );
};

export default InteriorDesignShowcase;
