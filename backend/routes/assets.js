import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import Asset from '../models/Asset.js';

const router = express.Router();

// Get all assets
router.get('/', authenticate, async (req, res) => {
    try {
        const { type, location, status } = req.query;
        let query = {};

        if (type) query.type = type;
        if (location) query.currentLocation = location;
        if (status) query.status = status;

        const assets = await Asset.find(query).sort({ createdAt: -1 });
        res.json({ count: assets.length, assets });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assets', error: error.message });
    }
});

// Get asset by ID
router.get('/:assetId', authenticate, async (req, res) => {
    try {
        const asset = await Asset.findOne({ assetId: req.params.assetId });
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }
        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asset', error: error.message });
    }
});

// Get assets by location
router.get('/by-location/:location', authenticate, async (req, res) => {
    try {
        const assets = await Asset.find({ currentLocation: req.params.location });
        res.json({ location: req.params.location, count: assets.length, assets });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assets', error: error.message });
    }
});

// Create asset (Admin & Commander)
router.post('/', authenticate, authorize(['Administrator', 'Commander']), async (req, res) => {
    try {
        const { type, name, serialNumber, currentLocation, quantity } = req.body;

        if (!type || !name || !serialNumber || !currentLocation) {
            return res.status(400).json({ message: 'Required fields missing' });
        }

        const assetId = `ASS-${Date.now()}`;
        const asset = new Asset({
            assetId,
            type,
            name,
            serialNumber,
            currentLocation,
            quantity: quantity || 1
        });

        await asset.save();
        res.status(201).json({ message: 'Asset created', asset });
    } catch (error) {
        res.status(500).json({ message: 'Error creating asset', error: error.message });
    }
});

// Update asset (Admin & Commander)
router.put('/:assetId', authenticate, authorize(['Administrator', 'Commander']), async (req, res) => {
    try {
        const asset = await Asset.findOneAndUpdate(
            { assetId: req.params.assetId },
            req.body,
            { new: true }
        );

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        res.json({ message: 'Asset updated', asset });
    } catch (error) {
        res.status(500).json({ message: 'Error updating asset', error: error.message });
    }
});

// Delete asset (Admin only)
router.delete('/:assetId', authenticate, authorize(['Administrator']), async (req, res) => {
    try {
        const asset = await Asset.findOneAndDelete({ assetId: req.params.assetId });

        if (!asset) {
            return res.status(404).json({ message: 'Asset not found' });
        }

        res.json({ message: 'Asset deleted', asset });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting asset', error: error.message });
    }
});

export default router;
