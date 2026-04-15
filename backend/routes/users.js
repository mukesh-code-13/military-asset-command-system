import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticate, authorize(['Administrator']), async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ count: users.length, users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { name, rank, department } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { name, rank, department },
            { new: true }
        ).select('-password');

        res.json({ message: 'Profile updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// Change password
router.post('/change-password', authenticate, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Both passwords required' });
        }

        const user = await User.findById(req.user.userId);
        const isPasswordValid = await user.matchPassword(currentPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error changing password', error: error.message });
    }
});

// Create user (Admin only)
router.post('/', authenticate, authorize(['Administrator']), async (req, res) => {
    try {
        const { name, email, password, role, assignedBase } = req.body;

        if (!name || !email || !password || !role || !assignedBase) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const userId = `USR-${Date.now()}`;
        const user = new User({
            userId,
            name,
            email,
            password,
            role,
            assignedBase
        });

        await user.save();
        res.status(201).json({ message: 'User created', user: { userId: user.userId, name, email, role } });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Update user (Admin only)
router.put('/:userId', authenticate, authorize(['Administrator']), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { ...req.body, password: undefined },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

export default router;
