'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, User, Code, Briefcase, Mail } from 'lucide-react'

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home')

  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'expertise', label: 'Expertise', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.snap-section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const sectionElement = section as HTMLElement
        const sectionTop = sectionElement.offsetTop
        const sectionHeight = sectionElement.offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId || 'home')
        }
      })
    }

    // Handle initial hash navigation
    const handleHashNavigation = () => {
      const hash = window.location.hash.substring(1) // Remove the '#'
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
            setActiveSection(hash)
          }, 100) // Small delay to ensure page is loaded
        }
      }
    }

    // Handle hash navigation on page load
    handleHashNavigation()
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      // Update URL hash without triggering a page reload
      window.history.pushState(null, '', `#${sectionId}`)
    }
  }

  return (
    <motion.nav
      className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 nav-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 0, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="glass-card rounded-full p-2 backdrop-blur-md">
        <div className="flex flex-col space-y-2">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            
            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative p-3 rounded-full transition-all duration-300 group ${
                  isActive 
                    ? 'bg-primary/20 text-primary glow-text' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={section.label}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <motion.span
                  className="absolute right-full mr-3 px-2 py-1 text-sm glass-card rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                >
                  {section.label}
                </motion.span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation 