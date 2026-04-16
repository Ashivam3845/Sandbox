import React, { useState } from 'react';
import { Bookmark, Trash2, Copy, ArrowRight, ShieldCheck } from 'lucide-react';
import './Pages.css';
import './SavedStrategies.css';

const strategies = [
  { 
    id: 1, 
    title: 'Prior Art Invalidation via WiTricity Precedent', 
    tags: ['Patent Defense', 'Invalidation'], 
    summary: 'Leverage the WiTricity v. Momentum ruling to challenge patent eligibility under 35 U.S.C. § 101 for resonance-based charging claims.', 
    saved: 'Apr 3, 2024', 
    risk: 'Low',
    details: {
      synopsis: 'Construct an invalidation claim against the primary magnetic flux architecture leveraging prior wireless power transfer findings.',
      steps: [
        'Initialize IPR petition requesting Board review of Claim 7 based on obviousness over WiTricity variants.',
        'Produce geometric magnetic modeling from 2011 standard documentation comparing field boundaries.',
        'Discredit opposing expert testimony by validating mathematical variations as mere routine optimization.'
      ],
      precedents: ['WiTricity Corp. v. Momentum Dynamics (2020)', 'Alice Corp. v. CLS Bank (2014)'],
      probability: '82%'
    }
  },
  { 
    id: 2, 
    title: 'Force Majeure Defense — Regional Infrastructure', 
    tags: ['Contract', 'Breach'], 
    summary: 'Argue regulatory constraints on regional grid infrastructure as justifying force majeure protections under Clause 4.2 of the IP transfer agreement.', 
    saved: 'Mar 18, 2024', 
    risk: 'Medium',
    details: {
      synopsis: 'Utilize government infrastructure restriction logs to enact Force Majeure, overriding conventional delay liability terms.',
      steps: [
        'Secure Department of Energy regional load constraint logs validating physical impossibility of testing execution.',
        'Map Clause 4.2 definitions directly to these DOE regulatory emergency mandates.',
        'File motion to dismiss specific performance counterclaims relying on precedent excuse doctrine.'
      ],
      precedents: ['Facto v. Pantagis (NJ, 2007) describing objective impossibility.'],
      probability: '65%'
    }
  },
  { 
    id: 3, 
    title: 'Claim Construction Narrowing — Claim 7', 
    tags: ['Patent Defense', 'Claim Chart'], 
    summary: 'Distinguish shielding coil configuration via modified magnetic flux paths to argue structural uniqueness outside plaintiff\'s claim scope.', 
    saved: 'Jan 30, 2024', 
    risk: 'Low',
    details: {
      synopsis: 'Aggressively litigate Markman hearing definitions to constrict "shielding coil" semantic definitions.',
      steps: [
        'Submit intrinsic evidence focusing strictly on the plaintiff’s own specification diagrams limiting coil radii.',
        'Counter plaintiff\'s broad interpretation using extrinsic IEEE standard dictionaries defining shielding geometries.',
        'Force non-infringement summary judgment if construction is narrowed.'
      ],
      precedents: ['Phillips v. AWH Corp (2005) controlling extrinsic/intrinsic weighting.'],
      probability: '88%'
    }
  },
  { 
    id: 4, 
    title: 'Jurisdictional Challenge — Delaware Digital Signature', 
    tags: ['Jurisdiction', 'Contract'], 
    summary: 'Challenge validity of digital signature enforcement under Delaware Corp Law § 103 for multi-state non-compete agreements.', 
    saved: 'Nov 10, 2023', 
    risk: 'High',
    details: {
      synopsis: 'Invalidate restrictive covenants based on multi-state statutory conflicts overriding Delaware selection clauses.',
      steps: [
        'Analyze California BPC § 16600 statutory conflict with Delaware contract selections.',
        'Prove employee nexus resides explicitly outside Delaware to invalidate the digital signature formation venue.',
        'Filing injunction against out-of-state enforcement mechanisms tracking non-competes.'
      ],
      precedents: ['Ascension v. Barnes (DE, 2022) analyzing signature venuses.'],
      probability: '41%'
    }
  }
];

const riskColors = { Low: 'tag-active', Medium: 'tag-closed', High: 'tag-risk' };

