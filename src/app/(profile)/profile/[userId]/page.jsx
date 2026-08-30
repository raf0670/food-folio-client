import React from 'react';
import { getCurrentUser } from '@/actions/userActions';
import Image from 'next/image';
import Link from 'next/link';
import {
    BadgeCheck,
    BookOpen,
    Calendar,
    Edit3,
    Fingerprint,
    Globe2,
    LocateFixed,
    Mail,
    MapPin,
    ShieldAlert,
    ShieldCheck,
    User
} from 'lucide-react';

const formatJoinedDate = (date) => {
    if (!date) {
        return 'Not shared yet';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return 'Not shared yet';
    }

    return parsedDate.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric'
    });
};

const getInitials = (value) => {
    return value
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
};

const getDisplayValue = (value, fallback = 'Not shared yet') => {
    if (typeof value !== 'string') {
        return value ?? fallback;
    }

    return value.trim() || fallback;
};

const getRoleLabel = (role) => {
    const normalizedRole = getDisplayValue(role, 'user').toString().trim().toLowerCase().replace(/_/g, ' ');

    return normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1);
};

const UserProfile = async ({ params }) => {
    const { userId } = await params;
    const currentUser = await getCurrentUser();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/getUser/${userId}`, {
        cache: 'no-store'
    });
    const data = await res.json();
    const displayedUserProfile = data?.user;

    if (!displayedUserProfile) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
                <ShieldAlert className="w-12 h-12 text-orange-400 mb-2" />
                <h2 className="text-xl font-bold text-gray-900">User Not Found</h2>
                <p className="text-sm text-gray-600 mt-1">The profile you are looking for does not exist or has been removed.</p>
                <Link href="/" className="mt-6 bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:bg-orange-600 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    const isOwnProfile = currentUser && String(currentUser.id) === String(displayedUserProfile.id);

    const name = getDisplayValue(displayedUserProfile.name, '');
    const email = getDisplayValue(displayedUserProfile.email, '');
    const displayName = name || email || 'Foodie';
    const initials = getInitials(displayName);
    const roleLabel = getRoleLabel(displayedUserProfile.role);
    const bio = getDisplayValue(displayedUserProfile.bio, '');
    const city = getDisplayValue(displayedUserProfile.current_city, '');
    const country = getDisplayValue(displayedUserProfile.current_country, '');
    const locationParts = [city, country].filter(Boolean);
    const locationString = locationParts.join(', ');
    const joinedDate = formatJoinedDate(displayedUserProfile.created_at);
    const joinedSummary = joinedDate === 'Not shared yet' ? 'Joined date not shared' : `Joined ${joinedDate}`;
    const hasPreciseLocation = Boolean(displayedUserProfile.location);
    const profileId = getDisplayValue(displayedUserProfile.id, 'Unavailable');

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#FDFBF7]">
            <section className="relative overflow-hidden border-b border-orange-100/80 bg-[radial-gradient(circle_at_top_left,#fff7ed_0,#fdfbf7_34%,#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-red-500 via-orange-400 to-emerald-500" />

                <div className="mx-auto max-w-6xl">
                    <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                            <div className="relative h-32 w-32 shrink-0 rounded-full bg-white p-1 shadow-xl shadow-orange-200/50 ring-1 ring-orange-100 sm:h-36 sm:w-36">
                                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-orange-100 via-amber-50 to-emerald-50 text-4xl font-black text-orange-700">
                                    {displayedUserProfile.profile_picture_url ? (
                                        <Image
                                            src={displayedUserProfile.profile_picture_url}
                                            alt={displayName}
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                            priority
                                        />
                                    ) : (
                                        initials || <User className="h-12 w-12 text-orange-500" />
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#FDFBF7] bg-emerald-500 text-white shadow-md">
                                    <BadgeCheck className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="max-w-2xl space-y-4">
                                <div className="space-y-2">
                                    <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase text-orange-700 shadow-sm">
                                        Food Folio Profile
                                    </p>
                                    <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                                        {displayName}
                                    </h1>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                                        {roleLabel}
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600 sm:justify-start">
                                    {email && (
                                        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-100 bg-white/85 px-3 py-1.5 shadow-sm">
                                            <Mail className="h-4 w-4 shrink-0 text-orange-500" />
                                            <span className="truncate">{email}</span>
                                        </span>
                                    )}
                                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/85 px-3 py-1.5 shadow-sm">
                                        <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                                        {locationString || 'Location not shared'}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-3 py-1.5 shadow-sm">
                                        <Calendar className="h-4 w-4 shrink-0 text-sky-600" />
                                        {joinedSummary}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {isOwnProfile && (
                            <Link
                                href={`/profile/${userId}/edit`}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gray-950 px-5 text-sm font-semibold text-white shadow-lg shadow-gray-900/15 transition hover:-translate-y-0.5 hover:bg-gray-800"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Profile
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)]">
                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase text-orange-600">
                                        User record
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold text-gray-950">Account Details</h2>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                                    <User className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase text-gray-400">Name</p>
                                        <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                                            {name || 'Not shared yet'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sky-600 shadow-sm">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold uppercase text-gray-400">Email</p>
                                        <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                                            {email || 'Not shared yet'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                                        <ShieldCheck className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-gray-400">Role</p>
                                        <p className="mt-1 text-sm font-semibold text-gray-900">{roleLabel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                            <div className="mb-5 flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase text-emerald-600">
                                        Location
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold text-gray-950">Current Place</h2>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                    <MapPin className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400">
                                        <MapPin className="h-3.5 w-3.5 text-orange-500" />
                                        City
                                    </div>
                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {city || 'Not shared yet'}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400">
                                        <Globe2 className="h-3.5 w-3.5 text-emerald-600" />
                                        Country
                                    </div>
                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {country || 'Not shared yet'}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 sm:col-span-2 lg:col-span-1">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-gray-400">
                                        <LocateFixed className="h-3.5 w-3.5 text-sky-600" />
                                        Precise location
                                    </div>
                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        {hasPreciseLocation ? 'Saved privately' : 'Not saved yet'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="space-y-6">
                        <article className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase text-orange-600">
                                        Bio
                                    </p>
                                    <h2 className="text-xl font-bold text-gray-950">About {displayName}</h2>
                                </div>
                            </div>

                            <p className="text-base leading-8 text-gray-700">
                                {bio || 'This foodie has not added a bio yet.'}
                            </p>
                        </article>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-red-100 bg-red-50/70 p-5">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-red-600">
                                    <Fingerprint className="h-3.5 w-3.5" />
                                    User ID
                                </div>
                                <p className="mt-3 break-all font-mono text-xs font-semibold leading-5 text-gray-900">
                                    {profileId}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-orange-600">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Created at
                                </div>
                                <p className="mt-3 text-sm font-bold text-gray-950">{joinedDate}</p>
                            </div>

                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-600">
                                    <BadgeCheck className="h-3.5 w-3.5" />
                                    Profile scope
                                </div>
                                <p className="mt-3 text-sm font-bold text-gray-950">
                                    {isOwnProfile ? 'Your Profile' : 'Public Profile'}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-sky-600">
                                    <LocateFixed className="h-3.5 w-3.5" />
                                    Map data
                                </div>
                                <p className="mt-3 text-sm font-bold text-gray-950">
                                    {hasPreciseLocation ? 'Available' : 'Empty'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UserProfile;
