export interface Skill {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Database" | "Tools";
  icon?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  coverImage: string;
  images: string[];
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  features: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    other: string[];
  };
  challenges: string;
  learnings: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
  type: "Hackathon" | "Freelance" | "College Project" | "Open Source" | "Work";
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  prize: string;
  description: string;
}

export const personalInfo = {
  name: "MYTHALESH ADITYA",
  titles: [
    "Full Stack Developer",
    "AI Engineer",
    "Problem Solver",
    "Builder"
  ],
  tagline: "I engineer high-performance web applications and intelligent systems, focusing on storytelling, clean code, and premium user experiences.",
  email: "adityamythlesh@gmail.com",
  socials: {
    github: "https://github.com/mythless",
    linkedin: "https://linkedin.com/in/mythalesh-aditya",
    twitter: "https://twitter.com/mythalesh",
    instagram: "https://instagram.com/mythalesh"
  },
  resumeUrl: "#"
};

export const aboutData = {
  profileImage: "/images/profile.jpg",
  story: `I am a Computer Science student specializing in Artificial Intelligence. My journey in technology started with a deep curiosity about how software shapes user experiences. Over the years, that curiosity evolved into a passion for building robust full-stack applications and integrating machine learning to solve real-world problems.

I bridge the gap between creative frontend design and scalable backend systems. Whether calculating complex geo-fencing boundaries using mathematical models, designing reactive interfaces with Next.js, or automating infrastructure with Docker, I approach every challenge with a commitment to quality and attention to detail.

I believe in continuous learning and build projects that make a difference. Coding is not just about writing code; it is about crafting digital solutions that feel natural, fast, and premium.`,
  timeline: [
    {
      year: "2023",
      title: "Started Specialize in AI",
      description: "Began deep-diving into machine learning architectures, statistical computing, and neural network foundations alongside core Computer Science studies."
    },
    {
      year: "2024",
      title: "Full-Stack Leap & Freelancing",
      description: "Began designing and developing client applications using React, Node.js, and Express. Created commercial workflows, integrations, and landing pages."
    },
    {
      year: "2025",
      title: "Geo-Fencing & Advanced Systems",
      description: "Architected a Geo-Fencing Attendance Tracking suite with custom React Native client and Node/Express backend incorporating Haversine calculations."
    },
    {
      year: "2026",
      title: "IoT & Scalable Architecture",
      description: "Designed a real-time Smart Parking Management system using FastAPI, Next.js, and PostgreSQL. Focused on containerization, WebSockets, and real-time streams."
    }
  ]
};

export const skillsData: Skill[] = [
  // Languages
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "Python", category: "Languages" },
  
  // Frontend
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Material UI", category: "Frontend" },
  { name: "HTML5/CSS3", category: "Frontend" },
  
  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Authentication (JWT/OAuth)", category: "Backend" },
  { name: "WebSockets", category: "Backend" },
  
  // Database
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Prisma ORM", category: "Database" },
  { name: "Redis", category: "Database" },
  
  // Tools
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Docker", category: "Tools" },
  { name: "Postman", category: "Tools" },
  { name: "Vercel", category: "Tools" }
];

