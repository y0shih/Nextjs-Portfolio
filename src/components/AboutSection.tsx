import React from 'react'
import { Code, Database, Rocket, Users } from 'lucide-react'
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

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I&apos;m a backend-focused developer with a background in data analysis. I specialize in building efficient APIs, managing databases, and deploying scalable systems using Node.js, TypeScript, Python and PostgreSQL. Passionate about clean code and continuous learning.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <PortfolioCard
              key={skill.title}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              delay={index * 150}
            />
          ))}
        </div>

        {/* Experience Stats */}
        <div className="mt-16 glass-card rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '700ms' }}>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '800ms' }}>
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 