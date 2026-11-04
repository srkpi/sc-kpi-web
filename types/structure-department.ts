export interface DepartmentSection {
  id: number;
  name: string;
  description: string;
}

export interface StructureProject {
  id: number;
  name: string;
  description: string;
  image?: string | null;
}

export interface StructureDepartment {
  id: number;
  name: string;
  description: string;
  shortDescription?: string | null;
  gains: string;
  headFirstName: string;
  headLastName: string;
  headMiddleName?: string | null;
  image?: string | null;
  headImage?: string | null;
  buttonLink?: string | null;
  sections?: DepartmentSection[];
  projects?: StructureProject[];
}