export default function SavedStrategiesPage() {
  const [items, setItems] = useState(strategies);
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  return (
    <div className="page-wrapper relative">
      <div className="page-header">
        <h1>Saved Strategies</h1>
        <p>Your curated legal playbook, organized by case type and risk level.</p>
      </div>

      <div className="strategy-grid">
        {items.map(s => (
          <div key={s.id} className="strategy-card-premium">
            <div className="strategy-card-header">
              <div className="strategy-badge-icon">
                <ShieldCheck size={20} />
              </div>
              <div className="strategy-actions">
                <button className="strategy-action-btn" onClick={() => navigator.clipboard?.writeText(s.title)} title="Copy Strategy Title">
                  <Copy size={14} />
                </button>
                <button className="strategy-action-btn delete" onClick={() => setItems(prev => prev.filter(x => x.id !== s.id))} title="Delete Strategy">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div className="strategy-card-body">
              <div className="strategy-tags">
                {s.tags.map(t => <span key={t} className="st-tag st-tag-category">{t}</span>)}
                <span className={`st-tag st-tag-risk-${s.risk}`}>RISK: {s.risk.toUpperCase()}</span>
              </div>
              <h3 className="strategy-title">{s.title}</h3>
              <p className="strategy-summary">{s.summary}</p>
            </div>

            <div className="strategy-card-footer">
              <span className="strategy-date">Saved {s.saved}</span>
              <button 
                className="btn-premium-action"
                onClick={() => setSelectedStrategy(s)}
              >
                Examine <ArrowRight size={14}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedStrategy && (
        <div className="case-modal-overlay fade-in" onClick={() => setSelectedStrategy(null)}>
          <div className="strategy-dossier-modal" onClick={e => e.stopPropagation()}>
            {/* Rich Header Matrix */}
            <div className="strategy-dossier-header">
              <button className="btn-dossier-close" onClick={() => setSelectedStrategy(null)}>✕</button>
              <div className="strategy-dossier-subtitle">
                 <ShieldCheck size={16} /> JUDION STRATEGY DOSSIER
              </div>
              <h2 className="strategy-dossier-title">{selectedStrategy.title}</h2>
            </div>
            
            <div className="strategy-dossier-body">
              {/* Core Synopsis Block */}
              <div>
                <h4 className="text-xs mb-3 font-bold" style={{color: 'var(--judion-slate)', letterSpacing: '1px'}}>EXECUTIVE SYNOPSIS</h4>
                <div style={{ background: 'var(--bg-app)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--judion-gold)', fontSize: '15px', lineHeight: 1.7 }}>
                  {selectedStrategy.details.synopsis}
                </div>
              </div>

              {/* Execution Steps */}
              <div>
                <h4 className="text-xs mb-3 font-bold" style={{color: 'var(--judion-brown)', letterSpacing: '1px'}}>TACTICAL EXECUTION PATHWAY</h4>
                <div className="dossier-step-grid">
                  {selectedStrategy.details.steps.map((step, idx) => (
                    <div key={idx} className="dossier-step-row">
                       <div className="dossier-step-number">{idx + 1}</div>
                       <div className="dossier-step-content">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics Floor */}
              <div className="flex gap-6 mt-2">
                 <div className="dossier-metric-panel">
                    <div className="metric-panel-glow"></div>
                    <h4 className="text-xs mb-4 font-bold" style={{color: 'var(--judion-slate)'}}>SUPPORTING PRECEDENTS</h4>
                    <ul className="flex flex-col gap-3" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                      {selectedStrategy.details.precedents.map((prec, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-main">
                           <div style={{marginTop: '6px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--judion-gold)', flexShrink: 0}}></div>
                           <span>{prec}</span>
                        </li>
                      ))}
                    </ul>
                 </div>

                 <div className="dossier-metric-panel flex flex-col items-center justify-center text-center" style={{flex: '0 0 250px', border: '1px solid var(--judion-gold)'}}>
                    <div className="metric-panel-glow" style={{background: 'var(--judion-brown)', opacity: 0.2}}></div>
                    <h4 className="text-xs mb-2 font-bold" style={{color: 'var(--judion-brown)'}}>COMPUTED SUCCESS PROBABILITY</h4>
                    <span style={{fontSize: '48px', fontFamily: 'var(--font-header)', fontWeight: 'bold', color: 'var(--judion-slate)', lineHeight: 1}}>
                       {selectedStrategy.details.probability}
                    </span>
                    <span className="text-xs text-muted mt-3 uppercase tracking-widest">Confidence Interval</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
