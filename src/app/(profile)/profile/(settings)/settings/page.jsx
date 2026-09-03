import { getCurrentUser } from '@/api/userActions';
import ProfileEditPage from '@/components/profile/ProfileEditPage';
import { redirect } from 'next/navigation';

export default async function Page() {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/login');
    }

    return <ProfileEditPage user={user} />;
}