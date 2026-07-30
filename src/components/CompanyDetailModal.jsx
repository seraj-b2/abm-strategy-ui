import React from 'react';
import { X, Building2, Globe, Users, Target, ShieldCheck, Mail, Megaphone, Send, Award, DollarSign } from 'lucide-react';

export const CompanyDetailModal = ({ company, onClose }) => {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F172A] border border-cyan-500/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xl shadow-glow-cyan">
              {company.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white">{company.name}</h3>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  {company.tier}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  {company.domain}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                  {company.industry}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-purple-400" />
                  {company.employees}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-emerald-400" /> Right to Win
              </div>
              <div className="text-2xl font-bold text-emerald-400">{company.rightToWinScore}/100</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-cyan-400" /> Media Budget
              </div>
              <div className="text-xl font-bold text-cyan-300">{company.budgetAllocated}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-slate-400 mb-1 flex items-center gap-1">
                <Target className="h-3.5 w-3.5 text-purple-400" /> Status
              </div>
              <div className="text-sm font-semibold text-purple-300 mt-1">{company.status}</div>
            </div>
          </div>

          {/* Campaign Positioning Angle */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
            <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Megaphone className="h-4 w-4 text-cyan-400" />
              Tailored ABM Value Proposition
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              "{company.campaignAngle}"
            </p>
          </div>

          {/* Target Buyer Personas */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Users className="h-4 w-4 text-indigo-400" />
              Target Buyer Committee Personas
            </h4>
            <div className="flex flex-wrap gap-2">
              {company.personas?.map((persona, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 text-xs font-medium"
                >
                  🎯 {persona}
                </span>
              ))}
            </div>
          </div>

          {/* SDR Playbook & Channels */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5 text-cyan-400" />
                SDR Outreach Playbook
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {company.sdrPlay}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-purple-400" />
                Ad & Channel Mix
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {company.adChannel}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
