import React from 'react';
import TrustScoreBadge from './TrustScoreBadge';
import './CaseCard.css';

export default function CaseCard({ data, isActive, onClick }) {
  // Determine verdict tag class
  const isInfringement = data.verdict.toLowerCase().includes('infringement found');
  const isInvalidated = data.verdict.toLowerCase().includes('invalidated');
  
  let verdictClass = 'verdict-neutral';
  if (isInfringement) verdictClass = 'verdict-danger';
  if (isInvalidated) verdictClass = 'verdict-safe';

  return (
    <div className={`CaseCard ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className="card-header">
        <div className="card-title">{data.title}</div>
      </div>
      <div className="card-meta">
        <span className="card-date">{data.date}</span>
        <span className="card-jurisdiction">{data.jurisdiction}</span>
      </div>
      <div className="card-footer">
        <div className={`verdict-tag ${verdictClass}`}>
          {data.verdict}
        </div>
        <TrustScoreBadge score={data.score} reason={data.matchReason} />
      </div>
    </div>
  );
}
