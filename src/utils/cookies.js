/**
 * Cookie management helpers for b2Token verification & auth session state
 */

export const COOKIE_NAME = 'b2Token';

export const getCookie = (name = COOKIE_NAME) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

export const setCookie = (name, value, days = 7) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
};

export const deleteCookie = (name = COOKIE_NAME) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax`;
};

/**
 * Checks if token is expired based on JWT exp timestamp or base64 JSON payload
 */
export const isTokenExpired = (tokenStr) => {
  if (!tokenStr) return true;
  try {
    let payload = null;

    // Check standard JWT token format (header.payload.signature)
    if (tokenStr.includes('.')) {
      const parts = tokenStr.split('.');
      if (parts.length >= 2) {
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonStr = atob(base64);
        payload = JSON.parse(jsonStr);
      }
    } else if (tokenStr.startsWith('{')) {
      payload = JSON.parse(tokenStr);
    } else {
      const decoded = atob(tokenStr);
      payload = JSON.parse(decoded);
    }

    if (payload && payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    }
    return false; // No exp claim, token valid
  } catch (e) {
    return false;
  }
};

export const parseUserFromToken = (tokenStr) => {
  if (!tokenStr) return null;
  try {
    let payload = null;

    if (tokenStr.includes('.')) {
      const parts = tokenStr.split('.');
      if (parts.length >= 2) {
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonStr = atob(base64);
        payload = JSON.parse(jsonStr);
      }
    } else if (tokenStr.startsWith('{')) {
      payload = JSON.parse(tokenStr);
    } else {
      const decoded = atob(tokenStr);
      payload = JSON.parse(decoded);
    }

    if (payload) {
      return {
        name: payload.name || (payload.email ? payload.email.split('@')[0] : 'Google User'),
        email: payload.email || 'user@bamboobox.ai',
        avatar: payload.picture || payload.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: payload.role || 'ABM Growth Lead & MCP Admin'
      };
    }
  } catch (e) {
    // Fallback
  }

  return {
    name: 'Google User',
    email: 'user@bamboobox.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'ABM Growth Lead & MCP Admin'
  };
};
