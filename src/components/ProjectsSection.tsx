"use client";

import React, { useState } from "react";
import { Github, ExternalLink, Code2, Database, Globe, ChevronDown } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  githubUrlFE?: string;
  githubUrlBE?: string;
  liveUrl?: string;
  image?: string;
  type: "web-app" | "software" | "fullstack";
}

const ProjectsSection: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (projectTitle: string) => {
    setActiveDropdown(activeDropdown === projectTitle ? null : projectTitle);
  };

  const projects: Project[] = [
    {
      title: "MeoStationery - E-Commerce Web App",
      description:
        "A full-stack e-commerce platform built with Next.js, Node.js, Prisma and PostgreSQL. Features include real-time inventory management, payment processing, and admin dashboard.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Tembo.io", "Prisma"],
      githubUrl: "https://github.com/Goatt69/meo_stationery",
      liveUrl: "https://meostationery.netlify.app/",
      type: "fullstack",
    },
    {
      title: "Deadlock ESP - Game Cheating Software ",
      description: "A cheat software built mainly in Rust and C#",
      technologies: ["C++", "C#", ".NET", "Rust"],
      githubUrl: "https://github.com/y0shih/deadlock-cheese",
      type: "software",
    },
    {
      title: "WyA - Real-time Location Chatting Platform",
      description:
        "WyA is a real-time location-based chat app where users can join nearby chat rooms. Built with Ionic React, TypeScript, Nodejs with smooth animations powered by Framer Motion.",
      technologies: ["Ionic React", "TypeScript", "Nodejs", "Firebase"],
      githubUrlFE: "https://github.com/duy08k4/WyA_Frontend",
      githubUrlBE: "https://github.com/duy08k4/WyA_Backend",
      liveUrl: "https://wy-a-introduction.vercel.app/",
      type: "web-app",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern portfolio website showcasing projects and skills. Built with Next.js and Tailwind CSS, featuring smooth animations and responsive design.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://nextjs-portfolio-u735.vercel.app/",
      type: "web-app",
    },
  ];

  const getProjectIcon = (type: Project["type"]) => {
    switch (type) {
      case "web-app":
        return Globe;
      case "software":
        return Database;
      case "fullstack":
        return Code2;
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my expertise in
            full-stack development, API design, and web application
            architecture.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const ProjectIcon = getProjectIcon(project.type);
            const hasMultipleRepos = project.githubUrlFE && project.githubUrlBE;
            
            return (
              <div
                key={project.title}
                className="glass-card glass-hover rounded-xl p-6 fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="glass-card rounded-lg p-2">
                    <ProjectIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex space-x-2">
                    {hasMultipleRepos ? (
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(project.title)}
                          className="glass-card glass-hover rounded-lg p-2 hover:scale-110 transition-transform flex items-center space-x-1"
                        >
                          <Github className="w-5 h-5 text-foreground" />
                          <ChevronDown className={`w-4 h-4 text-foreground transition-transform ${activeDropdown === project.title ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {activeDropdown === project.title && (
                          <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg z-10 overflow-hidden">
                            <a
                              href={project.githubUrlFE}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                            >
                              Front-end Repository
                            </a>
                            <a
                              href={project.githubUrlBE}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors border-t border-primary/10"
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
                        className="glass-card glass-hover rounded-lg p-2 hover:scale-110 transition-transform"
                      >
                        <Github className="w-5 h-5 text-foreground" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card glass-hover rounded-lg p-2 hover:scale-110 transition-transform"
                      >
                        <ExternalLink className="w-5 h-5 text-foreground" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 glass-card rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/y0shih"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card glass-hover rounded-lg px-6 py-3 text-foreground font-semibold inline-flex items-center space-x-2"
          >
            <Github className="w-5 h-5" />
            <span>View More Projects</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
