'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Mail } from 'lucide-react'
import profileImage from '../assets/images/profile.png'
import { motion } from 'framer-motion'
import GradientText from "./ui/GradientText"

const HeroSection: React.FC = () => {
  const roles = [
    { text: "Web Developer" },
    { text: "Data Analyst" },
    { text: "Software Engineer" },
    { text: "Software Developer" }
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150; // milliseconds per character
  const deletingSpeed = 100; // milliseconds per character
  const delayBetweenRoles = 1500; // milliseconds

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[roleIndex].text;
      setCurrentText(prevText => 
        isDeleting 
          ? fullText.substring(0, prevText.length - 1)
          : fullText.substring(0, prevText.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), delayBetweenRoles);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, roles]);

  // const floatingVariants = {
  //   initial: { y: 0 },
  //   animate: {
  //     y: [-10, 10, -10],
  //     transition: {
  //       duration: 6,
  //       repeat: Infinity,
  //       ease: "easeInOut"
  //     }
  //   }
  // };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute min-w-full min-h-full object-cover"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
          }}
        >
          <source src="/videos/sss.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to ensure content visibility */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>


      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-20"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Profile Image */}
        <motion.div 
          className="glass-card rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center floating-animation"
          variants={fadeInUpVariants}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ 
            duration: 0.3,
            floating: {
              y: [-10, 10, -10],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white overflow-hidden relative">
            <Image 
              src={profileImage}
              alt="Profile"
              fill
              className="object-cover object-center rounded-full"
              priority
            />
          </div>
        </motion.div>

        {/* Name and Title */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4 glow-text"
          variants={fadeInUpVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          Do Phu Trong
        </motion.h1>
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-6"
          variants={fadeInUpVariants}
        >
          <GradientText>
            I am a {currentText}
          </GradientText>
        </motion.h2>
        
        {/* Description */}
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          variants={fadeInUpVariants}
        >
          Engineering resilient and scalable digital ecosystems, driven by a performance-first mindset, robust security principles,
           and a commitment to elegant, maintainable architecture.
        </motion.p>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center space-x-4 mb-8"
          variants={fadeInUpVariants}
        >
          {[
            { icon: Github, href: 'https://github.com/y0shih', label: 'GitHub Profile' },
            { icon: Linkedin, href: 'https://linkedin.com/in/', label: 'LinkedIn Profile' },
            { icon: Mail, href: 'mailto:trongh1337@gmail.com', label: 'Email' }
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card glass-hover rounded-xl p-3"
              aria-label={social.label}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.1 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-6 h-6 text-foreground" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        {/* Commented out download resume button
        <motion.div variants={fadeInUpVariants}>
          <motion.button 
            onClick={() => window.open('/CV-Intern.pdf', '_blank')}
            className="glass-card glass-hover rounded-xl px-8 py-4 text-foreground font-semibold flex items-center mx-auto space-x-2"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255,255,255,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </motion.button>
        </motion.div>
        */}
      </motion.div>
    </section>
  )
}

export default HeroSection 