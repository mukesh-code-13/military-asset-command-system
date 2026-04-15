import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        },
        password: {
            type: String,
            required: true
        },
        rank: String,
        role: {
            type: String,
            enum: ['Administrator', 'Commander', 'LogisticsOfficer'],
            required: true,
            index: true
        },
        assignedBase: {
            type: String,
            required: true
        },
        department: String,
        permissions: [String],
        status: {
            type: String,
            enum: ['Active', 'Inactive', 'Suspended'],
            default: 'Active'
        },
        lastLogin: Date,
        loginAttempts: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
