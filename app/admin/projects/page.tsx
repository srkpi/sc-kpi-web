import { getProjectList } from '@/app/actions/project.actions';
import ProjectsPage from '@/app/admin/projects/ProjectsPage';

export default async function Page() {
  const projects = await getProjectList();
  return <ProjectsPage projects={projects} />;
}
