export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  position: string;
  duties: string;
  image?: string | null;
  order?: number;
}
