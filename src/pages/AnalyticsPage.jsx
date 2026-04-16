import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './Pages.css';

const barHeights = [40, 60, 35, 75, 90, 50, 65, 80, 45, 70, 85, 55];
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const outcomes = [
  { label: 'Cases Won', value: 24, change: '+12%', up: true },
  { label: 'Cases Settled', value: 11, change: '+4%', up: true },
  { label: 'Cases Lost', value: 3, change: '-2%', up: false },
  { label: 'Avg. Confidence Score', value: '81%', change: '+6%', up: true },
];

const topStrategies = [
  { name: 'Prior Art Invalidation', uses: 18, success: '89%' },
  { name: 'Claim Construction Narrowing', uses: 14, success: '78%' },
  { name: 'Force Majeure Defense', uses: 7, success: '57%' },
  { name: 'Jurisdictional Challenge', uses: 5, success: '60%' },
];

export default function AnalyticsPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Performance metrics and outcome trends across all your matters.</p>
      </div>

      {/* Stats Row */}
      <div className="analytics-row">
        {outcomes.map(o => (
          <div key={o.label} className="stat-card">
            <span className="stat-label">{o.label}</span>
            <span className="stat-value">{o.value}</span>
            <span className="stat-change" style={{ color: o.up ? 'var(--accent-green)' : 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: 4 }}>
              {o.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {o.change}
            </span>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="page-card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 4 }}>Monthly Case Activity</h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Number of new matters opened per month in 2024</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 8, alignItems: 'flex-end', height: 100 }}>
          {barHeights.map((h, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', height: `${h}%`, background: 'var(--bg-dark)', borderRadius: '2px 2px 0 0', opacity: 0.85 }} />
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{monthLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top strategies table */}
      <div className="page-card">
        <h3 style={{ marginBottom: 16 }}>Top Performing Strategies</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light)' }}>
              <th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: 11 }}>Strategy</th>
              <th style={{ textAlign: 'center', padding: '8px 0', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: 11 }}>Times Used</th>
              <th style={{ textAlign: 'right', padding: '8px 0', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', fontSize: 11 }}>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {topStrategies.map(s => (
              <tr key={s.name} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '14px 0', fontWeight: 600 }}>{s.name}</td>
                <td style={{ padding: '14px 0', textAlign: 'center', color: 'var(--text-muted)' }}>{s.uses}</td>
                <td style={{ padding: '14px 0', textAlign: 'right', color: 'var(--accent-green)', fontWeight: 600 }}>{s.success}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
