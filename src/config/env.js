// Environment configuration wrapper for Vite app
export const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '290716376602-o34ee961teqln77hbq81fpmfmgnebm0e.apps.googleusercontent.com';

export const BACKEND_AUTH_URL = `${BACKEND_BASE_URL}/auth/google`;
export const BACKEND_TOKENS_URL = `${BACKEND_BASE_URL}/tokens`;
