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
    name: 'AmritaAttend',
    description: 'Attendance for faculty at Amrita Vishwa Vidyapeetham using phone fingerprint authentication.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Flutter'],
    link: 'https://vTg2208.github.io/AmritaAttend'
  },
  {
    name: 'VV-Verse',
    description: 'My personal portfolio showcasing my academic journey and expertise at Amrita Vishwa Vidyapeetham.',
    tech: ['TypeScript', 'Node.js', 'Vite', 'React', 'Tailwind CSS'],
    link: 'https://vTg2208.github.io/portfolio-VV'
  },
  {
    name: 'Travel Buddy',
    description: 'AI-powered travel recommendation assistant that provides personalized destination suggestions and trip planning insights.',
    tech: ['Google Gemini API', 'Express', 'Heroicons', 'React', 'Tailwind CSS'],
    link: 'https://vTg2208.github.io/travel-buddy'
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

export const GLASS_STYLES = {
  card: 'backdrop-blur-md bg-white/10 dark:bg-slate-900/50 border border-white/20 dark:border-slate-700/50 shadow-xl shadow-black/20 rounded-xl',
  navbar: 'backdrop-blur-lg bg-white/5 dark:bg-slate-950/80 border-b border-white/10 dark:border-slate-800',
  button: 'backdrop-blur-sm bg-white/20 hover:bg-white/30 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 border border-white/30 dark:border-slate-700'
};

export const SKILL_LEVELS = {
  'C++': 90,
  'Java': 85,
  'Python': 80,
  'JavaScript': 85,
  'React': 88,
  'Node.js': 75,
  'Git/GitHub': 85,
  'VS Code': 90,
  'Communication': 90,
  'Team Collaboration': 85,
  'Problem Solving': 92
};

export const ACHIEVEMENTS = [
  { name: 'Open Source Contributor', icon: '🏆', unlocked: true, description: 'Contributed to open source projects' },
  { name: 'React Master', icon: '⚛️', unlocked: true, description: 'Built multiple React applications' },
  { name: 'Problem Solver', icon: '🧩', unlocked: true, description: 'Solved complex coding challenges' },
  { name: 'Team Player', icon: '🤝', unlocked: true, description: 'Collaborated effectively in team projects' },
  { name: 'Innovation Leader', icon: '💡', unlocked: false, description: 'Led innovative tech solutions' }
];

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
