import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCookie, setCookie, deleteCookie, isTokenExpired, parseUserFromToken, COOKIE_NAME } from '../utils/cookies';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    deleteCookie(COOKIE_NAME);
    localStorage.removeItem('userToken');
    setToken(null);
    setUser(null);
  }, []);

  // Check b2Token cookie availability & expiration status
  const syncAuthFromCookie = useCallback(() => {
    const existingCookieToken = getCookie(COOKIE_NAME);
    const localToken = localStorage.getItem('userToken');
    const activeToken = existingCookieToken || localToken;

    if (activeToken) {
      // Verify if cookie/token is expired
      if (isTokenExpired(activeToken)) {
        console.warn('[Auth Monitor] b2Token cookie has expired. Redirecting to login page...');
        logout();
      } else {
        setToken(activeToken);
        const parsedUser = parseUserFromToken(activeToken);
        setUser(parsedUser);
        
        // Ensure cookie is in sync if localToken existed
        if (!existingCookieToken && localToken) {
          setCookie(COOKIE_NAME, localToken, 7);
        }
      }
    } else {
      // Cookie unavailable -> ensure clean logged-out state
      setToken(null);
      setUser(null);
    }
    setLoading(false);
  }, [logout]);

  useEffect(() => {
    syncAuthFromCookie();

    // Heartbeat check: periodic verification of b2Token cookie (every 3 seconds)
    const timer = setInterval(() => {
      const currentCookie = getCookie(COOKIE_NAME);
      if (!currentCookie || isTokenExpired(currentCookie)) {
        syncAuthFromCookie();
      }
    }, 3000);

    // Event listener for tab/window re-focus
    const handleFocus = () => syncAuthFromCookie();
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', handleFocus);

    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('visibilitychange', handleFocus);
    };
  }, [syncAuthFromCookie]);

  const loginWithGoogle = (userInfo, authToken) => {
    const userPayload = userInfo || {
      name: 'Seraj Khan',
      email: 'serajkhan@bamboobox.ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Growth Lead & Admin',
      googleId: '108392019482019482910'
    };

    const tokenStr = authToken || btoa(JSON.stringify(userPayload));
    setCookie(COOKIE_NAME, tokenStr, 7); // 7 days expiration
    localStorage.setItem('userToken', tokenStr);

    setToken(tokenStr);
    setUser(userPayload);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        user,
        loading,
        loginWithGoogle,
        logout,
        syncAuthFromCookie
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
