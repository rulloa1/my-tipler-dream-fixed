import { motion } from 'framer-motion'
import { Project } from '../data/projects'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
    project: Project
    index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="sticky top-24 mb-[20vh] h-[70vh] w-full flex flex-col md:flex-row bg-white overflow-hidden shadow-2xl border border-concrete-200"
        >
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
                <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                    <span className="text-sm font-medium text-concrete-400 uppercase tracking-widest block mb-4">
                        0{index + 1} / {project.category}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-6">
                        {project.title}
                    </h3>
                    <p className="text-concrete-600 text-lg max-w-sm">
                        {project.description}
                    </p>
                </div>

                <div className="flex justify-between items-end">
                    <div className="text-sm uppercase tracking-widest text-concrete-400">
                        {project.location}
                    </div>
                    <Link to={`/project/${project.id}`} className="text-sm uppercase tracking-widest font-bold border-b border-concrete-900 pb-1 hover:text-concrete-400 hover:border-concrete-400 transition-colors">
                        View Project
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
