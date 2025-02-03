import { PersonalPage } from '@/app/(client)/profile/personal-data/PersonalPage';
import { getUserInfo } from '@/app/actions/auth.actions';

export default async function Page() {
  const user = await getUserInfo();
  return <PersonalPage user={user} />;
}