export const projectsData: Project[] = [
  {
    slug: "geo-fencing-attendance",
    title: "Geo-Fencing Attendance System",
    subtitle: "Location-Based Authentication & Attendance Management Suite",
    description: "A production-grade mobile and web platform restricting attendance check-ins to precise geographic boundaries using mathematical Haversine algorithms.",
    longDescription: "The Geo-Fencing Attendance System is designed to eliminate buddy-punching and streamline classroom management. It consists of a mobile client that detects user location and compares it to a classroom's pre-configured virtual geo-fence. If the student is inside the boundary, they can check in. The backend handles high-concurrency requests during peak class times and outputs real-time dashboard analytics for administrators.",
    coverImage: "/images/projects/geofence-main.jpg",
    images: [
      "/images/projects/geofence-dash.jpg",
      "/images/projects/geofence-mobile.jpg"
    ],
    tags: ["React Native", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Haversine Formula"],
    demoUrl: "https://geofence-attendance.vercel.app",
    githubUrl: "https://github.com/mythless/geo-fencing-attendance",
    featured: true,
    features: [
      "Precise geo-location verification using Haversine distance tracking on mobile clients",
      "Dynamic session-based QR codes and OTP mechanisms for secondary validation",
      "Robust Role-Based Access Control (RBAC) separating students, teachers, and admins",
      "Real-time attendance logs with live admin dashboard powered by WebSockets",
      "Automated PDF report generation and visual analytics for class attendance histories"
    ],
    architecture: {
      frontend: "React Native with Expo, Tailwind CSS (NativeWind), Zustand for state management",
      backend: "Node.js, Express, TypeScript, REST API",
      database: "PostgreSQL with Prisma ORM, Redis for caching active attendance sessions",
      other: ["Expo Location Services", "Docker containerization", "Vercel deployment for admin dashboard"]
    },
    challenges: "Handling GPS drift was a key challenge, where devices would report coordinates slightly outside the geofence due to building interference. This led to false negatives during class check-ins.",
    learnings: "I solved the GPS drift by introducing a Kalman-filter-like smoothing algorithm on the client and expanding the boundary threshold slightly (buffer zone). I also implemented cellular/Wi-Fi triangulation fallbacks for indoors."
  },
  {
    slug: "smart-parking-management",
    title: "Smart Parking Management System",
    subtitle: "Real-time IoT Parking Reservation & Automation Platform",
    description: "An automated solution enabling drivers to view, reserve, and pay for parking spots in real-time, backed by license plate character recognition simulation.",
    longDescription: "The Smart Parking Management System addresses urban congestion by automating parking workflows. The system maps active parking stalls, streams live occupancy states, facilitates payment processing, and simulates license plate readers using Computer Vision paradigms. A modern Next.js client renders dynamic interactive maps showing available slots in real-time.",
    coverImage: "/images/projects/parking-main.jpg",
    images: [
      "/images/projects/parking-map.jpg",
      "/images/projects/parking-billing.jpg"
    ],
    tags: ["Next.js", "FastAPI", "Python", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Stripe API"],
    demoUrl: "https://smart-parking-iot.vercel.app",
    githubUrl: "https://github.com/mythless/smart-parking-system",
    featured: true,
    features: [
      "Interactive 2D/3D map grid showing slot occupancy dynamically via WebSockets",
      "Secure pre-booking system reserving slots with auto-expiration policies",
      "Payment gateway integration using Stripe for pay-as-you-go parking bills",
      "License plate scanning simulation via character recognition endpoint",
      "Dockerized microservices deployment optimizing build modularity and scale"
    ],
    architecture: {
      frontend: "Next.js 15 (App Router), Tailwind CSS, Lucide Icons, Framer Motion",
      backend: "FastAPI, Python (for AI and heavy logic), Node.js for auth orchestration",
      database: "PostgreSQL with Prisma, Redis for fast-expiry reservations",
      other: ["Stripe Checkout SDK", "Docker Compose", "Socket.io for bi-directional communications"]
    },
    challenges: "Ensuring synchronization of slot reservations across hundreds of simultaneous users to prevent double-booking required robust database lock transactions.",
    learnings: "I implemented database level transaction isolation (SERIALIZABLE) combined with Redis-based distributed locking to ensure parking spots are locked instantly during reservation checkout workflows."
  },
  {
    slug: "dekho-movie-app",
    title: "Dekho Movie App",
    subtitle: "Fluid Cinematic Exploration & Movie Tracking Client",
    description: "A highly responsive cinematic discovery app featuring rich micro-interactions, dark aesthetic design, and complete watchlist tracking.",
    longDescription: "Dekho Movie App is a highly stylized frontend platform powered by the TMDB API. It allows cinephiles to discover trending films, filter by complex genre rules, search titles instantaneously, watch trailers, and manage a personalized watchlist. The UI features immersive backdrops, blur overlays, and slide-in galleries, all executing at 60fps.",
    coverImage: "/images/projects/dekho-main.jpg",
    images: [
      "/images/projects/dekho-home.jpg",
      "/images/projects/dekho-detail.jpg"
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TMDB API", "Zustand"],
    demoUrl: "https://dekho-movie.vercel.app",
    githubUrl: "https://github.com/mythless/dekho-movie-app",
    featured: false,
    features: [
      "Immersive hero headers changing backgrounds according to selected movies",
      "Instant fuzzy search filter querying titles as the user types",
      "Watchlist collection persists locally and synchronizes across devices via database",
      "Interactive sliding carousels with custom animations for cast and recommendations",
      "Embedded high-quality video player overlays for movie trailer reviews"
    ],
    architecture: {
      frontend: "React, Next.js (App Router), Framer Motion, Tailwind CSS",
      backend: "Next.js Serverless Routes",
      database: "MongoDB with Mongoose for user watchlist synchronization",
      other: ["TMDB REST API v3", "Framer Motion Layout Animations"]
    },
    challenges: "Optimizing the image loading speeds for hundreds of high-resolution movie posters and backdrops without layout shifts.",
    learnings: "I implemented Next.js Image component with blurry placeholder base64 data-URLs, lazy-loading, and image sizing constraints to guarantee zero Layout Shift (CLS)."
  },
  {
    slug: "box-game",
    title: "Box Game",
    subtitle: "Physics-Based Canvas Puzzle & Speed Challenge Web Game",
    description: "An interactive, web-based physics arcade game built on HTML5 Canvas API with responsive controls and custom particle collision effects.",
    longDescription: "Box Game is a high-performance puzzle/action browser game designed to demonstrate canvas graphics optimization. Players control a box avoiding obstacles, hitting triggers, and solving coordinate-based puzzles under strict time limits. The app utilizes raw JavaScript requestAnimationFrame loops combined with a modular custom physics and particle engine.",
    coverImage: "/images/projects/boxgame-main.jpg",
    images: [
      "/images/projects/boxgame-play.jpg",
      "/images/projects/boxgame-levels.jpg"
    ],
    tags: ["HTML5 Canvas", "TypeScript", "Tailwind CSS", "Web Audio API", "Framer Motion"],
    demoUrl: "https://boxgame-physics.vercel.app",
    githubUrl: "https://github.com/mythless/box-game",
    featured: false,
    features: [
      "Custom physics collision detection including elastic rebounds and friction models",
      "Rich particle generator spraying shards on collisions, jumps, and goals",
      "Dynamic level systems reading raw JSON maps to configure obstacle coordinates",
      "Web Audio API oscillator integration generating retro synth notes dynamically",
      "Interactive keyboard shortcuts and custom HUD display with high score tracking"
    ],
    architecture: {
      frontend: "TypeScript, HTML5 Canvas API, Web Audio API, Tailwind CSS for HUD layout",
      backend: "None (Fully client-side static game)",
      database: "Local Storage for persistence of high scores and unlocked levels",
      other: ["Custom particles system", "requestAnimationFrame game loop"]
    },
    challenges: "Achieving consistent game physics tick rates across displays with different refresh rates (e.g. 60Hz vs 144Hz monitors).",
    learnings: "I refactored the game loop to use delta-time based movement (time-stepping) instead of frame-based updates, ensuring the speed of the box remains uniform regardless of hardware framerates."
  }
];

export const experienceData: Experience[] = [
  {
    role: "Full-Stack Freelance Developer",
    company: "Upwork / Independent",
    location: "Remote",
    period: "Jun 2024 - Present",
    description: [
      "Engineered bespoke full-stack applications for international clients, driving automation and improving visual branding.",
      "Built clean, SEO-optimized landing pages and dashboard architectures utilizing React, Next.js, Node.js, and Express.",
      "Integrated secure payment networks (Stripe) and client auth flows (OAuth 2.0, JWT) while maintaining code coverage."
    ],
    tags: ["Next.js", "Node.js", "Express", "MongoDB", "Stripe API", "Client Relations"],
    type: "Freelance"
  },
  {
    role: "Hackathon Competitor & Runner Up",
    company: "BIT Sindri Hackathon",
    location: "Sindri, JH",
    period: "Oct 2024",
    description: [
      "Awarded 2nd position out of 50+ regional teams by developing a Smart Parking MVP within a 36-hour sprint.",
      "Architected the microservice API in FastAPI and integrated dynamic WebSockets for live spot updates.",
      "Led the frontend team in developing the reactive Next.js dashboard using Tailwind CSS and Framer Motion."
    ],
    tags: ["FastAPI", "WebSockets", "Next.js", "Framer Motion", "Rapid Prototyping"],
    type: "Hackathon"
  },
  {
    role: "Open Source Contributor",
    company: "GitHub / Community",
    location: "Remote",
    period: "Jan 2024 - Present",
    description: [
      "Contributed bug fixes and accessibility optimizations to public Tailwind UI templates and custom hooks utilities.",
      "Authored detailed developer guides and technical documentation on managing state with Zustand and React Query.",
      "Developed open-source canvas libraries for interactive particle meshes used in background canvas designs."
    ],
    tags: ["Git", "GitHub", "TypeScript", "Open Source", "Documentation"],
    type: "Open Source"
  },
  {
    role: "Lead Project Architect",
    company: "Academic Initiatives",
    location: "College Campus",
    period: "Aug 2023 - May 2024",
    description: [
      "Designed and managed the development of the Geo-Fencing Attendance suite as the capstone group project.",
      "Created backend schemas, configured PostgreSQL databases, and integrated location tracker modules on React Native.",
      "Delivered complete project presentations, user walkthrough guides, and technical system specifications."
    ],
    tags: ["React Native", "PostgreSQL", "System Design", "Technical Writing"],
    type: "College Project"
  }
];

export const achievementsData: Achievement[] = [
  {
    title: "2nd Position (Runner Up)",
    organization: "BIT Sindri Hackathon",
    date: "Oct 2024",
    prize: "🥈 2nd Position",
    description: "Built and pitched 'SmartSpot', a real-time IoT parking application resolving municipal stall allocations in 36 hours."
  },
  {
    title: "Global Rank Under 1000",
    organization: "Coding Platforms",
    date: "2024",
    prize: "🏆 Top C++ Competitive Programmer",
    description: "Solved 500+ algorithmic and data structure puzzles on LeetCode and CodeForces focusing on dynamic programming and graph structures."
  },
  {
    title: "Outstanding Project Award",
    organization: "Academic Council",
    date: "2025",
    prize: "🌟 Best Innovative System",
    description: "Honored for designing the Geo-Fencing Attendance suite, cited for practical deployment potential and robust error-handling."
  }
];
