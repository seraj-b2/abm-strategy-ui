import React from 'react';
import { Target, Building2, Terminal, Key, ArrowUpRight, CheckCircle2, Clock, Play, UserCheck, Layers } from 'lucide-react';

export const DashboardOverview = ({ strategies, logs, tokens, onNavigate, onSelectCompany }) => {
  const totalCompanies = strategies.reduce((acc, curr) => acc + (curr.targetCompanies?.length || 0), 0);
  const totalCompletedStages = strategies.reduce((acc, curr) => {
    const completed = Object.values(curr.stageGates || {}).filter(status => status === 'completed').length;
    return acc + completed;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-medium mb-1">
              <SparklesIcon className="h-4 w-4" /> ABM MCP Strategy Command Center
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Multi-User MCP Server Dashboard
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Track ABM strategy generation across teams, inspect target account ICP tiering, monitor live MCP tool executions, and generate LLM access tokens.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onNavigate('strategies')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-glow-cyan transition flex items-center gap-2"
            >
              <span>Explore Strategies</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Strategies</span>
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mt-3">{strategies.length}</div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">{totalCompletedStages}</span> stage gates completed
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Companies</span>
            <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-500/30">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mt-3">{totalCompanies}</div>
          <div className="text-xs text-slate-400 mt-1">Tier 1 & Tier 2 Accounts</div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">MCP Tool Runs</span>
            <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-500/30">
              <Terminal className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mt-3">{logs.length}</div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> 100% Execution Success
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active LLM Tokens</span>
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              <Key className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mt-3">{tokens.length}</div>
          <div className="text-xs text-slate-400 mt-1">Claude & Cursor Connected</div>
        </div>
      </div>

      {/* Main Grid: Strategies Overview & Recent Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Active ABM Strategies */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-cyan-400" />
              Active ABM Strategies & Stage Gates
            </h3>
            <button
              onClick={() => onNavigate('strategies')}
              className="text-xs text-cyan-400 hover:underline font-medium"
            >
              View All Strategies →
            </button>
          </div>

          <div className="space-y-4">
            {strategies.map((strat) => (
              <div
                key={strat.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-100">{strat.name}</h4>
                      <span className="px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {strat.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Created by <span className="text-slate-200 font-semibold">{strat.createdBy.name}</span> on {strat.createdDate} • Budget: {strat.budget}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('strategies')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                    >
                      Open Details
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                    <span>Stage Gate Completion: 21 Stages</span>
                    <span className="font-semibold text-cyan-400">{strat.completionPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${strat.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Target Companies preview list */}
                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Target Accounts Preview ({strat.targetCompanies?.length || 0} Companies)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {strat.targetCompanies?.map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => onSelectCompany(comp)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/40 text-xs text-slate-200 transition flex items-center gap-1.5"
                      >
                        <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{comp.name}</span>
                        <span className="text-[10px] text-slate-400">({comp.tier.split('-')[0].trim()})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 col): MCP Server Process Activity Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="h-5 w-5 text-purple-400" />
              Live MCP Server Activity
            </h3>
            <button
              onClick={() => onNavigate('mcp-process')}
              className="text-xs text-purple-400 hover:underline font-medium"
            >
              View Full Logs →
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
            {logs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-semibold">{log.skill}</span>
                  <span className="text-[10px] text-slate-500">{log.timestamp.split('T')[1].substring(0, 8)}</span>
                </div>
                <p className="text-slate-300 text-[11px] font-sans">{log.details}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
                  <span className="flex items-center gap-1">
                    <UserCheck className="h-3 w-3 text-indigo-400" /> {log.user}
                  </span>
                  <span className="text-emerald-400 font-medium">{log.durationMs}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
