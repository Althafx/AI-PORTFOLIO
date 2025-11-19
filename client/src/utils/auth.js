// Authentication utility functions

export const setToken = (token) => {
    localStorage.setItem('adminToken', token);
};

export const getToken = () => {
    return localStorage.getItem('adminToken');
};

export const removeToken = () => {
    localStorage.removeItem('adminToken');
};

export const isAuthenticated = () => {
    return !!getToken();
};

export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};
