import React from 'react';
import './TrustScoreBadge.css';

export default function TrustScoreBadge({ score, reason }) {
  // Calculate SVG stroke dasharray properties
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = 'high-score';
  if (score < 75 && score >= 50) colorClass = 'med-score';
  if (score < 50) colorClass = 'low-score';

  return (
    <div className="TrustScoreBadge" title={reason}>
      <div className="progress-ring-container">
        <svg className="progress-ring" width="44" height="44">
          <circle
            className="progress-ring__bg"
            stroke="#dfe1e6"
            strokeWidth="4"
            fill="transparent"
            r={radius}
            cx="22"
            cy="22"
          />
          <circle
            className={`progress-ring__circle ${colorClass}`}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="22"
            cy="22"
          />
        </svg>
        <div className="score-text">{score}%</div>
      </div>
      {/* Optional: we might show reason in a tooltip using title attribute, or custom tooltip UI */}
    </div>
  );
}
