import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, ChevronDown, ChevronUp } from 'lucide-react';
import './Pages.css';

const mockCases = [
  { id: 1, title: 'Apple Inc. v. Samsung Electronics Co.', court: 'N.D. California', date: 'Dec 14, 2012', verdict: 'Infringement Found', status: 'active', confidence: 85 },
  { id: 2, title: 'WiTricity Corp. v. Momentum Dynamics', court: 'D. Delaware', date: 'Apr 03, 2019', verdict: 'Patent Invalidated', status: 'closed', confidence: 72 },
  { id: 3, title: 'Energous Corp. v. Powercast Corp.', court: 'W.D. Texas', date: 'Aug 21, 2021', verdict: 'No Infringement', status: 'closed', confidence: 64 },
  { id: 4, title: 'TechCorp v. InnovateCo — Wireless Patent', court: 'D. Delaware', date: 'Jan 08, 2024', verdict: 'Pending', status: 'active', confidence: 90 },
  { id: 5, title: 'Spectrum Labs v. DynaTech International', court: 'Federal Circuit', date: 'Mar 15, 2023', verdict: 'Appeal Filed', status: 'active', confidence: 77 },
];

export default function CaseHistoryPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = mockCases
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
          <div key={c.id} className="page-card" style={{ display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Scale size={20} style={{ flexShrink: 0, color: 'var(--text-muted)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.court} · {c.date}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <span className={`card-tag ${c.status === 'active' ? 'tag-active' : 'tag-closed'}`}>{c.status}</span>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Confidence: {c.confidence}%</div>
            </div>
            <div style={{ padding: '4px 10px', border: '1px solid var(--border-light)', borderRadius: 4, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
              {c.verdict}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
