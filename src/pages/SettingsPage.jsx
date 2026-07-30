import React, { useState, useEffect, useCallback } from 'react';
import { Key, Copy, Check, ShieldCheck, Sparkles, Plus, Trash2, Code, AlertTriangle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BACKEND_TOKENS_URL = window.location.hostname === 'localhost' ? "http://localhost:5000/tokens" : "/tokens";

export const SettingsPage = ({ tokens: initialMockTokens, setTokens: setMockTokens }) => {
  const { user, token: authSessionToken } = useAuth();
  const [tokensList, setTokensList] = useState(initialMockTokens || []);
  const [tokenName, setTokenName] = useState('');
  const [expiryOption, setExpiryOption] = useState('NEVER'); // 'NEVER', '30', '90', '365'
  
  const [isLoading, setIsLoading] = useState(false);
  const [newlyCreatedRawToken, setNewlyCreatedRawToken] = useState(null);
  const [copiedTokenId, setCopiedTokenId] = useState(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeLlmTab, setActiveLlmTab] = useState('claude');
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch tokens from backend server
  const fetchBackendTokens = useCallback(async () => {
    if (!authSessionToken) return;
    setIsLoading(true);
    try {
      const res = await fetch(BACKEND_TOKENS_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authSessionToken}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.tokens)) {
        const formatted = data.tokens.map(t => ({
          id: t.id,
          name: t.name,
          token: `${t.prefix || 'mcp_live_'}••••••••••••••••`,
          createdDate: t.createdAt ? t.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
          expiry: t.expiresAt ? `Expires on ${t.expiresAt.split('T')[0]}` : 'No Expiry (Never)',
          expiryDate: t.expiresAt,
          status: 'Active',
          createdBy: user?.name || 'Seraj Khan',
          lastUsed: t.lastUsedAt ? t.lastUsedAt.split('T')[0] : 'Never used'
        }));
        setTokensList(formatted);
      }
    } catch (e) {
      console.warn('Backend API unreachable, using local token manager:', e);
    } finally {
      setIsLoading(false);
    }
  }, [authSessionToken, user]);

  useEffect(() => {
    fetchBackendTokens();
  }, [fetchBackendTokens]);

  const handleGenerateToken = async (e) => {
    e.preventDefault();
    if (!tokenName.trim()) return;

    setErrorMsg(null);
    let expiresInDays = null;
    if (expiryOption === '30') expiresInDays = 30;
    else if (expiryOption === '90') expiresInDays = 90;
    else if (expiryOption === '365') expiresInDays = 365;

    try {
      const res = await fetch(`${BACKEND_TOKENS_URL}/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authSessionToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tokenName,
          scopes: ['abm:read', 'abm:write', 'mcp:execute'],
          expiresInDays
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setNewlyCreatedRawToken(data.token);
        setTokenName('');
        fetchBackendTokens();
        return;
      }
    } catch (e) {
      console.warn('Backend generate token endpoint offline, executing local issue:', e);
    }

    // Local fallback if backend is offline
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const fallbackToken = `mcp_live_${randomHex}`;
    
    let expiryLabel = 'No Expiry (Never)';
    if (expiryOption === '30') expiryLabel = '30 Days';
    else if (expiryOption === '90') expiryLabel = '90 Days';
    else if (expiryOption === '365') expiryLabel = '1 Year';

    const localObj = {
      id: `tok-${Date.now()}`,
      name: tokenName,
      token: fallbackToken,
      createdDate: new Date().toISOString().split('T')[0],
      expiry: expiryLabel,
      status: 'Active',
      createdBy: user?.name || 'Seraj Khan',
      lastUsed: 'Just created'
    };

    setNewlyCreatedRawToken(fallbackToken);
    setTokensList([localObj, ...tokensList]);
    setTokenName('');
  };

  const handleDeleteToken = async (tokenId) => {
    try {
      const res = await fetch(`${BACKEND_TOKENS_URL}/${tokenId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authSessionToken}`
        }
      });
      if (res.ok) {
        fetchBackendTokens();
        return;
      }
    } catch (e) {
      console.warn('Backend delete token offline, removing locally:', e);
    }
    setTokensList(tokensList.filter(t => t.id !== tokenId));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedTokenId(id);
    setTimeout(() => setCopiedTokenId(null), 2000);
  };

  const currentActiveTokenStr = newlyCreatedRawToken || (tokensList[0] ? tokensList[0].token : 'mcp_live_sec_99382104ab82c9e81');

  // LLM Configurations code snippets
  const getLlmConfigCode = () => {
    if (activeLlmTab === 'claude') {
      return JSON.stringify({
        "mcpServers": {
          "abm-strategy": {
            "command": "node",
            "args": [
              "C:/Users/serajkhan_bamboobox/Downloads/abm-strategy-mcp-server/dist/index.js"
            ],
            "env": {
              "MCP_AUTH_TOKEN": currentActiveTokenStr,
              "COOKIE_B2TOKEN": "valid"
            }
          }
        }
      }, null, 2);
    } else if (activeLlmTab === 'cursor') {
      return JSON.stringify({
        "mcpServers": {
          "abm-strategy": {
            "url": "http://localhost:8080/mcp",
            "headers": {
              "Authorization": `Bearer ${currentActiveTokenStr}`,
              "Cookie": `b2Token=${currentActiveTokenStr}`
            }
          }
        }
      }, null, 2);
    } else {
      return `// Gemini / Custom Agent Setup
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const transport = new SSEClientTransport(
  new URL("http://localhost:8080/mcp/sse"),
  {
    requestInit: {
      headers: {
        "Authorization": "Bearer ${currentActiveTokenStr}",
        "Cookie": "b2Token=${currentActiveTokenStr}"
      }
    }
  }
);

const mcpClient = new Client({ name: "AbmDashboardApp", version: "1.0.0" });
await mcpClient.connect(transport);`;
    }
  };

  const copyConfigSnippet = () => {
    navigator.clipboard.writeText(getLlmConfigCode());
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0F172A] border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-medium mb-1">
            <Key className="h-4 w-4" /> MCP API Credentials & LLM Connect
          </div>
          <h2 className="text-xl font-bold text-white">
            MCP Access Tokens & LLM Configuration
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Generate secure tokens to connect the ABM Strategy MCP server to LLMs (Claude Desktop, Cursor, Gemini).
          </p>
        </div>
      </div>

      {/* Security alert for newly generated token */}
      {newlyCreatedRawToken && (
        <div className="p-5 rounded-2xl bg-cyan-950/60 border border-cyan-500/50 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span>Newly Generated MCP Token (Store this securely)</span>
            </div>
            <button
              onClick={() => setNewlyCreatedRawToken(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/80 font-mono text-xs text-cyan-300 border border-cyan-500/40">
            <span className="truncate">{newlyCreatedRawToken}</span>
            <button
              onClick={() => copyToClipboard(newlyCreatedRawToken, 'new-raw')}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold flex items-center gap-1 shrink-0 transition"
            >
              {copiedTokenId === 'new-raw' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedTokenId === 'new-raw' ? 'Copied Token' : 'Copy Token'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Grid: Token Generator & Active Tokens Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generate Token Form (1 col) */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-cyan-400" />
            Generate New Token
          </h3>

          <form onSubmit={handleGenerateToken} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Token Name / Client</label>
              <input
                type="text"
                required
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                placeholder="e.g. Claude Desktop MCP Token"
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Expiration Period</label>
              <select
                value={expiryOption}
                onChange={(e) => setExpiryOption(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="NEVER">No Expiry (Never Expire)</option>
                <option value="30">30 Days</option>
                <option value="90">90 Days</option>
                <option value="365">1 Year</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-glow-cyan transition"
            >
              Issue MCP Access Token
            </button>
          </form>
        </div>

        {/* Tokens List Table (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Key className="h-5 w-5 text-emerald-400" />
              Active Tokens Directory ({tokensList.length})
            </h3>

            {isLoading && (
              <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin" />
            )}
          </div>

          <div className="space-y-3">
            {tokensList.map((tok) => (
              <div key={tok.id} className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-200">{tok.name}</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      {tok.expiry}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                    <span>{tok.token}</span>
                    <button
                      onClick={() => copyToClipboard(tok.token, tok.id)}
                      className="p-1 text-slate-400 hover:text-cyan-300 transition"
                      title="Copy token reference"
                    >
                      {copiedTokenId === tok.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right text-[11px] text-slate-400">
                    <div>Created: {tok.createdDate}</div>
                    <div className="text-[10px] text-slate-500">Last used: {tok.lastUsed}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteToken(tok.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition"
                    title="Revoke token"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Connect MCP Server to LLM Integration Guide */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="h-5 w-5 text-cyan-400" />
              Connect MCP Server to LLM Client
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Copy configuration snippet to connect Claude Desktop, Cursor, or Gemini to this ABM MCP server.
            </p>
          </div>

          {/* LLM Client Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setActiveLlmTab('claude')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLlmTab === 'claude'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Claude Desktop
            </button>
            <button
              onClick={() => setActiveLlmTab('cursor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLlmTab === 'cursor'
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Cursor IDE
            </button>
            <button
              onClick={() => setActiveLlmTab('gemini')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLlmTab === 'gemini'
                  ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Gemini / Custom
            </button>
          </div>
        </div>

        {/* Code Snippet Viewer */}
        <div className="relative">
          <pre className="p-5 rounded-2xl bg-[#080C14] border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed shadow-inner">
            <code>{getLlmConfigCode()}</code>
          </pre>

          <button
            onClick={copyConfigSnippet}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5 border border-slate-700 transition"
          >
            {copiedSnippet ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Config!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-cyan-400" />
                <span>Copy JSON Config</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
