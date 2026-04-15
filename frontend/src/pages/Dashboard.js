import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

function Dashboard() {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const response = await dashboardAPI.getMetrics();
            setMetrics(response.data);
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-8">Loading dashboard...</div>;
    }

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Assets */}
                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Total Assets</p>
                            <p className="text-3xl font-bold text-white mt-2">
                                {metrics?.assetMetrics?.total || 0}
                            </p>
                        </div>
                        <Package className="w-12 h-12 text-blue-400 opacity-20" />
                    </div>
                </div>

                {/* Operational */}
                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Operational</p>
                            <p className="text-3xl font-bold text-green-400 mt-2">
                                {metrics?.assetMetrics?.operational || 0}
                            </p>
                        </div>
                        <CheckCircle className="w-12 h-12 text-green-400 opacity-20" />
                    </div>
                </div>

                {/* In Transit */}
                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">In Transit</p>
                            <p className="text-3xl font-bold text-yellow-400 mt-2">
                                {metrics?.assetMetrics?.inTransit || 0}
                            </p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-yellow-400 opacity-20" />
                    </div>
                </div>

                {/* Pending Transactions */}
                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm">Pending Txns</p>
                            <p className="text-3xl font-bold text-red-400 mt-2">
                                {metrics?.transactionMetrics?.pending || 0}
                            </p>
                        </div>
                        <AlertCircle className="w-12 h-12 text-red-400 opacity-20" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Assets by Type */}
                <div className="card">
                    <h2 className="text-xl font-bold text-white mb-4">Assets by Type</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={metrics?.assetMetrics?.byType || []}
                                dataKey="count"
                                nameKey="_id"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {(metrics?.assetMetrics?.byType || []).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Transaction Status */}
                <div className="card">
                    <h2 className="text-xl font-bold text-white mb-4">Transaction Status</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Completed</span>
                            <span className="text-2xl font-bold text-green-400">
                                {metrics?.transactionMetrics?.completed || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Approved</span>
                            <span className="text-2xl font-bold text-blue-400">
                                {metrics?.transactionMetrics?.approved || 0}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-300">Pending</span>
                            <span className="text-2xl font-bold text-yellow-400">
                                {metrics?.transactionMetrics?.pending || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Asset Health */}
            <div className="card">
                <h2 className="text-xl font-bold text-white mb-4">Asset Health Overview</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-700 rounded-lg">
                        <p className="text-slate-400 text-sm">Maintenance Required</p>
                        <p className="text-2xl font-bold text-red-400 mt-1">
                            {metrics?.assetMetrics?.underMaintenance || 0}
                        </p>
                    </div>
                    <div className="p-4 bg-slate-700 rounded-lg">
                        <p className="text-slate-400 text-sm">Deployed</p>
                        <p className="text-2xl font-bold text-green-400 mt-1">
                            {metrics?.assetMetrics?.operational || 0}
                        </p>
                    </div>
                    <div className="p-4 bg-slate-700 rounded-lg">
                        <p className="text-slate-400 text-sm">Retired</p>
                        <p className="text-2xl font-bold text-gray-400 mt-1">0</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
