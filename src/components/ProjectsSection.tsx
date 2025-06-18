"use client";

import React, { useState } from "react";
import { Github, ExternalLink, Code2, Database, TabletSmartphone, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  githubUrlFE?: string;
  githubUrlBE?: string;
  liveUrl?: string;
  image?: string;
  type: "web-app" | "software" | "fullstack" | "mobile";
  slug: string;
}

const ProjectsSection: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (projectTitle: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === projectTitle ? null : projectTitle);
  };

  const getProjectIcon = (type: Project["type"]) => {
    switch (type) {
      case "web-app":
        return Globe;
      case "software":
        return Database;
      case "fullstack":
        return Code2;
      case "mobile":
        return TabletSmartphone;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="h-screen py-12 px-6 bg-black backdrop-blur-sm relative flex items-center">
      <div className="absolute inset-0 from-black/50 -z-10" />
      <motion.div 
        className="max-w-6xl mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 glow-text"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Here are some of my recent projects that showcase my expertise in
            full-stack development, API design, and web application
            architecture.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {projects.map((project, index) => {
            const ProjectIcon = getProjectIcon(project.type);
            const hasMultipleRepos = project.githubUrlFE && project.githubUrlBE;
            
            return (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="h-[400px] w-full"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="glass-card glass-hover rounded-xl p-4 fade-in-up transition-all duration-300 hover:scale-[1.02] block bg-black/30 backdrop-blur-sm group h-full w-full flex flex-col"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="glass-card rounded-lg p-2">
                      <ProjectIcon className="w-4 h-4 text-primary" />
                    </div>
                    
                    <div className="flex space-x-2">
                      {hasMultipleRepos ? (
                        <div className="relative">
                          <button
                            onClick={(e) => toggleDropdown(project.title, e)}
                            className="glass-card glass-hover rounded-lg p-2 hover:scale-110 transition-all duration-300 flex items-center space-x-1 hover:glow-text"
                          >
                            <Github className="w-4 h-4 text-foreground" />
                            <ChevronDown className={`w-3 h-3 text-foreground transition-transform ${activeDropdown === project.title ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {activeDropdown === project.title && (
                            <div className="absolute right-0 mt-2 w-40 glass-card rounded-lg shadow-lg z-10 overflow-hidden bg-black/30 backdrop-blur-sm">
                              <a
                                href={project.githubUrlFE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-3 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-blue-400 hover:glow-text transition-all duration-300"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Front-end Repository
                              </a>
                              <a
                                href={project.githubUrlBE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-3 py-2 text-xs text-foreground hover:bg-primary/10 hover:text-blue-400 hover:glow-text transition-all duration-300 border-t border-primary/10"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Back-end Repository
                              </a>
                            </div>
                          )}
                        </div>
                      ) : project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-card glass-hover rounded-lg p-2 hover:scale-110 transition-all duration-300 hover:glow-text"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4 text-foreground" />
                        </a>
                      )}
                      
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-card glass-hover rounded-lg p-2 hover:scale-110 transition-all duration-300 hover:glow-text"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 text-foreground" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-auto">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 glass-card rounded-full text-muted-foreground transition-all duration-300 hover:text-blue-400 hover:glow-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-6"
          variants={itemVariants}
        >
          <motion.a
            href="https://github.com/y0shih"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card glass-hover rounded-lg px-6 py-3 text-foreground font-semibold inline-flex items-center space-x-2 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:text-blue-400 hover:glow-text"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Github className="w-5 h-5" />
            <span>View More Projects</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
