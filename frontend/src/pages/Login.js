import React, { useState } from 'react';
import { authAPI } from '../api';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.login(email, password);
            onLogin(response.data.user, response.data.token);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDemo = (role) => {
        const demos = {
            admin: { email: 'admin@military.mil', password: 'AdminPass123!' },
            commander: { email: 'commander@military.mil', password: 'CmdPass123!' },
            logistics: { email: 'logistics@military.mil', password: 'LogPass123!' }
        };
        const demo = demos[role];
        setEmail(demo.email);
        setPassword(demo.password);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-slate-800 rounded-lg shadow-xl p-8 border border-slate-700">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-blue-400 mb-2">🔥 MACS</h1>
                        <p className="text-slate-400">Military Asset Command System</p>
                        <p className="text-sm text-slate-500 mt-2">Enterprise Logistics Intelligence</p>
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-700 text-red-400 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="user@military.mil"
                                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="border-t border-slate-700 pt-6">
                        <p className="text-sm text-slate-400 text-center mb-4">Demo Credentials</p>
                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={() => handleDemo('admin')}
                                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all text-sm"
                            >
                                👤 Admin Demo
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDemo('commander')}
                                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all text-sm"
                            >
                                🎖️ Commander Demo
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDemo('logistics')}
                                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-all text-sm"
                            >
                                📦 Logistics Demo
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <p className="text-xs text-slate-400 text-center">
                            🔒 Click any demo button to autofill credentials
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
