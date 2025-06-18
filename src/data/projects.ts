export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  githubUrlFE?: string;
  githubUrlBE?: string;
  liveUrl?: string;
  type: "web-app" | "software" | "fullstack" | "mobile";
  slug: string;
  featuredImage?: string;
  details?: string;
  features?: string[];
  gallery?: string[];
  demoVideo?: string;
}

export const projects: Project[] = [
  {
    title: "MeoStationery - E-Commerce Web App",
    description:
      "A full-stack e-commerce platform built with Next.js, Node.js, Prisma and PostgreSQL. Features include real-time inventory management, payment processing, and admin dashboard.",
    technologies: ["Next.js", "PostgreSQL", "Tembo.io", "Prisma"],
    githubUrl: "https://github.com/y0shih/meo_stationery",
    liveUrl: "https://meostationery.netlify.app/",
    type: "fullstack",
    slug: "meo-stationery",
    featuredImage: "/projects/meo-stationery/featured.png",
    details: `meo-stationery", is a comprehensive e-commerce platform designed for stationery products. 
    The platform features a modern, responsive design and robust backend infrastructure.
    
    Key technical achievements include:
    - Implemented real-time inventory management system
    - Integrated secure payment processing
    - Developed an intuitive admin dashboard
    - Created a scalable database architecture using PostgreSQL
    - Built RESTful APIs with Node.js and Express`,
    features: [
      "Real-time inventory tracking and management",
      "Secure payment processing integration in VNPAY",
      "Admin dashboard with analytics and reporting",
      "User authentication and authorization",
      "Responsive design for all devices",
      "Product search and filtering",
      "Shopping cart and wishlist functionality"
    ],
    gallery: [
      "/projects/meo-stationery/1.png",
      "/projects/meo-stationery/2.png",
    ],
    // demoVideo: "https://www.youtube.com/embed/your-video-id"
  },
  {
    title: "Deadlock ESP - Game Cheating Software",
    description: "A cheat software built mainly in Rust and C#",
    technologies: ["C++", "C#", ".NET", "Rust"],
    githubUrl: "https://github.com/y0shih/deadlock-cheese",
    type: "software",
    slug: "deadlock-esp",
    featuredImage: "/projects/deadlock/1.png",
    details: `Deadlock ESP is a game enhancement tool developed using Rust and C#. 
    The project demonstrates advanced memory manipulation and game engine interaction techniques.
    
    Technical highlights:
    - Low-level memory management and manipulation
    - Real-time game data processing
    - Custom rendering engine integration
    - Performance optimization for minimal impact`,
    features: [
      "Real-time game data processing",
      "Custom rendering engine",
      "Memory manipulation and injection",
      "Performance optimization",
      "Anti-detection mechanisms"
    ],
    gallery: [
      "/projects/deadlock/1.png",
      "/projects/deadlock/2.png"
    ]
  },
  {
    title: "WyA - Real-time Location Chatting Platform",
    description:
      "WyA is a real-time location-based chat app where users can join nearby chat rooms. Built with Ionic React, TypeScript, Nodejs with smooth animations powered by Framer Motion.",
    technologies: ["Ionic React", "TypeScript", "Nodejs", "Firebase"],
    githubUrlFE: "https://github.com/y0shih/WyA_Frontend",
    githubUrlBE: "https://github.com/y0shih/WyA_Backend",
    liveUrl: "https://wy-a-introduction.vercel.app/",
    type: "mobile",
    slug: "wya-chat",
    featuredImage: "/projects/wya-chat/featured.jpg",
    details: `WyA is an innovative location-based chat application that connects users in real-time based on their geographical proximity.
    The platform combines modern web technologies with real-time communication features.
    
    Technical implementation:
    - Real-time location tracking and updates
    - Fully functional chat system
    - Geolocation services integration
    - Responsive mobile-first design
    - Real-time user presence system`,
    features: [
      "Real-time location-based chat rooms",
      "Geolocation services integration",
      "Real-time user presence",
      "Smooth animations and transitions",
      "Mobile-first responsive design",
      "Push notifications",
      "User authentication and profiles"
    ],
    gallery: [
      "/projects/wya-chat/gallery-1.jpg",
      "/projects/wya-chat/gallery-2.jpg",
      "/projects/wya-chat/gallery-3.jpg"
    ],
    demoVideo: "https://www.youtube.com/embed/your-video-id"
  },
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website showcasing projects and skills. Built with Next.js and Tailwind CSS, featuring smooth animations and responsive design.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/y0shih/Nextjs-Portfolio",
    liveUrl: "https://nextjs-portfolio-u735.vercel.app/",
    type: "web-app",
    slug: "portfolio",
    featuredImage: "/projects/portfolio/featured.png",
    details: `A modern, responsive portfolio website built with Next.js and Love.
    The site features smooth animations, and a clean, professional design.
    
    Key features:
    - Server-side rendering with Next.js
    - Responsive design with Tailwind CSS
    - Smooth animations with Framer Motion
    - SEO optimization`,
    features: [
      "Responsive design",
      "Smooth animations",
      "Project showcase",
      "Contact form",
      "SEO optimization",
      "Performance optimized"
    ],
    gallery: [
      "/projects/portfolio/1.png",
      "/projects/portfolio/2.png"
    ]
  }
]; 