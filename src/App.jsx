import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardOverview } from './pages/DashboardOverview';
import { StrategiesPage } from './pages/StrategiesPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { McpProcessPage } from './pages/McpProcessPage';
import { SettingsPage } from './pages/SettingsPage';
import { CompanyDetailModal } from './components/CompanyDetailModal';
import { INITIAL_STRATEGIES, INITIAL_MCP_LOGS, INITIAL_TOKENS } from './data/abmStrategyData';

const DashboardContent = () => {
  const { isLoggedIn, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Application state
  const [strategies, setStrategies] = useState(INITIAL_STRATEGIES);
  const [logs, setLogs] = useState(INITIAL_MCP_LOGS);
  const [tokens, setTokens] = useState(INITIAL_TOKENS);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center text-cyan-400 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded-full bg-cyan-400 animate-ping"></div>
          <span>Verifying b2Token session cookie...</span>
        </div>
      </div>
    );
  }

  // If user is not logged in (b2Token cookie missing), show LoginPage
  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          strategyCount={strategies.length}
          companyCount={strategies.reduce((acc, s) => acc + (s.targetCompanies?.length || 0), 0)}
          logCount={logs.length}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden space-y-6">
          {activeTab === 'overview' && (
            <DashboardOverview
              strategies={strategies}
              logs={logs}
              tokens={tokens}
              onNavigate={setActiveTab}
              onSelectCompany={setSelectedCompany}
            />
          )}

          {activeTab === 'strategies' && (
            <StrategiesPage
              strategies={strategies}
              onSelectCompany={setSelectedCompany}
            />
          )}

          {activeTab === 'companies' && (
            <CompaniesPage
              strategies={strategies}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectCompany={setSelectedCompany}
            />
          )}

          {activeTab === 'mcp-process' && (
            <McpProcessPage logs={logs} />
          )}

          {activeTab === 'settings' && (
            <SettingsPage tokens={tokens} setTokens={setTokens} />
          )}
        </main>
      </div>

      {/* Target Company Intelligence Detail Modal */}
      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
