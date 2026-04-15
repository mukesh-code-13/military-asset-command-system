import React, { useState, useEffect } from 'react';
import { usersAPI } from '../api';
import { Save } from 'lucide-react';

function Profile({ user }) {
    const [profile, setProfile] = useState(user);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setProfile(user);
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await usersAPI.updateProfile({ name: profile.name });
            setMessage('Profile updated successfully');
        } catch (error) {
            setMessage('Failed to update profile');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await usersAPI.changePassword(password, newPassword);
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage('Password changed successfully');
        } catch (error) {
            setMessage('Failed to change password');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-8">👤 User Profile</h1>

            {message && (
                <div className={`mb-6 px-4 py-3 rounded-lg ${message.includes('success')
                        ? 'bg-green-900/20 border border-green-700 text-green-400'
                        : 'bg-red-900/20 border border-red-700 text-red-400'
                    }`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Information */}
                <div className="lg:col-span-2 card">
                    <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={profile?.name || ''}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={profile?.email || ''}
                                disabled
                                className="input-field opacity-50 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                            <input
                                type="text"
                                value={profile?.role || ''}
                                disabled
                                className="input-field opacity-50 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Assigned Base</label>
                            <input
                                type="text"
                                value={profile?.assignedBase || ''}
                                disabled
                                className="input-field opacity-50 cursor-not-allowed"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center gap-2 w-full justify-center"
                        >
                            <Save className="w-5 h-5" /> Update Profile
                        </button>
                    </form>
                </div>

                {/* Quick Info */}
                <div>
                    <div className="card">
                        <h3 className="text-xl font-bold text-white mb-4">Account Details</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-slate-400 text-sm">User ID</p>
                                <p className="text-white font-semibold">{profile?.userId}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">Status</p>
                                <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-900 text-green-300 mt-1">
                                    {profile?.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">Last Login</p>
                                <p className="text-white font-semibold">
                                    {new Date(profile?.lastLogin).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="mt-8 card">
                <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
