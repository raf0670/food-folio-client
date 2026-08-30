import React from 'react';
import { getCurrentUser } from '@/actions/userActions';

const UserProfile = async ({ params }) => {
    const { userId } = await params;
    const currentUser = await getCurrentUser();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/getUser/${userId}`);
    const data = await res.json();
    // console.log(data);
    const displayedUserProfile = data?.user;

    return (
        <div>
            {displayedUserProfile?.id}
        </div>
    );
};

export default UserProfile;