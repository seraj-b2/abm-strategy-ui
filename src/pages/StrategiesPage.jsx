import React, { useState } from 'react';
import { Target, CheckCircle2, Clock, FileText, Download, Building2, User, Globe, DollarSign, ChevronRight, Layers, ArrowUpRight, Search } from 'lucide-react';

export const StrategiesPage = ({ strategies, onSelectCompany }) => {
  const [selectedStrategyId, setSelectedStrategyId] = useState(strategies[0]?.id || 'naukri');
  const [previewFile, setPreviewFile] = useState(null);

  const currentStrategy = strategies.find(s => s.id === selectedStrategyId) || strategies[0];

  const STAGE_GATE_LABELS = {
    "01-project-setup": "01. Project Setup",
    "02-main-inputs": "02. Main Inputs",
    "03-market-analysis": "03. Market Analysis",
    "04-category-maturity-analysis": "04. Category Maturity",
    "05-competitor-analysis": "05. Competitor Analysis",
    "06-brand-strength-analysis": "06. Brand Strength",
    "07-right-to-win-analysis": "07. Right-to-Win",
    "08-icp-segments": "08. ICP Segments",
    "09-personas": "09. Buyer Personas",
    "10-playbook-selection": "10. Playbook Selection",
    "11-previous-campaign-analysis": "11. Campaign Analysis",
    "12-campaign-theme": "12. Campaign Theme",
    "13-content-plan": "13. Content Plan",
    "14-linkedinads-campaign-design": "14. LinkedIn Ads",
    "15-email-campaign-design": "15. Email Nurture",
    "16-googleads-campaign-design": "16. Google Ads",
    "17-aeo-geo-recommendations": "17. AEO/GEO Engine",
    "18-linkedin-organic": "18. LinkedIn Organic",
    "19-sdr-play-design": "19. SDR Outreach",
    "20-abm-strategy-document": "20. Master ABM Doc",
    "21-abm-strategy-presentation": "21. Slide Presentation"
  };

  return (
    <div className="space-y-6">
      {/* Strategy Tabs Selector */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {strategies.map((strat) => (
          <button
            key={strat.id}
            onClick={() => setSelectedStrategyId(strat.id)}
            className={`px-5 py-3 rounded-2xl font-medium text-sm transition-all duration-200 shrink-0 flex items-center gap-3 border ${
              selectedStrategyId === strat.id
                ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/10 to-transparent border-cyan-500/60 text-white shadow-glow-cyan'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className={`h-2 w-2 rounded-full ${selectedStrategyId === strat.id ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></div>
            <div className="text-left">
              <div className="font-bold">{strat.name}</div>
              <div className="text-[11px] text-slate-400">Created by {strat.createdBy.name}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Strategy Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{currentStrategy.name}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {currentStrategy.status}
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              {currentStrategy.summary}
            </p>
          </div>

          {/* Author Badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 shrink-0">
            <img
              src={currentStrategy.createdBy.avatar}
              alt={currentStrategy.createdBy.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-cyan-500/40"
            />
            <div>
              <div className="text-xs font-semibold text-slate-200">{currentStrategy.createdBy.name}</div>
              <div className="text-[11px] text-slate-400">{currentStrategy.createdBy.role}</div>
              <div className="text-[10px] text-cyan-400 font-mono mt-0.5">{currentStrategy.createdBy.email}</div>
            </div>
          </div>
        </div>

        {/* Key Strategy Parameters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <div className="text-[11px] text-slate-500 font-mono uppercase">Quarterly Budget</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{currentStrategy.budget}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <div className="text-[11px] text-slate-500 font-mono uppercase">Target Geography</div>
            <div className="text-sm font-bold text-slate-200 mt-0.5">{currentStrategy.targetGeography}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <div className="text-[11px] text-slate-500 font-mono uppercase">Website / Product</div>
            <div className="text-sm font-bold text-cyan-400 mt-0.5 font-mono">{currentStrategy.website}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <div className="text-[11px] text-slate-500 font-mono uppercase">Target Accounts</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">{currentStrategy.targetCompanies?.length || 0} Targeted</div>
          </div>
        </div>
      </div>

      {/* 21 Stage Gates Execution Matrix */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            21 Stage Gates Progression Matrix
          </h3>
          <span className="text-xs text-slate-400">
            Completed: <strong className="text-cyan-400">{Object.values(currentStrategy.stageGates || {}).filter(s => s === 'completed').length} / 21</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {Object.entries(currentStrategy.stageGates || {}).map(([gateKey, status]) => {
            const label = STAGE_GATE_LABELS[gateKey] || gateKey;
            const isCompleted = status === 'completed';
            const isPartial = status === 'partial';

            return (
              <div
                key={gateKey}
                className={`p-2.5 rounded-xl border text-xs transition-all ${
                  isCompleted
                    ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                    : isPartial
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-semibold">{gateKey.split('-')[0]}</span>
                  {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />}
                  {isPartial && <Clock className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                </div>
                <div className="truncate font-medium text-[11px]" title={label}>{label.split('.')[1].trim()}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Companies Grid & Output Files Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Target Companies (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-400" />
              Target Companies in {currentStrategy.name}
            </h3>
            <span className="text-xs text-slate-400">Click account for deep intelligence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStrategy.targetCompanies?.map((company) => (
              <div
                key={company.id}
                onClick={() => onSelectCompany(company)}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all duration-200 hover:scale-[1.01] shadow-lg group space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-base group-hover:border-cyan-400">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">{company.name}</h4>
                      <span className="text-xs font-mono text-slate-400">{company.domain}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                    RTW: {company.rightToWinScore}
                  </span>
                </div>

                <div className="text-xs text-slate-300 line-clamp-2">
                  "{company.campaignAngle}"
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span>{company.tier}</span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                    View SDR Plays <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Output Docs Viewer (1 col) */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-400" />
            Generated Strategy Artifacts
          </h3>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            {currentStrategy.outputFiles?.map((file, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-purple-500/40 transition flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-purple-950 text-purple-400 border border-purple-500/30 shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-200 truncate group-hover:text-purple-300">{file.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{file.desc}</div>
                  </div>
                </div>

                <button
                  onClick={() => setPreviewFile(file)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-purple-950 hover:text-purple-300 text-slate-300 text-[11px] font-mono font-medium rounded-lg transition shrink-0 border border-slate-700"
                >
                  Preview
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-purple-500/30 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-400" />
                <h4 className="text-base font-bold text-white">{previewFile.name}</h4>
              </div>
              <button onClick={() => setPreviewFile(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-slate-400">File Type: <span className="font-mono text-purple-300">{previewFile.type}</span> ({previewFile.size})</div>
              <div className="text-xs text-slate-300">{previewFile.desc}</div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 max-h-60 overflow-y-auto leading-relaxed">
                # Sample Output Artifact Preview for {previewFile.name}<br /><br />
                Target Strategy: {currentStrategy.name}<br />
                Created by MCP Server tool execution (Stage Gate 20/21)<br />
                Status: Verified & Processed by {currentStrategy.createdBy.name}<br />
                Path: /abm_strategy/{currentStrategy.client_slug}/outputs/{previewFile.name}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setPreviewFile(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-xl">
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
