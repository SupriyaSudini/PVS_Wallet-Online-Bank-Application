import axios from 'axios';

// Replace 'https://your-deployment-link' with your actual deployment link
export const axiosInstance = axios.create({
    baseURL: 'https://pvs-wallet-backend.vercel.app/',
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
