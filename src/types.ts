export interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  services: string[];
}

export interface DescriptionProps {
  description: string;
}

export interface FooterProps {
  previewLink: string;
  githubLink: string;
}

export interface HeaderProps {
  name: string;
  icon: string;
  language: string;
  color: string;
}

export interface ImagesProps {
  images: {
    projectImage: string[];
  };
}

export interface ServiceCardProps {
  service: ServiceItem;
  isActive: boolean;
  onToggle: (id: number) => void;
}

export interface ProjectItem {
  id: number;
  name: string;
  image: {
    projectImage: string[];
  };
  description: string;
  githubLink: string;
  previewLink: string;
  icon: string;
  language: string;
  color: string;
}

export interface Skill {
  skill_title: string;
  skill_level: string;
  skill_icon: string;
}

export interface SkillsBoxProps {
  title: string; 
  skills: Skill[];
}

export interface QualificationItem {
  id: number;
  title: string;
  subtitle: string;
  calendar: string;
  type: "education" | "experience";
}
