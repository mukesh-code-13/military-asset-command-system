import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        transactionId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        type: {
            type: String,
            enum: ['Transfer', 'Assignment', 'Expenditure', 'Reclaim', 'Purchase'],
            required: true,
            index: true
        },
        assetId: {
            type: String,
            required: true,
            index: true
        },
        fromBase: {
            type: String,
            required: true
        },
        toBase: {
            type: String,
            required: true
        },
        fromUnit: String,
        toUnit: String,
        quantity: {
            type: Number,
            default: 1
        },
        requestedBy: {
            type: String,
            required: true
        },
        approvedBy: String,
        status: {
            type: String,
            enum: ['Requested', 'Approved', 'In Transit', 'Completed', 'Rejected'],
            default: 'Requested',
            index: true
        },
        timestamp: {
            type: Date,
            default: Date.now,
            index: true
        },
        completedDate: Date,
        notes: String,
        cost: Number,
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            default: 'Medium'
        }
    },
    { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
