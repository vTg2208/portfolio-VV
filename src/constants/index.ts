import { NavigationItem, Skill, Project } from '../types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact', href: '#contact' },
];

export const SKILLS: Skill = {
  technical: ['C++', 'Java', 'Python', 'MATLAB', 'Haskell', 'HTML/CSS', 'JavaScript', 'MySQL'],
  tools: ['Git/GitHub', 'VS Code', 'Firebase', 'React/Node.js', 'MongoDB'],
  soft: ['Communication', 'Team Collaboration', 'Problem Solving', 'Critical Thinking', 'Leadership'],
};

export const PROJECTS: Project[] = [
  {
    name: 'Owezy',
    description:
    'A comprehensive expense sharing application for group trips with real-time balance tracking, receipt uploads, group chat, and simplified settlements.',
    tech: ['React','TypeScript','Vite','Tailwind CSS','Node.js','Express','MongoDB','Firebase Authentication'],
    link: 'https://owezy.vercel.app/'
  },
  {
    name: 'Travel Buddy',
    description: 'AI-powered travel recommendation assistant that provides personalized destination suggestions and trip planning insights.',
    tech: ['Google Gemini API', 'Express', 'Heroicons', 'React', 'Tailwind CSS'],
    link: 'https://vTg2208.github.io/travel-buddy'
  },
  {
    name: 'GradeAppeal System',
    description: 'A revaluation portal that makes paper review requests, approvals, and expert evaluations simple and secure.',
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'Google Authenticator', 'AES-256', 'REST APIs'],
    link: 'https://github.com/vTg2208/Paper-Management-System'
  },
  {
    name: 'Disaster Response Management System',
    description: 'A disaster-planning engine that prioritizes emergencies, finds fast routes, and allocates resources across cities.',
    tech: ['Python', 'AVL Tree', 'Graph', 'Heap', 'Dijkstra', 'Ford-Fulkerson'],
    link: 'https://github.com/vTg2208/disaster-management-system'
  },
  {
    name: 'AmritaAttend',
    description: 'Attendance for faculty at Amrita Vishwa Vidyapeetham using phone fingerprint authentication.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Flutter'],
    link: 'https://vTg2208.github.io/AmritaAttend'
  }
];

export const SCROLL_CONFIG = {
  OFFSET: 150,
  PARALLAX_FACTOR: 0.5,
  HEADER_HEIGHT: 80,
};

export const CONTACT_INFO = {
  email: 'theegelavishnuvardhan22@gmail.com',
  phone: '+91 6302043223',
  github: 'https://github.com/vTg2208',
  linkedin: 'https://www.linkedin.com/in/vishnu-vardhan-theegela-486710290/',
};



export const BLOG_INFO = {
  medium_profile: 'https://medium.com/@theegelavishnuvardhan22', // Replace with your actual Medium profile
  blogs: [
    {
      title: 'ML vs DL: When to Use What, and Why It Matters',
      description: 'A concise guide explaining the key differences between Machine Learning and Deep Learning, and providing practical advice on when to apply each approach.',
      url: 'https://medium.com/@theegelavishnuvardhan22/ml-vs-dl-when-to-use-what-and-why-it-matters-633626fa9d92',
      date: '2025-05-03',
      readTime: '2 min read',
      tags: ['Machine Learning', 'Deep Learning', 'AI', 'Blog', 'Tech-Made-Chill']
    },
    {
      title: 'Why we went from massive LLMs to SLMs, LMMs, and Agents — and why the “best” model doesn’t exist.',
      description: 'An exploration of how economic and technical constraints shaped the rise of LLMs, SLMs, multimodal models, and modern AI systems.',
      url: 'https://medium.com/@theegelavishnuvardhan22/why-we-went-from-massive-llms-to-slms-lmms-and-agents-and-why-the-best-model-doesnt-exist-41d35f4e460b',
      date: '2025-12-15',
      readTime: '5 min read',
      tags: ['Machine Learning', 'Artificial Intelligence', 'AI Engineering', 'AI Infrastructure', 'Large Language Models']
    }
    // Add more blogs as needed
  ]
};
