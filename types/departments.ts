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
  shortDescription: string;
  image: string;
  buttonLink: string;
  projects: DepartmentProject[];
}
