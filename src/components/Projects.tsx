
import ProjectCard from "./ProjectCard";
import { projectData } from "./constant";

const Projects = () => {
  return (
   <div className="py-32 max-w-7xl mx-auto px-8" id="projects">
      <div className="flex gap-4 flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-3xl min-[430px]:text-4xl md:text-5xl font-bold dark:text-stone-200">
          My portfolio
        </h2>
        </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-8">
        {projectData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;