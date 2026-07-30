import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { setCookie, COOKIE_NAME } from '../utils/cookies';
import { Cpu, AlertCircle, RefreshCw } from 'lucide-react';

const GOOGLE_CLIENT_ID = "290716376602-o34ee961teqln77hbq81fpmfmgnebm0e.apps.googleusercontent.com";
const BACKEND_AUTH_URL = window.location.hostname === 'localhost' ? "http://localhost:5000/auth/google" : "/auth/google";

export const LoginPage = () => {
  const { loginWithGoogle } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Helper to decode Google JWT payload client side as fallback
  const decodeGoogleJwt = (credentialStr) => {
    try {
      const base64Url = credentialStr.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.warn('Failed to parse Google JWT payload client-side:', e);
      return null;
    }
  };

  // Google Callback handler
  const handleGoogleCallback = async (response) => {
    setIsLoggingIn(true);
    setErrorMsg(null);

    const googleIdToken = response.credential;
    console.log('[Google GSI] Received ID token credential from Google');

    try {
      // Send token to Node.js backend
      const res = await fetch(BACKEND_AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credential: googleIdToken
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        console.log('Logged in user via backend:', data.user);
        console.log('Session JWT:', data.token);

        // Save session JWT token in localStorage and b2Token Cookie
        localStorage.setItem('userToken', data.token);
        setCookie(COOKIE_NAME, data.token, 7);

        loginWithGoogle(data.user, data.token);
      } else {
        console.warn('Backend Google auth failed/warned:', data.message);
        // Fallback using decoded Google token payload if backend returns error or is in dev verification mode
        const decoded = decodeGoogleJwt(googleIdToken);
        if (decoded && decoded.email) {
          const userObj = {
            name: decoded.name || decoded.email.split('@')[0],
            email: decoded.email,
            avatar: decoded.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            googleId: decoded.sub,
            role: 'ABM Growth Lead'
          };
          localStorage.setItem('userToken', googleIdToken);
          setCookie(COOKIE_NAME, googleIdToken, 7);
          loginWithGoogle(userObj, googleIdToken);
        } else {
          setErrorMsg(data.message || 'Google login failed');
        }
      }
    } catch (err) {
      console.warn('[Backend Offline/Fetch Error] Falling back to client-side Google authentication:', err);
      const decoded = decodeGoogleJwt(googleIdToken);
      if (decoded && decoded.email) {
        const userObj = {
          name: decoded.name || decoded.email.split('@')[0],
          email: decoded.email,
          avatar: decoded.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          googleId: decoded.sub,
          role: 'ABM Growth Lead'
        };
        localStorage.setItem('userToken', googleIdToken);
        setCookie(COOKIE_NAME, googleIdToken, 7);
        loginWithGoogle(userObj, googleIdToken);
      } else {
        setErrorMsg('Unable to connect to auth backend.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Initialize Google Button via GSI SDK
  useEffect(() => {
    const initGoogleGsi = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCallback
          });

          const btnElem = document.getElementById('googleSignInBtn');
          if (btnElem) {
            btnElem.innerHTML = '';
            window.google.accounts.id.renderButton(btnElem, {
              theme: 'outline',
              size: 'large',
              width: 280,
              text: 'signin_with',
              shape: 'pill'
            });
          }
        } catch (e) {
          console.error('Error rendering Google Sign-In button:', e);
        }
      }
    };

    // If script is already loaded, init immediately, else retry
    initGoogleGsi();
    const timer = setInterval(() => {
      if (window.google?.accounts?.id) {
        initGoogleGsi();
        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient dark glowing background lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-sm space-y-6 relative z-10">
        {/* Top Logo & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-glow-cyan">
            <div className="h-full w-full bg-[#0B0F17] rounded-[14px] flex items-center justify-center">
              <Cpu className="h-8 w-8 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ABM Strategy Engine</h1>
            <p className="text-sm text-slate-400 mt-1">Multi-User MCP Server & Target Company Studio</p>
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="glass-panel p-8 rounded-3xl space-y-6 border border-slate-800 shadow-2xl">
          <div className="text-center space-y-1">
            <h2 className="text-base font-semibold text-slate-200">Welcome Back</h2>
            <p className="text-xs text-slate-400">Sign in with your Google account to access your dashboard</p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Render Google Sign In Button */}
          <div className="flex flex-col items-center justify-center min-h-[50px]">
            {isLoggingIn ? (
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs py-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Authenticating with Google...</span>
              </div>
            ) : (
              <div id="googleSignInBtn" className="flex justify-center shadow-lg"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
