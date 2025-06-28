"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Github, ExternalLink, Code2, Database, Globe, ChevronDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const params = useParams();
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link 
            href="/#projects"
            className="glass-card glass-hover rounded-lg px-6 py-3 text-foreground font-semibold inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  const ProjectIcon = project.type === "web-app" ? Globe : project.type === "software" ? Database : Code2;

  return (
    <main className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/#projects"
          className="glass-card glass-hover rounded-lg px-4 py-2 text-foreground font-semibold inline-flex items-center space-x-2 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </Link>

        {/* Project Header */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="glass-card rounded-lg p-3">
                <ProjectIcon className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold glow-text">{project.title}</h1>
            </div>
            <div className="flex space-x-2">
              {project.githubUrlFE && project.githubUrlBE ? (
                <div className="relative group">
                  <button className="glass-card glass-hover rounded-lg p-3 flex items-center space-x-2">
                    <Github className="w-5 h-5 text-foreground" />
                    <ChevronDown className="w-4 h-4 text-foreground" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg z-10 hidden group-hover:block">
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
                </div>
              ) : project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card glass-hover rounded-lg p-3"
                >
                  <Github className="w-5 h-5 text-foreground" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card glass-hover rounded-lg p-3"
                >
                  <ExternalLink className="w-5 h-5 text-foreground" />
                </a>
              )}
            </div>
          </div>

          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1 glass-card rounded-full text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Content */}
        <div className="space-y-8">
          {/* Featured Image */}
          {project.featuredImage && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <Image
                src={project.featuredImage}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Project Details */}
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <div className="prose prose-invert max-w-none">
              {project.details}
            </div>
          </div>

          {/* Features */}
          {project.features && (
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="glass-card rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="glass-card rounded-xl overflow-hidden">
                    <Image
                      src={image}
                      alt={`${project.title} gallery image ${index + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Demo Video */}
          {project.demoVideo && (
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Demo Video</h2>
              <div className="aspect-video relative">
                <iframe
                  src={project.demoVideo}
                  className="absolute inset-0 w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail; 