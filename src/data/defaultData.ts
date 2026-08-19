export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  description: string;
  highlights: string[];
  iconType: 'college' | 'school' | 'secondary';
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Languages' | 'Database & Cloud' | 'Tools & AI';
  level: number; // 0-100
  iconName?: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'Full-Stack' | '3D & WebGL' | 'Cloud & Systems' | 'AI & Tools';
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string;
  starsCount?: number;
  imageGradient: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    roles: string[];
    bio: string;
    subBio: string;
    email: string;
    phone: string;
    location: string;
    status: string;
    instagram: string;
    github: string;
    linkedin: string;
    twitter: string;
    resumeUrl: string;
  };
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  stats: {
    codeHours: string;
    projectsCompleted: string;
    problemSolved: string;
    learningStreak: string;
  };
  themeConfig: {
    primaryTheme: 'cyan' | 'purple' | 'emerald' | 'solar' | 'crimson';
    particlesCount: number;
    soundEnabled: boolean;
    bloomIntensity: number;
    terminalDefaultOpen: boolean;
  };
}

export const initialPortfolioData: PortfolioData = {
  personal: {
    name: 'Rupesh Kumar',
    headline: 'Software Developer & Engineer',
    roles: [
      'Software Developer',
      'Full-Stack Engineer',
      'Computer Science Engineer',
      'Next.js & WebGL Craftsman',
      'Distributed Systems Enthusiast',
    ],
    bio: 'Passionate Software Developer and Computer Science graduate from CDLSIET, Panniwala Mota (Sirsa, Haryana). Dedicated to architecting robust, scalable web applications, immersive 3D interfaces, and high-performance digital experiences with modern software paradigms.',
    subBio: 'I bridge the gap between creative interactive design and rock-solid engineering. Constantly exploring new architectures, optimizing algorithms, and solving real-world challenges through code.',
    email: 'er.rupesh7@gmail.com',
    phone: '+91 94663 27537',
    location: 'Sirsa, Haryana, India',
    status: 'Available for Software Engineering Roles & Innovations',
    instagram: '3rupeshkr',
    github: 'er-rupesh7',
    linkedin: 'rupeshkumar-dev',
    twitter: '3rupeshkr',
    resumeUrl: '#contact',
  },
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Ch. Devi Lal State Institute of Engineering & Technology (CDLSIET)',
      location: 'Panniwala Mota, Sirsa, Haryana',
      period: 'Graduated / Undergrad',
      grade: 'Distinction / High Honors',
      description: 'Comprehensive engineering degree covering Advanced Algorithms, Distributed Computing, Database Management Systems, Computer Networks, Operating Systems, Web Technologies, and Cloud Software Architecture.',
      highlights: [
        'Data Structures & Algorithm Optimization',
        'Full-Stack Web Architectures & RESTful APIs',
        'Database Design & Distributed Systems',
        'Object-Oriented Software Engineering',
      ],
      iconType: 'college',
    },
    {
      id: 'edu-2',
      degree: 'Senior Secondary Education (12th Standard - Non-Medical)',
      institution: 'Maharaja Agarsain Sr. Sec School',
      location: 'Sirsa, Haryana',
      period: 'Senior Secondary Milestone',
      grade: 'First Division',
      description: 'Focused rigorously on Physics, Chemistry, Mathematics (PCM), and Computer Applications with intense analytical problem-solving and logic building.',
      highlights: [
        'Advanced Mathematics & Calculus',
        'Physics & Logical Problem Analysis',
        'Foundational Programming Concepts',
      ],
      iconType: 'school',
    },
    {
      id: 'edu-3',
      degree: 'Secondary School Certificate (10th Standard)',
      institution: "Shah Satnam Ji Boys' School",
      location: 'Sirsa, Haryana',
      period: 'Secondary Milestone',
      grade: 'Excellence',
      description: 'Foundational schooling emphasizing holistic science, mathematics, computer literacy, and active leadership in extracurricular tech and science events.',
      highlights: [
        'Core Sciences & Mathematics',
        'Computer Basics & Early Coding',
        'Academic & Extracurricular Excellence',
      ],
      iconType: 'secondary',
    },
  ],
  skills: [
    // Languages
    { id: 'sk-1', name: 'JavaScript (ES6+)', category: 'Languages', level: 95, featured: true },
    { id: 'sk-2', name: 'TypeScript', category: 'Languages', level: 90, featured: true },
    { id: 'sk-3', name: 'Python', category: 'Languages', level: 88, featured: true },
    { id: 'sk-4', name: 'C / C++', category: 'Languages', level: 85, featured: false },
    { id: 'sk-5', name: 'SQL', category: 'Languages', level: 88, featured: false },
    { id: 'sk-6', name: 'HTML5 & CSS3', category: 'Languages', level: 95, featured: false },

    // Frontend
    { id: 'sk-7', name: 'React.js', category: 'Frontend', level: 94, featured: true },
    { id: 'sk-8', name: 'Next.js (App Router)', category: 'Frontend', level: 92, featured: true },
    { id: 'sk-9', name: 'Three.js & WebGL', category: 'Frontend', level: 85, featured: true },
    { id: 'sk-10', name: 'Tailwind CSS & Vanilla CSS3', category: 'Frontend', level: 92, featured: false },
    { id: 'sk-11', name: 'State Management (Redux/Zustand)', category: 'Frontend', level: 88, featured: false },
    { id: 'sk-12', name: 'Responsive Web Architecture', category: 'Frontend', level: 96, featured: false },

    // Backend
    { id: 'sk-13', name: 'Node.js & Express', category: 'Backend', level: 90, featured: true },
    { id: 'sk-14', name: 'RESTful API & GraphQL', category: 'Backend', level: 92, featured: true },
    { id: 'sk-15', name: 'Authentication (JWT, OAuth, NextAuth)', category: 'Backend', level: 89, featured: false },
    { id: 'sk-16', name: 'FastAPI / Python Backend', category: 'Backend', level: 84, featured: false },
    { id: 'sk-17', name: 'Microservices Architecture', category: 'Backend', level: 82, featured: false },

    // Database & Cloud
    { id: 'sk-18', name: 'PostgreSQL & MySQL', category: 'Database & Cloud', level: 88, featured: true },
    { id: 'sk-19', name: 'MongoDB', category: 'Database & Cloud', level: 90, featured: true },
    { id: 'sk-20', name: 'Redis Caching', category: 'Database & Cloud', level: 82, featured: false },
    { id: 'sk-21', name: 'AWS & Cloud Services', category: 'Database & Cloud', level: 80, featured: false },
    { id: 'sk-22', name: 'Vercel & CI/CD Pipelines', category: 'Database & Cloud', level: 92, featured: true },

    // Tools & AI
    { id: 'sk-23', name: 'Git & GitHub Automation', category: 'Tools & AI', level: 94, featured: true },
    { id: 'sk-24', name: 'Docker & Containerization', category: 'Tools & AI', level: 82, featured: false },
    { id: 'sk-25', name: 'AI Integration & Gemini/OpenAI APIs', category: 'Tools & AI', level: 88, featured: true },
    { id: 'sk-26', name: 'Postman & API Testing', category: 'Tools & AI', level: 90, featured: false },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Aetheria 3D — Next-Gen Web Universe',
      tagline: 'Interactive 3D WebGL Virtual World with Real-Time Physics',
      description: 'An immersive 3D digital ecosystem featuring customizable spatial audio, dynamic Three.js lighting, procedural terrain shaders, and fluid 60fps WebGL particle simulations.',
      longDescription: 'Engineered with Next.js, Three.js, and GLSL shaders. Features real-time spatial positioning, interactive orbital cameras, physics collisions, and dynamic LOD rendering for extreme performance on mobile and desktop.',
      tags: ['Next.js', 'Three.js', 'WebGL', 'GLSL', 'Web Audio API'],
      category: '3D & WebGL',
      githubUrl: 'https://github.com/er-rupesh7/aetheria-3d-universe',
      liveUrl: 'https://aetheria-3d-universe.vercel.app',
      featured: true,
      metrics: '60 FPS Ultra Performance',
      starsCount: 142,
      imageGradient: 'linear-gradient(135deg, #0ea5e9, #6366f1, #a855f7)',
    },
    {
      id: 'proj-2',
      title: 'OmniCloud — Distributed Microservices Platform',
      tagline: 'High-Concurrency Event-Driven Architecture with Real-Time Observability',
      description: 'Scalable cloud infrastructure backend providing event streaming, Redis caching, JWT token rotation, role-based access control, and telemetry tracking.',
      longDescription: 'Architected with Node.js, TypeScript, PostgreSQL, Redis, and Docker. Handles asynchronous messaging pipelines with automated retries and sub-millisecond response latency.',
      tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
      category: 'Cloud & Systems',
      githubUrl: 'https://github.com/er-rupesh7/omnicloud-distributed-engine',
      liveUrl: 'https://omnicloud-engine.vercel.app',
      featured: true,
      metrics: '10K+ Req/sec Handled',
      starsCount: 98,
      imageGradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8, #06b6d4)',
    },
    {
      id: 'proj-3',
      title: 'CognitivePulse — AI Automated Intelligence Suite',
      tagline: 'Full-Stack Multi-Modal AI Assistant with Vector Semantic Search',
      description: 'AI-driven workflow platform that digests complex documents, performs vector similarity indexing, and delivers contextualized multi-turn conversations.',
      longDescription: 'Built using Next.js 14, Python FastAPI, LangChain, Pinecone vector store, and streaming LLM completion pipelines with custom tool calling.',
      tags: ['Next.js', 'FastAPI', 'Python', 'Vector DB', 'OpenAI/Gemini'],
      category: 'AI & Tools',
      githubUrl: 'https://github.com/er-rupesh7/cognitive-pulse-ai',
      liveUrl: 'https://cognitivepulse-ai.vercel.app',
      featured: true,
      metrics: '99.4% Semantic Accuracy',
      starsCount: 165,
      imageGradient: 'linear-gradient(135deg, #8b5cf6, #d946ef, #ec4899)',
    },
    {
      id: 'proj-4',
      title: 'DevSync Studio — Real-Time Collaborative Workspace',
      tagline: 'WebSockets & CRDT-Powered Pair Programming Code Editor',
      description: 'Ultra-fast collaborative developer code playground with syntax highlighting, live audio rooms, synchronized cursors, and instant in-browser code compilation.',
      longDescription: 'Created using React, Monaco Editor, Socket.io, Node.js, and WebRTC. Supports multi-user concurrent edits without race conditions using conflict-free replicated data types (CRDTs).',
      tags: ['React', 'WebSockets', 'WebRTC', 'Monaco Editor', 'Node.js'],
      category: 'Full-Stack',
      githubUrl: 'https://github.com/er-rupesh7/devsync-collaborative-studio',
      liveUrl: 'https://devsync-studio.vercel.app',
      featured: true,
      metrics: 'Zero-Collision Sync',
      starsCount: 120,
      imageGradient: 'linear-gradient(135deg, #10b981, #06b6d4, #3b82f6)',
    },
    {
      id: 'proj-5',
      title: 'QuantumVault — Zero-Knowledge Security Ledger',
      tagline: 'Cryptographic Asset Manager with Biometric Multi-Signature Logic',
      description: 'Decentralized digital vault applying client-side AES-256-GCM encryption, verifiable audit logs, and hardware-key authentication for sensitive engineering secrets.',
      longDescription: 'Developed with Next.js, Web Crypto API, Solidity smart contracts, and TypeScript. Ensures that no unencrypted keys or payloads ever leave the user device.',
      tags: ['Web Crypto', 'Next.js', 'TypeScript', 'Security', 'Tailwind'],
      category: 'Cloud & Systems',
      githubUrl: 'https://github.com/er-rupesh7/quantum-vault-security',
      liveUrl: 'https://quantumvault-sec.vercel.app',
      featured: false,
      metrics: 'Military-Grade AES-256',
      starsCount: 84,
      imageGradient: 'linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)',
    },
    {
      id: 'proj-6',
      title: 'CyberMatrix CLI — Web-Based Terminal Environment',
      tagline: 'Virtual Unix Shell with Interactive Scripts & Theme Customizer',
      description: 'Extensible browser-based terminal emulator supporting pipes, custom user shell scripts, system diagnostics, and dynamic color matrix themes.',
      longDescription: 'Engineered with pure JavaScript, custom parser grammar, and Web Audio synthesizers for authentic tactile keyclick feedback.',
      tags: ['JavaScript', 'HTML5 Canvas', 'Web Audio API', 'CSS Grid'],
      category: '3D & WebGL',
      githubUrl: 'https://github.com/er-rupesh7/cybermatrix-terminal',
      liveUrl: 'https://cybermatrix-terminal.vercel.app',
      featured: false,
      metrics: 'Tactile Audio Feedback',
      starsCount: 76,
      imageGradient: 'linear-gradient(135deg, #06b6d4, #10b981, #14b8a6)',
    },
  ],
  stats: {
    codeHours: '2,500+',
    projectsCompleted: '25+',
    problemSolved: '400+',
    learningStreak: '365+ Days',
  },
  themeConfig: {
    primaryTheme: 'cyan',
    particlesCount: 2200,
    soundEnabled: true,
    bloomIntensity: 1.2,
    terminalDefaultOpen: false,
  },
};
