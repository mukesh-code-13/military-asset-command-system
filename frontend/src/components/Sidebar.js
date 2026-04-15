import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, LogSquare, Users, Settings } from 'lucide-react';

function Sidebar({ user }) {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['Administrator', 'Commander', 'LogisticsOfficer'] },
        { icon: Package, label: 'Assets', path: '/assets', roles: ['Administrator', 'Commander', 'LogisticsOfficer'] },
        { icon: LogSquare, label: 'Transactions', path: '/transactions', roles: ['Administrator', 'Commander', 'LogisticsOfficer'] },
        { icon: Users, label: 'Users', path: '/users', roles: ['Administrator'] },
        { icon: Settings, label: 'Profile', path: '/profile', roles: ['Administrator', 'Commander', 'LogisticsOfficer'] }
    ];

    return (
        <aside className="bg-slate-800 w-64 border-r border-slate-700 overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-blue-400">MACS</h2>
                <p className="text-xs text-slate-400 mt-1">Command Control</p>
            </div>

            <nav className="p-4">
                {menuItems.map((item) => {
                    if (!item.roles.includes(user?.role)) return null;

                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-4">
                <div className="text-xs text-slate-400">
                    <p>Logged in as</p>
                    <p className="font-semibold text-slate-200 mt-1">{user?.name}</p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
