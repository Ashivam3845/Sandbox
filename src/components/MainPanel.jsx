import React, { useState } from 'react';
import { AlertCircle, ShieldCheck, Scale, FileText, ArrowLeft } from 'lucide-react';
import TrustScoreBadge from './TrustScoreBadge';
import AiChatInterface from './AiChatInterface';
import './MainPanel.css';

export default function MainPanel({ activeCase, onSelectCase, onClearCase }) {
  const [activeTab, setActiveTab] = useState('plaintiff');

  return (
    <div className="MainPanel">
      <AiChatInterface onSelectCase={onSelectCase} hidden={!!activeCase} />

      {activeCase && (
        <div className="deep-dive-view">
          <div className="panel-header">
            <div className="title-group">
              <button className="back-btn" onClick={onClearCase}>
                <ArrowLeft size={16} /> Back to AI Chat
              </button>
              <span className="case-jurisdiction">{activeCase.jurisdiction} • {activeCase.date}</span>
              <h1 className="case-title">{activeCase.title}</h1>
            </div>
            <div className="score-summary">
              <div className="score-explanation">
                <span className="score-label">Relevance & Trust Score</span>
                <span className="score-reason">{activeCase.matchReason}</span>
              </div>
              <TrustScoreBadge score={activeCase.score} reason={activeCase.matchReason} />
            </div>
          </div>

          <div className="panel-content">
            <section className="ratio-decidendi">
              <h3 className="section-heading">
                <FileText size={16} /> Ratio Decidendi
              </h3>
              <p className="serif-text">{activeCase.ratioDecidendi}</p>
            </section>

            <section className="perspective-tabs">
              <div className="tab-buttons">
                <button 
                  className={`tab-btn risk-tab ${activeTab === 'plaintiff' ? 'active' : ''}`}
                  onClick={() => setActiveTab('plaintiff')}
                >
                  <AlertCircle size={16} /> Infringement Risk (Plaintiff)
                </button>
                <button 
                  className={`tab-btn defense-tab ${activeTab === 'defense' ? 'active' : ''}`}
                  onClick={() => setActiveTab('defense')}
                >
                  <ShieldCheck size={16} /> Defense Strategy (Ours)
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'plaintiff' ? (
                  <div className="perspective-box risk-box">
                    <h4 className="box-title text-danger">Opposing Counsel's Likely Angle</h4>
                    <p className="serif-text">{activeCase.infringementRisk}</p>
                  </div>
                ) : (
                  <div className="perspective-box defense-box">
                    <h4 className="box-title text-safe">Our Mitigation & Counter-Arguments</h4>
                    <p className="serif-text">{activeCase.defenseStrategy}</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
