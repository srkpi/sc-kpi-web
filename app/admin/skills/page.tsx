import { getSkillsList } from '@/app/actions/skills.actions';
import SkillsPage from '@/app/admin/skills/SkillsPage';

export default async function Page() {
  const skills = await getSkillsList();
  return <SkillsPage skills={skills} />;
}
