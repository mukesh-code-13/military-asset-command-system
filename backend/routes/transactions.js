import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Transaction from '../models/Transaction.js';
import Asset from '../models/Asset.js';

const router = express.Router();

// Get all transactions
router.get('/', authenticate, async (req, res) => {
    try {
        const { type, status, assetId } = req.query;
        let query = {};

        if (type) query.type = type;
        if (status) query.status = status;
        if (assetId) query.assetId = assetId;

        const transactions = await Transaction.find(query).sort({ timestamp: -1 });
        res.json({ count: transactions.length, transactions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
});

// Get transaction by ID
router.get('/:transactionId', authenticate, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ transactionId: req.params.transactionId });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction', error: error.message });
    }
});

// Get asset history
router.get('/asset/:assetId', authenticate, async (req, res) => {
    try {
        const transactions = await Transaction.find({ assetId: req.params.assetId }).sort({ timestamp: -1 });
        res.json({ assetId: req.params.assetId, count: transactions.length, transactions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asset history', error: error.message });
    }
});

// Create transaction (Logistics Officers and above)
router.post('/', authenticate, authorize(['Administrator', 'Commander', 'LogisticsOfficer']), async (req, res) => {
    try {
        const { type, assetId, fromBase, toBase, quantity, notes } = req.body;

        if (!type || !assetId || !fromBase || !toBase) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        // Verify asset exists
        const asset = await Asset.findOne({ assetId });
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        const transactionId = `TXN-${Date.now()}`;
        const transaction = new Transaction({
            transactionId,
            type,
            assetId,
            fromBase,
            toBase,
            quantity: quantity || 1,
            requestedBy: req.user.email,
            status: 'Requested',
            notes
        });

        await transaction.save();

        // Update asset location if transfer is approved
        if (type === 'Transfer') {
            asset.currentLocation = toBase;
            asset.status = 'In Transit';
            await asset.save();
        }

        res.status(201).json({ message: 'Transaction created', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
});

// Update transaction status (Admin & Commander)
router.put('/:transactionId', authenticate, authorize(['Administrator', 'Commander']), async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const transaction = await Transaction.findOneAndUpdate(
            { transactionId: req.params.transactionId },
            { status, approvedBy: req.user.email, completedDate: status === 'Completed' ? new Date() : null },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction updated', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction', error: error.message });
    }
});

export default router;
