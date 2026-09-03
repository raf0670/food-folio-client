'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Lock } from 'lucide-react';

const navItems = [
    {
        name: 'Basic Information',
        href: '/profile/settings/basic-info',
        icon: User,
    },
    {
        name: 'Password',
        href: '/profile/settings/password',
        icon: Lock,
    },
];

const SettingsSideBar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-[#FDFBF7] border border-orange-100 shadow-sm p-4 space-y-2 lg:min-h-screen flex flex-col">
                <div className="px-3 py-2 mb-1">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Settings Menu
                    </h2>
                </div>

                <div className="space-y-1 flex-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                    ? 'bg-orange-50 text-orange-600 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default SettingsSideBar;