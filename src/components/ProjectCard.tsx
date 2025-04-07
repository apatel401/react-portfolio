import ProjectTech from "./ProjectTech";
import { motion } from "framer-motion";

interface ProjectProps {
  id: string;
  heading: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveDemoUrl: string;
  sourceCodeUrl: string;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  const { heading, imageUrl, techStack, liveDemoUrl } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className=" bg-[#1a1a1a] rounded-lg p-4 sm:p-8 space-y-8"
    >
      <a href={liveDemoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg overflow-hidden block">
          <img
          src={imageUrl}
          style={{ width: "1000", height: "1000" }}
          alt={heading}
          className="hover:scale-105 transition-transform duration-700"
        />
        <div>
          <h3 className="text-white text-2xl sm:text-3xl font-semibold my-3">{heading}</h3>
          <div className="mt-4 flex flex-col sm:flex-row justify-between gap-5">
            <ProjectTech techStack={techStack} />
            {/* <a
            href={`/work/${id}`}
            className="p-3 bg-primary hover:bg-primary/80 transition-colors duration-200 rounded-lg self-start sm:self-end"
            >
            <MoveUpRight className="size-5 sm:size-8 text-[#F3F4F3] dark:text-dark-200" />
            </a> */}
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default ProjectCard;