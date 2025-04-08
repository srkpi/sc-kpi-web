import { Category } from './category';

export interface DepartmentProject {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  categories: Category[];
  shortDescription: string;
  image: string;
  buttonLink: string;
  projects: DepartmentProject[];
}
