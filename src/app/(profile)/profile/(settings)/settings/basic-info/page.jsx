import { getCurrentUser } from '@/api/userActions';
import BasicInfoEditPage from '@/components/settings/ProfileEditPage';
import { redirect } from 'next/navigation';

export default async function Page() {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login');
    }

    return <BasicInfoEditPage user={user} />;
}