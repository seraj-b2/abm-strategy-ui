import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogOut, Search, Cpu, Key, UserCheck } from 'lucide-react';

export const Navbar = ({ activeTab, searchQuery, setSearchQuery }) => {
  const { user, logout, token } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Brand logo & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-violet-600 p-0.5 shadow-glow-cyan flex items-center justify-center">
            <div className="h-full w-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
              <Cpu className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-wide">ABM Strategy Engine</h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                MCP Server v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Multi-User Execution & Target Company Intelligence</span>
            </p>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex items-center max-w-md w-full relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search strategy, target company, industry, or persona..."
            className="w-full bg-slate-900/90 border border-slate-700/70 focus:border-cyan-500/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition"
          />
        </div>

        {/* Right: Auth cookie badge & User profile */}
        <div className="flex items-center gap-3">
          {/* b2Token Cookie Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-medium">b2Token: ACTIVE</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* User profile dropdown / card */}
          {user && (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="h-9 w-9 rounded-full ring-2 ring-cyan-500/50 object-cover"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-slate-200">{user.name}</div>
                <div className="text-[11px] text-slate-400">{user.email}</div>
              </div>

              {/* Logout button */}
              <button
                onClick={logout}
                title="Sign out & clear b2Token cookie"
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-800/40 rounded-lg transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
