import React, { useState } from 'react';
import { Building2, Search, Filter, Globe, Users, Award, DollarSign, ChevronRight, Megaphone, Send } from 'lucide-react';

export const CompaniesPage = ({ strategies, searchQuery, setSearchQuery, onSelectCompany }) => {
  const [selectedTier, setSelectedTier] = useState('ALL');

  // Flatten target companies from all strategies
  const allCompanies = strategies.flatMap(strat =>
    (strat.targetCompanies || []).map(c => ({
      ...c,
      strategyName: strat.name,
      clientSlug: strat.client_slug
    }))
  );

  const filteredCompanies = allCompanies.filter(comp => {
    const matchesSearch =
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.campaignAngle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTier =
      selectedTier === 'ALL' ||
      (selectedTier === 'TIER1' && comp.tier.includes('Tier 1')) ||
      (selectedTier === 'TIER2' && comp.tier.includes('Tier 2'));

    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-400" />
            Target Companies Directory & Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Browse accounts targeted across all active ABM strategies with custom value props and SDR plays.
          </p>
        </div>

        {/* Tier Filter Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setSelectedTier('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedTier === 'ALL'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Tiers ({allCompanies.length})
          </button>
          <button
            onClick={() => setSelectedTier('TIER1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedTier === 'TIER1'
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier 1 Strategic
          </button>
          <button
            onClick={() => setSelectedTier('TIER2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedTier === 'TIER2'
                ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier 2 Clustered
          </button>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map((company) => (
          <div
            key={company.id}
            onClick={() => onSelectCompany(company)}
            className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all duration-200 hover:scale-[1.01] shadow-xl group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center text-lg group-hover:border-cyan-400 group-hover:shadow-glow-cyan transition">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">{company.name}</h3>
                    <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Globe className="h-3 w-3 text-cyan-400" />
                      {company.domain}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                  RTW: {company.rightToWinScore}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-md bg-slate-800 text-slate-300">
                  {company.industry}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-md bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  {company.tier}
                </span>
              </div>

              {/* Value prop angle */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-medium">
                <div className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Megaphone className="h-3 w-3 text-cyan-400" /> Tailored Positioning
                </div>
                "{company.campaignAngle}"
              </div>
            </div>

            {/* Bottom info & Call-to-action */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[160px]" title={company.strategyName}>
                Strategy: <strong className="text-slate-300">{company.clientSlug.toUpperCase()}</strong>
              </span>
              <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                View Account Play <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
