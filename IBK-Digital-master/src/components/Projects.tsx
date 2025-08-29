import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiOutlineExternalLink } from 'react-icons/hi';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectProps {
  isDark: boolean;
}

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce platform with real-time inventory, AI-powered recommendations, and seamless payment integration.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubLink: "https://github.com/ibrahimkeyboad/shop",
    liveLink: "https://shop-iota-eight.vercel.app"
  },
  {
    title: "Mobile Banking App",
    category: "Mobile Development",
    description: "Secure and intuitive mobile banking application with biometric authentication and real-time transactions.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
    githubLink: "https://github.com/ibrahimkeyboad/chat-app",
    liveLink: "https://chat-app-iota-eight.vercel.app"
  },
  {
    title: "AI Content Platform",
    category: "AI Solutions",
    description: "Content generation platform powered by AI, helping businesses create engaging content at scale.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#",
    technologies: ["Python", "TensorFlow", "FastAPI", "Next.js"],
    githubLink: "https://github.com/ibrahimkeyboad/ibk-digital",
    liveLink: "https://ibk-digital.vercel.app"
  },
  {
    title: "Analytics Dashboard",
    category: "Data Visualization",
    description: "Real-time analytics dashboard with interactive charts and customizable reporting features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "#",
    technologies: ["Vue.js", "D3.js", "GraphQL", "PostgreSQL"],
    githubLink: "https://github.com/ibrahimkeyboad/shop",
    liveLink: "https://shop-iota-eight.vercel.app"
  }
];

const categories = ["All", ...new Set(projects.map(project => project.category))];

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
}

const ProjectCard = ({ project, isDark }: ProjectCardProps) => (
  <motion.div
    className={`group relative rounded-2xl overflow-hidden ${
      isDark
        ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50'
        : 'bg-white/70 hover:bg-white/90 border border-gray-200'
    }`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub className="w-5 h-5" />
        </motion.a>
        <motion.a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaExternalLinkAlt className="w-5 h-5" />
        </motion.a>
      </div>
    </div>

    <div className="p-6 space-y-4">
      <div>
        <span className={`text-sm ${
          isDark ? 'text-purple-400' : 'text-purple-600'
        }`}>
          {project.category}
        </span>
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mt-1">
          {project.title}
        </h3>
      </div>

      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${
              isDark
                ? 'bg-gray-700/50 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = ({ isDark }: ProjectProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={`inline-block px-4 py-2 rounded-full mb-4 ${
            isDark
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-purple-400'
              : 'bg-purple-50 text-purple-600'
          }`}>
            Our Work
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className={`max-w-2xl mx-auto mb-8 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explore our portfolio of innovative digital solutions that have helped businesses transform and grow
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? isDark
                      ? 'bg-purple-500 text-white'
                      : 'bg-purple-600 text-white'
                    : isDark
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                isDark={isDark}
              />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent"
            whileHover={{ x: 5 }}
          >
            View All Projects <HiArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 