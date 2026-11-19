import { getAreaList } from '@/app/actions/area.actions';
import AreasPage from '@/app/admin/areas/AreasPage';

export default async function Page() {
  const areas = await getAreaList();
  return <AreasPage areas={areas} />;
}
