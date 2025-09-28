'use server';

import { revalidatePath } from 'next/cache';

import { apiClient } from '@/lib/client';
import { Skill } from '@/types/skill';

export async function getSkillsList() {
  const response = await apiClient.get<Skill[]>('/projects/skill');
  return response.data;
}

export async function createSkill(skill: string) {
  await apiClient.post<Skill>('/projects/skill', {
    name: skill,
  });

  revalidatePath('/admin/skills');
}

export async function updateSkill(skillId: number, newName: string) {
  await apiClient.patch<Skill>(`/projects/skill`, {
    id: skillId,
    name: newName,
  });

  revalidatePath('/admin/skills');
}

export async function deleteSkill(skillId: number) {
  await apiClient.delete(`/projects/skill/${skillId}`);

  revalidatePath('/admin/skills');
}
