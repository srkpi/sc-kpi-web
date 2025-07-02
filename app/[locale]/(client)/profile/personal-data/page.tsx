import { PersonalPage } from '@/app/[locale]/(client)/profile/personal-data/PersonalPage';
import { getUserInfo } from '@/app/[locale]/actions/auth.actions';

export default async function Page() {
  const user = await getUserInfo();
  return <PersonalPage user={user} />;
}
