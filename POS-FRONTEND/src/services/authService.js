import { API_ENDPOINTS } from '../config/api.config';

export const loginUser = async (username, password) => {
    const response = await fetch(API_ENDPOINTS.AUTH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};