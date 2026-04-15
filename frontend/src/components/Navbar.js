import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

function Navbar({ user, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-blue-400">🔥 MACS</h1>
                <p className="text-slate-400">Military Asset Command System</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-white font-semibold">{user?.name}</p>
                    <p className="text-sm text-slate-400">{user?.role}</p>
                </div>
                <button
                    onClick={() => navigate('/profile')}
                    className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                    <User className="w-5 h-5 text-slate-300" />
                </button>
                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-slate-700 rounded-lg transition"
                >
                    <LogOut className="w-5 h-5 text-red-400" />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
