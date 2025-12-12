import { getStatusesList } from '@/app/actions/statuses.actions';
import StatusesPage from '@/app/admin/statuses/StatusesPage';

export default async function Page() {
  const statuses = await getStatusesList();
  return <StatusesPage statuses={statuses} />;
}
