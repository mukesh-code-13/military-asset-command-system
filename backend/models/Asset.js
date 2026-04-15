import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
    {
        assetId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        type: {
            type: String,
            enum: ['Vehicle', 'Weapon', 'Ammunition', 'Equipment', 'Supply'],
            required: true
        },
        name: {
            type: String,
            required: true,
            index: true
        },
        serialNumber: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ['Operational', 'Maintenance', 'Retired', 'In Transit'],
            default: 'Operational'
        },
        currentLocation: {
            type: String,
            required: true,
            index: true
        },
        currentAssignee: String,
        acquisitionDate: Date,
        quantity: {
            type: Number,
            default: 1
        },
        condition: {
            type: String,
            enum: ['Excellent', 'Good', 'Fair', 'Poor'],
            default: 'Good'
        },
        maintenanceHistory: [
            {
                date: Date,
                description: String,
                cost: Number
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model('Asset', assetSchema);
