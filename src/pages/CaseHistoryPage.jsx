import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Scale, ChevronDown, ChevronUp, CheckCircle2, ArrowUpRight, Trash2, RefreshCw } from 'lucide-react';
import './Pages.css';

const statusColors = {
  active: { bg: 'rgba(71,89,103,0.1)', color: 'var(--judion-slate)', label: 'Active' },
  closed: { bg: 'rgba(128,117,113,0.1)', color: 'var(--text-muted)', label: 'Closed' },
};

export default function CaseHistoryPage() {
  const navigate = useNavigate();
  const { cases, setCases, activeAnalysis, setActiveAnalysis } = useOutletContext();
  const [filter, setFilter] = useState('all');
  const [sortAsc, setSortAsc] = useState(false);

  const handleToggleStatus = (e, caseId, currentStatus) => {
    e.stopPropagation();
    setCases(prev => prev.map(c =>
      c.id === caseId ? { ...c, status: currentStatus === 'active' ? 'closed' : 'active' } : c
    ));
  };

  const handleDeleteCase = (e, caseId) => {
    e.stopPropagation();
    setCases(prev => prev.filter(c => c.id !== caseId));
  };

  const handleSetActive = (e, c) => {
    e.stopPropagation();
    if (c.datasetContext) {
      setActiveAnalysis(c.datasetContext);
    }
  };

  const handleOpenInDashboard = (c) => {
    if (c.datasetContext) setActiveAnalysis(c.datasetContext);
    navigate('/');
  };

  const filtered = cases
    .filter(c => filter === 'all' || c.status === filter)
    .sort((a, b) => sortAsc ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="page-header">
        <h1>Case History</h1>
        <p>Browse, revisit, and set the active case shown on your dashboard.</p>
      </div>

      {/* Active case indicator */}
      {activeAnalysis && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px',
          background: 'linear-gradient(90deg, rgba(207,178,134,0.1), rgba(71,89,103,0.06))',
          border: '1px solid rgba(207,178,134,0.3)', borderRadius: 10, marginBottom: 20
        }}>
          <CheckCircle2 size={15} style={{ color: 'var(--judion-gold)', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Dashboard Active:</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>{activeAnalysis.banner.title}</span>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        {['all', 'active', 'closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '8px 18px',
            border: `1.5px solid ${filter === f ? 'var(--judion-brown)' : 'var(--border-light)'}`,
            borderRadius: 8,
            background: filter === f ? 'var(--judion-brown)' : 'var(--bg-panel)',
            color: filter === f ? 'var(--judion-gold)' : 'var(--text-muted)',
            fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 12,
            cursor: 'pointer', transition: 'var(--transition-fast)',
            textTransform: 'uppercase', letterSpacing: '0.4px'
          }}>
            {f === 'all' ? `All (${cases.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${cases.filter(c => c.status === f).length})`}
          </button>
        ))}
        <button onClick={() => setSortAsc(v => !v)} style={{
          marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', border: '1.5px solid var(--border-light)', borderRadius: 8,
          background: 'var(--bg-panel)', fontFamily: 'var(--font-ui)', fontSize: 12,
          fontWeight: 600, cursor: 'pointer', color: 'var(--text-muted)'
        }}>
          Date {sortAsc ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Case list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)', fontSize: 14 }}>
            No cases found in this category.
          </div>
        )}
        {filtered.map(c => {
          const isCurrentActive = activeAnalysis?.id === c.id || activeAnalysis?.id === c.datasetContext?.id;
          return (
            <div
              key={c.id}
              className="case-history-row animate-fade-in"
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 22px',
                background: isCurrentActive
                  ? 'linear-gradient(90deg, rgba(207,178,134,0.08), var(--bg-panel))'
                  : 'var(--bg-panel)',
                border: `1px solid ${isCurrentActive ? 'rgba(207,178,134,0.35)' : 'var(--border-light)'}`,
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                boxShadow: isCurrentActive ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => handleOpenInDashboard(c)}
            >
              {/* Active gold bar */}
              {isCurrentActive && (
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: 3, background: 'var(--judion-gold)', borderRadius: '12px 0 0 12px'
                }} />
              )}

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: isCurrentActive ? 'rgba(207,178,134,0.15)' : 'var(--bg-app)',
                border: `1px solid ${isCurrentActive ? 'rgba(207,178,134,0.3)' : 'var(--border-light)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Scale size={18} style={{ color: isCurrentActive ? 'var(--judion-gold)' : 'var(--text-muted)' }} />
              </div>

              {/* Title + court */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</span>
                  {isCurrentActive && (
                    <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--judion-brown)', background: 'rgba(207,178,134,0.15)', padding: '2px 7px', borderRadius: 20, flexShrink: 0 }}>
                      Active
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.court} · {c.date}</div>
              </div>

              {/* Confidence bar */}
              <div style={{ flexShrink: 0, width: 80, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Confidence</div>
                <div style={{ background: 'var(--bg-app)', borderRadius: 4, height: 5, overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                  <div style={{ height: '100%', width: `${c.confidence}%`, background: 'linear-gradient(90deg, var(--judion-brown), var(--judion-gold))', borderRadius: 4, transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-main)' }}>{c.confidence}%</div>
              </div>

              {/* Status badge */}
              <div style={{ flexShrink: 0 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                  background: statusColors[c.status]?.bg || '#f3f4f6',
                  color: statusColors[c.status]?.color || 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.5px'
                }}>
                  {c.status}
                </span>
              </div>

              {/* Verdict pill */}
              <div style={{
                flexShrink: 0, padding: '5px 12px',
                background: 'var(--bg-dark)', color: 'var(--judion-gold)',
                borderRadius: 8, fontSize: 12, fontWeight: 700
              }}>
                {c.verdict}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                {/* Set as Active Dashboard Case */}
                {!isCurrentActive && c.datasetContext && (
                  <button
                    title="Set as Active Dashboard Case"
                    onClick={(e) => handleSetActive(e, c)}
                    style={{
                      padding: '7px 13px', fontSize: 12, fontWeight: 700,
                      background: 'var(--judion-brown)', color: 'var(--judion-gold)',
                      border: 'none', borderRadius: 8, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 5,
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <CheckCircle2 size={13} /> Set Active
                  </button>
                )}
                {/* Open in Dashboard */}
                <button
                  title="Open in Dashboard"
                  onClick={(e) => { e.stopPropagation(); handleOpenInDashboard(c); }}
                  style={{
                    padding: '7px 11px', fontSize: 12, background: 'var(--bg-app)',
                    border: '1.5px solid var(--border-light)', borderRadius: 8,
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <ArrowUpRight size={13} /> Dashboard
                </button>
                {/* Toggle Status */}
                <button
                  title={c.status === 'active' ? 'Close Case' : 'Reopen Case'}
                  onClick={(e) => handleToggleStatus(e, c.id, c.status)}
                  style={{
                    padding: '7px 11px', fontSize: 12, background: 'var(--bg-app)',
                    border: '1.5px solid var(--border-light)', borderRadius: 8,
                    color: 'var(--text-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <RefreshCw size={13} /> {c.status === 'active' ? 'Close' : 'Reopen'}
                </button>
                {/* Delete */}
                <button
                  title="Delete Case"
                  onClick={(e) => handleDeleteCase(e, c.id)}
                  style={{
                    padding: '7px 11px', fontSize: 12,
                    background: 'rgba(192,57,43,0.05)', border: '1.5px solid rgba(192,57,43,0.25)',
                    borderRadius: 8, color: 'var(--accent-red)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 4,
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
