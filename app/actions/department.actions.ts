import { client } from '@/lib/client';
import { Department } from '@/types/departments';

export async function getDepartmentList(){
  const res = await client<Department[]> ('/departments');
  return res.json();
}
