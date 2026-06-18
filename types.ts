
export enum ContentType {
  CHANT = 'CHANT',
  PRAYER = 'PRAYER',
  MANUSCRIPT = 'MANUSCRIPT',
  RITUAL = 'RITUAL',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  PDF = 'PDF'
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  completedTasks: string[];
}

export interface Manifestation {
  id: string;
  date: string;
  category: string;
  description: string;
  value?: number;
}

export interface LibraryItem {
  id: string;
  title: string;
  subtitle: string;
  type: ContentType;
  duration?: string;
  plays?: number;
  audioUrl?: string;
  embedUrl?: string;
  content?: string;
  isFavorite?: boolean;
}

export interface UserSettings {
  notifications: boolean;
  theme: 'light' | 'dark' | 'auto';
  audioQuality: 'low' | 'medium' | 'high';
}