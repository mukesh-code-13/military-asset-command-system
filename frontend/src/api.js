import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth Service
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (data) => api.post('/auth/register', data)
};

// Assets Service
export const assetsAPI = {
    getAll: (filters = {}) => api.get('/assets', { params: filters }),
    getById: (assetId) => api.get(`/assets/${assetId}`),
    getByLocation: (location) => api.get(`/assets/by-location/${location}`),
    create: (data) => api.post('/assets', data),
    update: (assetId, data) => api.put(`/assets/${assetId}`, data),
    delete: (assetId) => api.delete(`/assets/${assetId}`)
};

// Transactions Service
export const transactionsAPI = {
    getAll: (filters = {}) => api.get('/transactions', { params: filters }),
    getById: (transactionId) => api.get(`/transactions/${transactionId}`),
    getAssetHistory: (assetId) => api.get(`/transactions/asset/${assetId}`),
    create: (data) => api.post('/transactions', data),
    updateStatus: (transactionId, status) => api.put(`/transactions/${transactionId}`, { status })
};

// Dashboard Service
export const dashboardAPI = {
    getMetrics: () => api.get('/dashboard'),
    getInventory: (base) => api.get(`/dashboard/inventory/${base}`),
    getUtilization: () => api.get('/dashboard/analytics/utilization'),
    getPredictions: () => api.get('/dashboard/analytics/predictions')
};

// Users Service
export const usersAPI = {
    getAll: () => api.get('/users'),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    changePassword: (currentPassword, newPassword) =>
        api.post('/users/change-password', { currentPassword, newPassword }),
    create: (data) => api.post('/users', data),
    update: (userId, data) => api.put(`/users/${userId}`, data)
};

export default api;
