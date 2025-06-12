"use client"
import React from 'react'
import { Code, Database, Rocket, Users } from 'lucide-react'

import { motion } from 'framer-motion'
import PortfolioCard from './PortfolioCard'

const AboutSection: React.FC = () => {
  const skills = [
    {
      icon: Code,
      title: "Development",
      description: "Proficient in React, TypeScript, Node.js, and modern web technologies. Building scalable applications with clean, maintainable code."
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Proficient in SQL and NoSQL databases. Experience with database design, optimization, and performance tuning."
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for speed and efficiency. Experienced in modern build tools, deployment strategies, and performance monitoring."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Strong team player with excellent communication skills. Experience working in agile environments and leading development teams."
    }
  ]

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
    <section className="py-24 px-6 bg-black/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 -z-10" />
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 glow-text"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            About Me
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            I&apos;m a backend-focused developer with a background in data analysis. I specialize in building efficient APIs, managing databases, and deploying scalable systems using Node.js, TypeScript, Python and PostgreSQL. Passionate about clean code and continuous learning.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
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
  )
}

export default AboutSection 