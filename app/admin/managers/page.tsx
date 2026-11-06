import { getManagerList } from '@/app/actions/manager.actions';
import ManagersPage from '@/app/admin/managers/ManagersPage';

export default async function Page() {
  const managers = await getManagerList();
  return <ManagersPage managers={managers} />;
}
