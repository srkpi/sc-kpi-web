import { Skill } from './skill';
import { Status } from './status';

export interface Project {
  id: number;
  name: string;
  description: string;
  skills: Skill[];
  status: Status;
  shortDescription: string;
  image?: string;
  buttonLink: string;
}
