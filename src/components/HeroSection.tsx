"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { Briefcase, Mail, MapPin, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "./ui/GradientText";

const HeroSection: React.FC = () => {
  const roles = useMemo(() => [
    { text: "Web Developer" },
    { text: "Data Analyst" },
    { text: "Software Engineer" },
    { text: "Software Developer" },
  ], []);

  // Video configuration
  const videos = useMemo(
    () => [
      { src: "/videos/transitions/2.mp4", start: 0, duration: 11000 },
      { src: "/videos/transitions/3.mp4", start: 0, duration: 10000 },
    ],
    []
  );

  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(new Array(videos.length).fill(false));
  const [allVideosPreloaded, setAllVideosPreloaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoCache = useRef<HTMLVideoElement[]>([]);

  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBetweenRoles = 1500;

  // Preload all videos once at component mount
  useEffect(() => {
    const preloadAllVideos = async () => {
      const loadPromises = videos.map(async (video, index) => {
        try {
          const videoElement = document.createElement('video');
          videoElement.preload = 'metadata';
          videoElement.muted = true;
          videoElement.playsInline = true;
          
          return new Promise<void>((resolve) => {
            const timeout = setTimeout(() => {
              console.warn(`Video ${index} loading timeout:`, video.src);
              resolve();
            }, 10000);
            
            const handleReady = () => {
              clearTimeout(timeout);
              videoCache.current[index] = videoElement;
              setVideosLoaded(prev => {
                const updated = [...prev];
                updated[index] = true;
                return updated;
              });
              console.log(`Video ${index} preloaded:`, video.src);
              resolve();
            };
            
            const handleError = () => {
              clearTimeout(timeout);
              console.warn(`Video ${index} failed to load:`, video.src);
              resolve();
            };
            
            videoElement.addEventListener('loadedmetadata', handleReady);
            videoElement.addEventListener('error', handleError);
            videoElement.src = video.src;
            
            if (video.start > 0) {
              videoElement.currentTime = video.start / 1000;
            }
          });
        } catch (error) {
          console.warn(`Failed to preload video ${index}:`, error);
        }
      });

      await Promise.all(loadPromises);
      setAllVideosPreloaded(true);
      console.log('All videos preloaded successfully');
    };

    preloadAllVideos();
  }, [videos]);

  // Video transition effect - use preloaded videos
  useEffect(() => {
    if (!allVideosPreloaded) return;

    console.log(`Playing preloaded video ${currentVideoIndex}: ${videos[currentVideoIndex].src}`);

    const videoTimer = setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, videos[currentVideoIndex].duration);

    return () => clearTimeout(videoTimer);
  }, [currentVideoIndex, videos, allVideosPreloaded]);

  const handleVideoLoad = useCallback(() => {
    if (videoRef.current && videos[currentVideoIndex].start > 0) {
      videoRef.current.currentTime = videos[currentVideoIndex].start / 1000;
    }
  }, [currentVideoIndex, videos]);

  const handleVideoError = useCallback(() => {
    console.error(`Video error: ${videos[currentVideoIndex].src}`);
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 1000);
  }, [currentVideoIndex, videos]);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[roleIndex].text;
      setCurrentText((prevText) =>
        isDeleting
          ? fullText.substring(0, prevText.length - 1)
          : fullText.substring(0, prevText.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), delayBetweenRoles);
      } else if (isDeleting && currentText === "") {
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

  const fadeInUpVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const videoVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <section className="h-screen w-full relative flex items-center justify-center px-6 snap-start">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">

        {/* Debug info - remove in production */}
        <div className="absolute top-4 left-4 z-50 bg-black/70 text-white px-3 py-1 rounded text-sm">
          {/* Video {currentVideoIndex + 1}/{videos.length}: {videos[currentVideoIndex].src.split('/').pop()} */}
        </div>

        {/* Video player - show once first video is ready */}
        {videosLoaded[0] && (
          <AnimatePresence mode="wait">
            <motion.video
              key={currentVideoIndex}
              autoPlay
              muted
              playsInline
              className="absolute min-w-full min-h-full object-cover"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
              }}
              variants={videoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              ref={videoRef}
              src={videoCache.current[currentVideoIndex]?.src || videos[currentVideoIndex].src}
            >
              Your browser does not support the video tag.
            </motion.video>
          </AnimatePresence>
        )}

        {/* tinted overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

        {/*  gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

      <motion.div
        className="max-w-7xl mx-auto w-full relative z-20"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Profile Card */}
          <motion.div
            className="glass-card rounded-2xl p-6 relative overflow-hidden lg:max-w-md mx-auto w-full flex flex-col items-center shadow-lg backdrop-blur-md"
            variants={fadeInUpVariants}
          >
            {/* Wavy background placeholder */}
            <div className="relative glass-card top-0 left-0 w-full h-48 rounded-t-2xl">
              <Image
                src="/profile/house.png"
                alt="Background Profile Banner"
                fill
                className="rounded-t-2xl object-cover"
              />
              {/* Profile Image - positioned to overlap */}
              <div className="absolute z-10 w-40 h-40 rounded-full overflow-hidden border-4 border-transparent bg-transparent shadow-md left-1/2 -translate-x-1/2 bottom-[-80px]">
                <Image
                  src="/profile/profile.png"
                  alt="Profile"
                  width={160}
                  height={160}
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-2xl font-bold text-center mb-1 pt-[80px]">
              Do Phu Trong
            </div>
            <div className="text-lg text-primary flex items-center space-x-2 mb-4">
              <Briefcase className="w-5 h-5 text-blue-400" />
              {/* <span>Software Engineer</span> */}
            </div>
            <div className="text-lg text-muted-foreground mb-2 flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>trongh1337@gmail.com</span>
            </div>
            <div className="text-lg text-muted-foreground mb-2 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>Ho Chi Minh, Viet Nam</span>
            </div>
          </motion.div>

          {/* */}
          <div className="text-center lg:text-left">
            {/* Name and Title (from original HeroSection) */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4 glow-text"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Do Phu Trong */}
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-6"
              variants={fadeInUpVariants}
            >
              <GradientText>I am a {currentText}</GradientText>
            </motion.h2>

            {/* Description (from original HeroSection) */}
            <motion.p
              className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed "
              variants={fadeInUpVariants}
            >
              Software developer focused on building scalable backend systems
              and APIs. Passionate about database optimization, security, and
              cloud deployment solutions.
            </motion.p>

            {/* Social Links (from original HeroSection) */}
            <motion.div
              className="flex justify-center lg:justify-start space-x-4 mb-8"
              variants={fadeInUpVariants}
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/y0shih",
                  label: "GitHub Profile",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/",
                  label: "LinkedIn Profile",
                },
                {
                  icon: Mail,
                  href: "mailto:trongh1337@gmail.com",
                  label: "Email",
                },
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
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-6 h-6 text-foreground" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;