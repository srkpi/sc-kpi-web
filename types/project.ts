import { Skill } from './skill';

export interface Project {
  id: number;
  name: string;
  description: string;
  skills: Skill[];
  shortDescription: string;
  image?: string;
  buttonLink: string;
}
