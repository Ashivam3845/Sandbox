import React, { useState } from 'react';
import { Eye, ChevronUp, ChevronDown, X, Scale, User, FileText, Landmark } from 'lucide-react';
import './ReferencePanel.css';

export default function ReferencePanel({ currentAnalysis }) {
  const [selectedCase, setSelectedCase] = useState(null);

  const [collapseMatched, setCollapseMatched] = useState(false);
  const [collapseLegal, setCollapseLegal] = useState(false);
  const [collapseVector, setCollapseVector] = useState(false);

  if (!currentAnalysis) return null;
  return (
    <div className="ReferencePanel">
      <div className="ref-header">
        <Eye size={18} />
        <h2>Why this suggestion?</h2>
      </div>

      <div className="ref-section">
        <div className="section-header-flex" style={{ cursor: 'pointer' }} onClick={() => setCollapseMatched(!collapseMatched)}>
          <h4 className="text-xs ref-section-title">MATCHED CASE REFERENCES</h4>
          {collapseMatched ? <ChevronDown size={16} className="text-muted" /> : <ChevronUp size={16} className="text-muted" />}
        </div>
        
        {!collapseMatched && currentAnalysis.references.map((ref, idx) => (
          <div key={idx} className="ref-card card-border">
            <div className="ref-card-header">
              <h5 className="ref-card-title">{ref.title}</h5>
              <span className="ref-year">{ref.year}</span>
            </div>
            <p className="ref-card-desc">{ref.desc}</p>
            <div className="ref-card-footer">
              <span className="match-percent">{ref.match} Match</span>
              <a href="#" className="ref-link" onClick={(e) => { e.preventDefault(); setSelectedCase(ref); }}>View Document</a>
            </div>
          </div>
        ))}
      </div>

      <div className="ref-section">
        <h4 className="text-xs ref-section-title">FACTS MATCH</h4>
        <ul className="facts-list">
          {currentAnalysis.facts.map((fact, idx) => (
            <li key={idx}>
              <div className="fact-title"><span className="dot bg-safe"></span> {fact.title}</div>
              <div className="fact-sub">{fact.match} similarity to precedents</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="ref-section">
        <div className="section-header-flex" style={{ cursor: 'pointer' }} onClick={() => setCollapseLegal(!collapseLegal)}>
          <h4 className="text-xs ref-section-title">LEGAL SECTIONS MATCH</h4>
          {collapseLegal ? <ChevronDown size={16} className="text-muted" /> : <ChevronUp size={16} className="text-muted" />}
        </div>
        
        {!collapseLegal && currentAnalysis.legal.map((sec, idx) => (
          <div key={idx} className="legal-card bg-blue-50 border-blue-100">
            <h5 className="legal-title text-blue-900">{sec.title}</h5>
            <p className="legal-desc text-blue-800">{sec.desc}</p>
          </div>
        ))}
      </div>

      <div className="ref-section">
        <div className="section-header-flex" style={{ cursor: 'pointer' }} onClick={() => setCollapseVector(!collapseVector)}>
            <h4 className="text-xs ref-section-title">VECTOR SEMANTIC GRAPH</h4>
            {collapseVector ? <ChevronDown size={16} className="text-muted" /> : <ChevronUp size={16} className="text-muted" />}
        </div>
        
        {!collapseVector && (
          <>
            <div className="vector-graph-container">
          <img src="/semantic_graph_mockup.png" alt="Vector Semantic Graph" className="vector-img" />
          <div className="vector-pill">Vector Semantic Graph Active</div>
        </div>
        
        <div className="analysis-depth mt-4">
          <h5 className="text-xs text-muted mb-2 font-semibold">ANALYSIS DEPTH</h5>
          <div className="depth-row">
            <span>Precedents Scanned</span>
            <span className="font-bold">{currentAnalysis.depth.scanned}</span>
          </div>
          <div className="depth-row">
            <span>Citations Verified</span>
            <span className="font-bold">{currentAnalysis.depth.verified}</span>
          </div>
          <div className="depth-row">
            <span>Jurisdictions Analyzed</span>
            <span className="font-bold">{currentAnalysis.depth.jurisdictions}</span>
          </div>
        </div>
          </>
        )}
      </div>

      {selectedCase && (
        <div className="case-modal-overlay">
          <div className="case-modal card-border">
            <div className="case-modal-header">
              <div className="flex items-center gap-2">
                <Landmark size={20} className="text-safe" />
                <h3 className="case-modal-title">{selectedCase.title}</h3>
                <span className="badge-dark">{selectedCase.year}</span>
              </div>
              <button className="icon-btn-gray" onClick={() => setSelectedCase(null)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="case-modal-body">
              <div className="case-overview mb-6">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase mb-2 text-muted">
                  <FileText size={14}/> Core Facts
                </h4>
                <p className="text-sm line-height-tall text-main">{selectedCase.caseDetails}</p>
              </div>

              <div className="case-split-arguments">
                <div className="argument-box bg-blue-50 border-blue-100 p-4 rounded">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-blue-900 mb-2">
                    <User size={14}/> Plaintiff Remarks
                  </h4>
                  <p className="text-sm text-blue-800 line-height-tall">{selectedCase.plaintiffRemarks}</p>
                </div>
                <div className="argument-box bg-gray-50 border-gray-100 p-4 rounded mt-4">
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-2">
                    <User size={14}/> Defendant Remarks
                  </h4>
                  <p className="text-sm text-gray-800 line-height-tall">{selectedCase.defendantRemarks}</p>
                </div>
              </div>

              <div className="verdict-box bg-safe-alpha border-safe-alpha p-4 rounded mt-6">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase text-safe-darker mb-2">
                  <Scale size={14}/> Final Verdict
                </h4>
                <p className="text-sm text-safe-darker font-medium line-height-tall">{selectedCase.finalVerdict}</p>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
