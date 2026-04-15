import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Transactions from './pages/Transactions';
import Users from './pages/Users';
import Profile from './pages/Profile';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const handleLogin = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-slate-900">Loading...</div>;
    }

    return (
        <Router>
            {!user ? (
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            ) : (
                <div className="flex h-screen bg-slate-900">
                    <Sidebar user={user} />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Navbar user={user} onLogout={handleLogout} />
                        <main className="flex-1 overflow-auto">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/assets" element={<Assets />} />
                                <Route path="/transactions" element={<Transactions />} />
                                <Route path="/users" element={<Users user={user} />} />
                                <Route path="/profile" element={<Profile user={user} />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            )}
        </Router>
    );
}

export default App;
