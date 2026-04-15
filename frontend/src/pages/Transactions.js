import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../api';
import { Plus, CheckCircle, Clock, XCircle } from 'lucide-react';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        type: 'Transfer',
        assetId: '',
        fromBase: '',
        toBase: '',
        notes: ''
    });

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await transactionsAPI.getAll();
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await transactionsAPI.create(formData);
            setFormData({ type: 'Transfer', assetId: '', fromBase: '', toBase: '', notes: '' });
            setShowForm(false);
            fetchTransactions();
        } catch (error) {
            console.error('Failed to create transaction:', error);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Completed':
                return <CheckCircle className="w-4 h-4 text-green-400" />;
            case 'Pending':
            case 'Requested':
                return <Clock className="w-4 h-4 text-yellow-400" />;
            case 'Rejected':
                return <XCircle className="w-4 h-4 text-red-400" />;
            default:
                return null;
        }
    };

    if (loading) {
        return <div className="p-8">Loading transactions...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">📋 Transactions</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> New Transaction
                </button>
            </div>

            {showForm && (
                <div className="card mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="input-field"
                        >
                            <option value="Transfer">Transfer</option>
                            <option value="Assignment">Assignment</option>
                            <option value="Expenditure">Expenditure</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Asset ID (ASS-xxx)"
                            value={formData.assetId}
                            onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="From Base"
                            value={formData.fromBase}
                            onChange={(e) => setFormData({ ...formData, fromBase: e.target.value })}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="To Base"
                            value={formData.toBase}
                            onChange={(e) => setFormData({ ...formData, toBase: e.target.value })}
                            className="input-field"
                            required
                        />
                        <textarea
                            placeholder="Notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="input-field"
                            rows="3"
                        />
                        <div className="flex gap-4">
                            <button type="submit" className="btn-primary">Create Transaction</button>
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

            <div className="card">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="px-6 py-3 text-left text-slate-300">TXN ID</th>
                            <th className="px-6 py-3 text-left text-slate-300">Type</th>
                            <th className="px-6 py-3 text-left text-slate-300">Asset ID</th>
                            <th className="px-6 py-3 text-left text-slate-300">From → To</th>
                            <th className="px-6 py-3 text-left text-slate-300">Status</th>
                            <th className="px-6 py-3 text-left text-slate-300">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn._id} className="border-b border-slate-700 hover:bg-slate-700 transition">
                                <td className="px-6 py-3 text-slate-300">{txn.transactionId}</td>
                                <td className="px-6 py-3 text-white font-medium">{txn.type}</td>
                                <td className="px-6 py-3 text-slate-400">{txn.assetId}</td>
                                <td className="px-6 py-3 text-slate-400">{txn.fromBase} → {txn.toBase}</td>
                                <td className="px-6 py-3">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(txn.status)}
                                        <span className={`px-3 py-1 rounded-full text-sm ${txn.status === 'Completed' ? 'bg-green-900 text-green-300' :
                                                txn.status === 'Requested' ? 'bg-yellow-900 text-yellow-300' :
                                                    txn.status === 'Rejected' ? 'bg-red-900 text-red-300' :
                                                        'bg-blue-900 text-blue-300'
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-3 text-slate-400">{new Date(txn.timestamp).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transactions;
