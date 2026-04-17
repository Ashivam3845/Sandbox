import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Scale, ChevronDown, ChevronUp } from 'lucide-react';
import './Pages.css';

export default function CaseHistoryPage() {
  const navigate = useNavigate();
  const { cases, setCases, setActiveAnalysis } = useOutletContext();
  const [filter, setFilter] = useState('all');
  const [sortAsc, setSortAsc] = useState(false);

  const handleToggleStatus = (e, caseId, currentStatus) => {
    e.stopPropagation();
    setCases(prev => prev.map(c => 
      c.id === caseId 
        ? { ...c, status: currentStatus === 'active' ? 'closed' : 'active' }
        : c
    ));
  };

  const handleDeleteCase = (e, caseId) => {
    e.stopPropagation();
    setCases(prev => prev.filter(c => c.id !== caseId));
  };

  const filtered = cases
    .filter(c => filter === 'all' || c.status === filter)
    .sort((a, b) => sortAsc ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Case History</h1>
        <p>Browse and revisit all previously analyzed matters.</p>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
        {['all', 'active', 'closed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 18px', border: '1px solid var(--border-light)', borderRadius: 4,
              background: filter === f ? 'var(--bg-dark)' : 'var(--bg-panel)',
              color: filter === f ? '#fff' : 'var(--text-muted)',
              fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, cursor: 'pointer'
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setSortAsc(v => !v)}
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid var(--border-light)', borderRadius: 4, background: 'var(--bg-panel)', fontFamily: 'var(--font-ui)', fontSize: 13, cursor: 'pointer' }}
        >
          Date {sortAsc ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(c => (
          <div key={c.id} className="page-card" style={{ display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer' }} onClick={() => {
            if (c.datasetContext) {
              setActiveAnalysis(c.datasetContext);
            }
            navigate('/');
          }}>
            <Scale size={20} style={{ flexShrink: 0, color: 'var(--text-muted)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.court} · {c.date}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <span className={`card-tag ${c.status === 'active' ? 'tag-active' : 'tag-closed'}`}>{c.status}</span>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Confidence: {c.confidence}%</div>
            </div>
            <div style={{ padding: '4px 10px', border: '1px solid var(--border-light)', borderRadius: 4, fontSize: 12, fontWeight: 600, flexShrink: 0, background: 'var(--bg-dark)', color: 'var(--text-inverse)' }}>
              {c.verdict}
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 16 }}>
              <button 
                onClick={(e) => handleToggleStatus(e, c.id, c.status)}
                style={{ padding: '6px 12px', fontSize: 13, background: 'var(--bg-panel)', border: '1px solid var(--border-light)', borderRadius: 6, color: 'var(--text-main)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 }}
                onMouseOver={(e) => { e.target.style.background = 'var(--bg-dark)'; e.target.style.color = 'var(--text-inverse)'; }}
                onMouseOut={(e) => { e.target.style.background = 'var(--bg-panel)'; e.target.style.color = 'var(--text-main)'; }}
              >
                {c.status === 'active' ? 'Close Case' : 'Reopen'}
              </button>
              <button 
                onClick={(e) => handleDeleteCase(e, c.id)}
                style={{ padding: '6px 12px', fontSize: 13, background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 6, color: '#ef4444', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500 }}
                onMouseOver={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.15)'; e.target.style.borderColor = '#ef4444'; }}
                onMouseOut={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.05)'; e.target.style.borderColor = 'rgba(239, 68, 68, 0.4)'; }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
