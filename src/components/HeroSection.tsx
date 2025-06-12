'use client'

import React from 'react'
import Image from 'next/image'
import { Github, Linkedin, Mail, Download } from 'lucide-react'
import profileImage from '../assets/images/profile.png'

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background floating programming language logos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* React Logo */}
        <div className="absolute top-20 left-10 w-24 h-24 glass-card rounded-xl floating-animation opacity-30 flex items-center justify-center">
          <div className="text-2xl font-bold text-primary">⚛️</div>
        </div>
        
        {/* TypeScript Logo */}
        <div className="absolute top-40 right-20 w-20 h-20 glass-card rounded-xl floating-delayed opacity-40 flex items-center justify-center">
          <div className="text-lg font-bold text-blue-400">TS</div>
        </div>
        
        {/* JavaScript Logo */}
        <div className="absolute bottom-32 left-1/4 w-28 h-28 glass-card rounded-xl floating-animation opacity-35 flex items-center justify-center">
          <div className="text-xl font-bold text-yellow-400">JS</div>
        </div>
        
        {/* Node.js Logo */}
        <div className="absolute bottom-40 right-32 w-22 h-22 glass-card rounded-xl floating-delayed opacity-30 flex items-center justify-center">
          <div className="text-sm font-bold text-green-400">1337</div>
        </div>
        
        {/* Python Logo */}
        <div className="absolute top-1/2 right-10 w-26 h-26 glass-card rounded-xl floating-animation opacity-25 flex items-center justify-center">
          <div className="text-lg font-bold text-blue-300">PY</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Profile Image */}
        <div className="glass-card rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center floating-animation">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white overflow-hidden relative">
            <Image 
              src={profileImage}
              alt="Profile"
              fill
              className="object-cover object-center rounded-full"
              priority
            />
          </div>
        </div>

        {/* Name and Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 glow-text fade-in-up">
          Do Phu Trong
        </h1>
        <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 fade-in-up" style={{ animationDelay: '200ms' }}>
          Full Stack Developer
        </h2>
        
        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed fade-in-up" style={{ animationDelay: '400ms' }}>
          Crafting reliable and scalable digital systems with a focus on performance, 
          security, and clean architecture. Driven by curiosity and a passion for solving real-world problems through thoughtful engineering.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-8 fade-in-up" style={{ animationDelay: '600ms' }}>
          <a 
            href="https://github.com/y0shih" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="glass-card glass-hover rounded-xl p-3"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6 text-foreground" />
          </a>
          <a 
            href="https://linkedin.com/in/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="glass-card glass-hover rounded-xl p-3"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6 text-foreground" />
          </a>
          <a 
            href="mailto:trongh1337@gmail.com" 
            className="glass-card glass-hover rounded-xl p-3"
            aria-label="Email"
          >
            <Mail className="w-6 h-6 text-foreground" />
          </a>
        </div>

        {/* CTA Button */}
        <div className="fade-in-up" style={{ animationDelay: '800ms' }}>
          <button 
            onClick={() => window.open('/CV-Intern.pdf', '_blank')}
            className="glass-card glass-hover rounded-xl px-8 py-4 text-foreground font-semibold flex items-center mx-auto space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 