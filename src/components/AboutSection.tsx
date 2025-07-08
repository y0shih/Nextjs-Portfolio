"use client";
import React from "react";
import { Code, Database, Rocket } from "lucide-react";

import { motion } from "framer-motion";
import PortfolioCard from "./PortfolioCard";
import TechGlobe from "./ui/tech-globe";

const AboutSection: React.FC = () => {
  const skills = [
    {
      icon: Code,
      title: "Frontend Developer",
      description:
        "React, TypeScript, modern UI design, responsive and scalable interfaces.",
    },
    {
      icon: Code,
      title: "Backend Developer",
      description: "Node.js, Nest.js, Python, REST APIs, authentication and backend architecture.",
    },
    {
      icon: Database,
      title: "Database Engineer",
      description: "SQL & NoSQL, schema design, performance tuning.",
    },
    {
      icon: Rocket,
      title: "DevOps",
      description: "CI/CD, build optimization, automation scripts, deployment.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // const statsVariants = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut"
  //     }
  //   }
  // };

  return (
    <section className="min-h-screen py-12 px-6 bg-black backdrop-blur-sm relative flex items-center">
      <div className="absolute inset-0 from-black/50 -z-10" />
      <motion.div
        className="max-w-6xl mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Section Header */}
            <motion.div className="text-left" variants={itemVariants}>
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 glow-text"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                About Me
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground leading-relaxed"
                variants={itemVariants}
              >
                I&apos;m a 4th year student in Nong Lam University with a background in data
                analysis. I specialize in developing Backend system building efficient APIs, managing
                databases and optimizing application performance.
              </motion.p>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <PortfolioCard
                    icon={skill.icon}
                    title={skill.title}
                    description={skill.description}
                    delay={index * 150}
                    className="bg-black/30 backdrop-blur-sm"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Tech Globe */}
          <motion.div 
            className="h-[500px] w-full"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <TechGlobe />
          </motion.div>
        </div>

        {/* Experience Stats */}
        {/* <motion.div 
          className="mt-16 glass-card rounded-2xl p-8"
          variants={statsVariants}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 30px rgba(255,255,255,0.1)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "2+", label: "Years Experience" },
              { value: "30+", label: "Projects Completed" },
              { value: "20+", label: "Happy Clients" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-4xl font-bold text-primary mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div> */}
        {/* </motion.div> */}
      </motion.div>
    </section>
  );
};

export default AboutSection;
