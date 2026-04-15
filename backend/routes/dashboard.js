import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Asset from '../models/Asset.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Main dashboard metrics
router.get('/', authenticate, async (req, res) => {
    try {
        const totalAssets = await Asset.countDocuments();
        const operationalAssets = await Asset.countDocuments({ status: 'Operational' });
        const assetsInTransit = await Asset.countDocuments({ status: 'In Transit' });
        const underMaintenance = await Asset.countDocuments({ status: 'Maintenance' });

        const pendingTransactions = await Transaction.countDocuments({ status: 'Requested' });
        const approvedTransactions = await Transaction.countDocuments({ status: 'Approved' });
        const completedTransactions = await Transaction.countDocuments({ status: 'Completed' });

        const assetsByType = await Asset.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        const transactionsByType = await Transaction.aggregate([
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        res.json({
            assetMetrics: {
                total: totalAssets,
                operational: operationalAssets,
                inTransit: assetsInTransit,
                underMaintenance,
                byType: assetsByType
            },
            transactionMetrics: {
                pending: pendingTransactions,
                approved: approvedTransactions,
                completed: completedTransactions,
                byType: transactionsByType
            },
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard', error: error.message });
    }
});

// Inventory by base
router.get('/inventory/:base', authenticate, async (req, res) => {
    try {
        const assets = await Asset.find({ currentLocation: req.params.base });
        const assetsByType = await Asset.aggregate([
            { $match: { currentLocation: req.params.base } },
            { $group: { _id: '$type', count: { $sum: 1 } } }
        ]);

        res.json({
            base: req.params.base,
            totalAssets: assets.length,
            assetsByType,
            assets
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory', error: error.message });
    }
});

// Utilization analytics
router.get('/analytics/utilization', authenticate, async (req, res) => {
    try {
        const utilization = await Asset.aggregate([
            {
                $group: {
                    _id: '$type',
                    total: { $sum: 1 },
                    assigned: {
                        $sum: {
                            $cond: [{ $ne: ['$currentAssignee', null] }, 1, 0]
                        }
                    },
                    available: {
                        $sum: {
                            $cond: [{ $eq: ['$currentAssignee', null] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        res.json({
            utilization,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics', error: error.message });
    }
});

// Predictions (mock data)
router.get('/analytics/predictions', authenticate, async (req, res) => {
    try {
        const predictions = [
            {
                assetType: 'Ammunition',
                currentStock: 5000,
                estimatedDepletion: 'in 45 days',
                recommendedAction: 'Reorder immediately',
                priority: 'High'
            },
            {
                assetType: 'Vehicle Fuel',
                currentStock: 3000,
                estimatedDepletion: 'in 90 days',
                recommendedAction: 'Plan replenishment',
                priority: 'Medium'
            }
        ];

        res.json({
            predictions,
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching predictions', error: error.message });
    }
});

export default router;
