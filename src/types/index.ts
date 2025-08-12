export interface Skill {
  technical: string[];
  tools: string[];
  soft: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface ThemeStyles {
  background: string;
  text: string;
  navBackground: string;
  navText: string;
  navActiveBackground: string;
  navActiveText: string;
  sectionBackground: string;
  cardBackground: string;
  cardBorder: string;
  inputBackground: string;
  inputBorder: string;
  secondaryText: string;
  heroTerminal: string;
  skillTag: {
    technical: string;
    tools: string;
    soft: string;
  };
  projectCard: string;
  linkHover: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface BlogPost {
  title: string;
  description: string;
  url: string;
  date: string;
  readTime: string;
  tags: string[];
}