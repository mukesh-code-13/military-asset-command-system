import React, { useState, useEffect } from 'react';
import { assetsAPI } from '../api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

function Assets() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        serialNumber: '',
        currentLocation: '',
        quantity: 1
    });

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            const response = await assetsAPI.getAll();
            setAssets(response.data.assets);
        } catch (error) {
            console.error('Failed to fetch assets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await assetsAPI.create(formData);
            setFormData({ type: '', name: '', serialNumber: '', currentLocation: '', quantity: 1 });
            setShowForm(false);
            fetchAssets();
        } catch (error) {
            console.error('Failed to create asset:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading assets...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">📦 Assets Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Add Asset
                </button>
            </div>

            {showForm && (
                <div className="card mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Asset Type (Vehicle, Weapon, etc.)"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Asset Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Serial Number"
                            value={formData.serialNumber}
                            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Current Location (Base Name)"
                            value={formData.currentLocation}
                            onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                            className="input-field"
                            min="1"
                        />
                        <div className="flex gap-4">
                            <button type="submit" className="btn-primary">Create Asset</button>
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
                            <th className="px-6 py-3 text-left text-slate-300">Asset ID</th>
                            <th className="px-6 py-3 text-left text-slate-300">Name</th>
                            <th className="px-6 py-3 text-left text-slate-300">Type</th>
                            <th className="px-6 py-3 text-left text-slate-300">Location</th>
                            <th className="px-6 py-3 text-left text-slate-300">Status</th>
                            <th className="px-6 py-3 text-left text-slate-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset) => (
                            <tr key={asset._id} className="border-b border-slate-700 hover:bg-slate-700 transition">
                                <td className="px-6 py-3 text-slate-300">{asset.assetId}</td>
                                <td className="px-6 py-3 text-white font-medium">{asset.name}</td>
                                <td className="px-6 py-3 text-slate-400">{asset.type}</td>
                                <td className="px-6 py-3 text-slate-400">{asset.currentLocation}</td>
                                <td className="px-6 py-3">
                                    <span className={`px-3 py-1 rounded-full text-sm ${asset.status === 'Operational' ? 'bg-green-900 text-green-300' :
                                            asset.status === 'In Transit' ? 'bg-blue-900 text-blue-300' :
                                                'bg-yellow-900 text-yellow-300'
                                        }`}>
                                        {asset.status}
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

export default Assets;
