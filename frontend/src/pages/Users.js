import React, { useState, useEffect } from 'react';
import { usersAPI } from '../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

function Users({ user }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'LogisticsOfficer',
        assignedBase: ''
    });

    useEffect(() => {
        if (user?.role === 'Administrator') {
            fetchUsers();
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
            const response = await usersAPI.getAll();
            setUsers(response.data.users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await usersAPI.create(formData);
            setFormData({ name: '', email: '', password: '', role: 'LogisticsOfficer', assignedBase: '' });
            setShowForm(false);
            fetchUsers();
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    if (user?.role !== 'Administrator') {
        return <div className="p-8 text-red-400">Access Denied: Administrator rights required</div>;
    }

    if (loading) {
        return <div className="p-8">Loading users...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">👥 User Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Add User
                </button>
            </div>

            {showForm && (
                <div className="card mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="input-field"
                            required
                        />
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="input-field"
                        >
                            <option value="LogisticsOfficer">Logistics Officer</option>
                            <option value="Commander">Commander</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Assigned Base"
                            value={formData.assignedBase}
                            onChange={(e) => setFormData({ ...formData, assignedBase: e.target.value })}
                            className="input-field"
                            required
                        />
                        <div className="flex gap-4">
                            <button type="submit" className="btn-primary">Create User</button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="px-6 py-3 text-left text-slate-300">Name</th>
                            <th className="px-6 py-3 text-left text-slate-300">Email</th>
                            <th className="px-6 py-3 text-left text-slate-300">Role</th>
                            <th className="px-6 py-3 text-left text-slate-300">Base</th>
                            <th className="px-6 py-3 text-left text-slate-300">Status</th>
                            <th className="px-6 py-3 text-left text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} className="border-b border-slate-700 hover:bg-slate-700 transition">
                                <td className="px-6 py-3 text-white font-medium">{u.name}</td>
                                <td className="px-6 py-3 text-slate-400">{u.email}</td>
                                <td className="px-6 py-3 text-slate-300">{u.role}</td>
                                <td className="px-6 py-3 text-slate-400">{u.assignedBase}</td>
                                <td className="px-6 py-3">
                                    <span className={`px-3 py-1 rounded-full text-sm ${u.status === 'Active' ? 'bg-green-900 text-green-300' :
                                            'bg-red-900 text-red-300'
                                        }`}>
                                        {u.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3 flex gap-2">
                                    <button className="p-2 hover:bg-slate-600 rounded transition">
                                        <Edit2 className="w-4 h-4 text-blue-400" />
                                    </button>
                                    <button className="p-2 hover:bg-slate-600 rounded transition">
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
