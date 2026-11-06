import { Category } from './category';
import { DepartmentSection } from './structure-department';

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
  gains?: string;
  headFirstName?: string;
  headLastName?: string;
  headMiddleName?: string | null;
  headImage?: string | null;
  image: string;
  buttonLink: string;
  projects: DepartmentProject[];
  sections?: DepartmentSection[];
}
