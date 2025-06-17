"use client"

import React from 'react'
import { motion } from 'framer-motion'

const TechnicalExpertiseSection: React.FC = () => {
  const allLanguages = [
    {
      name: "JavaScript",
      logoPath: "/icons/js.svg",
      level: "Advanced"
    },
    {
      name: "TypeScript",
      logoPath: "/icons/typescript.svg",
      level: "Advanced"
    },
    {
      name: "Nextjs",
      logoPath: "/icons/next.svg",
      level: "Advanced"
    },
    {
      name: "C++",
      logoPath: "/icons/cpp.svg",
      level: "Advanced"
    },
    {
      name: "Python",
      logoPath: "/icons/python.svg",
      level: "Advanced"
    },
    {
      name: "Node.js",
      logoPath: "/icons/nodejs.svg",
      level: "Advanced"
    },
    {
      name: "TailwindCSS",
      logoPath: "/icons/tail.svg",
      level: "Advanced"
    }
  ]

  // Duplicate languages to create a continuous loop effect
  const duplicatedLanguages = [...allLanguages, ...allLanguages, ...allLanguages];

  const marqueeVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
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
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="h-screen py-12 px-6 bg-black backdrop-blur-sm relative flex items-center">
      <div className="absolute inset-0 from-black/50 -z-10" />
      <motion.div 
        className="max-w-6xl mx-auto w-full overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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
            Technical Expertise
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A comprehensive overview of my programming language expertise and technical skills.
          </motion.p>
        </motion.div>

        {/* Marquee Section */}
        <motion.div
          className="flex whitespace-nowrap"
          variants={marqueeVariants}
          animate="animate"
        >
          {duplicatedLanguages.map((language) => (
            <motion.div
              key={language.name}
              className="inline-flex items-center space-x-4 mx-6 p-3 glass-card rounded-lg flex-shrink-0 bg-black/30 backdrop-blur-sm"
            >
              <img src={language.logoPath} alt={language.name} className="w-8 h-8" />
              <h4 className="text-lg font-semibold text-foreground">
                {language.name}
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default TechnicalExpertiseSection 