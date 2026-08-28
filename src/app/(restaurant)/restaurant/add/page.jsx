import React from 'react';
import RestaurantAddPageHelper from './RestaurantAddPageHelper';
import { getCurrentUser } from '@/actions/userActions';
import { redirect } from 'next/navigation';

const RestaurantAddPage = async () => {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/unauthorized');
    }

    return (
        <RestaurantAddPageHelper></RestaurantAddPageHelper>
    );
};

export default RestaurantAddPage;