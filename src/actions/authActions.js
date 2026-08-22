'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logOut = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect('/');
};

export const getToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token || !process.env.NEXT_PUBLIC_API_URL) {
        return null;
    }

    return token;
};