export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            }
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/login';
            return null;
        }

        return response;

    } catch (err) {
        console.log('fetch error:', err.message);
        window.location.href = '/login';
        return null;
    }
};