import type { Timestamp } from 'firebase/firestore';

export type Project = {
  id: string;
  title: string;
  description: string;
  logoUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  content: string; // Markdown content
  imageUrls: string[];
  createdAt: Timestamp;
};

export type Qualification = {
  id: string;
  type: 'education' | 'experience';
  title: string;
  subtitle: string;
  description: string;
  dateRange: string;
  createdAt: Timestamp;
};

