import React from 'react';
import { LayoutDashboard, Target, Building2, Terminal, Key, Sparkles, ChevronRight } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, strategyCount, companyCount, logCount }) => {
  const menuItems = [
    {
      id: 'overview',
      label: 'Overview & Metrics',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'strategies',
      label: 'ABM Strategies',
      icon: Target,
      badge: strategyCount || '3'
    },
    {
      id: 'companies',
      label: 'Target Companies',
      icon: Building2,
      badge: companyCount || '8'
    },
    {
      id: 'mcp-process',
      label: 'MCP Process Logs',
      icon: Terminal,
      badge: logCount || '5'
    },
    {
      id: 'settings',
      label: 'Token & LLM Connect',
      icon: Key,
      badge: 'PRO'
    }
  ];

  return (
    <aside className="w-64 bg-[#0D131F]/80 backdrop-blur-md border-r border-slate-800/80 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        <div>
          <h2 className="px-3 text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Navigation Menu
          </h2>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/10 to-transparent border border-cyan-500/40 text-cyan-300 shadow-glow-cyan'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Info Box: MCP Server status */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/20 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <h4 className="text-xs font-semibold text-slate-200">ABM MCP Server</h4>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Connected via <code className="text-cyan-300 font-mono">b2Token</code> cookie authentication.
          </p>
          <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono bg-cyan-950/60 px-2.5 py-1.5 rounded-lg border border-cyan-500/30">
            <span>Status: Operational</span>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between items-center">
        <span>ABM Dashboard v1.0</span>
        <span className="text-cyan-400 font-mono">BambooBox AI</span>
      </div>
    </aside>
  );
};
