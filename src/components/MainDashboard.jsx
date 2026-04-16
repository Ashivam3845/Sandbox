import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Upload, MapPin, Calendar, Gavel, CheckCircle2, AlertTriangle, TrendingUp, Cpu, Flame, FileText, Globe, Briefcase, Mail, Copy, X } from 'lucide-react';
import { breachDataset, patentDataset } from '../data/mockAnalysisData';
import './MainDashboard.css';

export default function MainDashboard({ currentAnalysis, setCurrentAnalysis }) {
  const [viewMode, setViewMode] = useState('plaintiff');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [assessmentText, setAssessmentText] = useState("TechVenture LLC v. InnovateSoft Corp - Breach of Software Development Agreement dated March 15, 2024. Failure to deliver AI-powered customer analytics platform within 6-month timeline, resulting in $2.3M in lost revenue.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const mockShareUrl = "https://sovereigncounsel.com/analysis/abc-123";

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      if (assessmentText.toLowerCase().includes('patent') || assessmentText.toLowerCase().includes('infringement')) {
        setCurrentAnalysis(patentDataset);
      } else {
        setCurrentAnalysis(breachDataset);
      }
      setIsAnalyzing(false);
      setViewMode('plaintiff');
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockShareUrl);
    alert('Link copied to clipboard!');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(mockShareUrl)}&text=Check+out+this+legal+analysis`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(mockShareUrl)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=Legal%20Analysis&body=Check%20out%20this%20case%20analysis:%20${encodeURIComponent(mockShareUrl)}`;
  };
  return (
    <div className="MainDashboard">
      <header className="dash-header">
        <nav className="dash-nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>Analytics</NavLink>
          <NavLink to="/research" className={({ isActive }) => isActive ? 'active' : ''}>Research</NavLink>
        </nav>
        <div className="dash-actions no-print">
          <button className="btn-text" onClick={() => window.print()}>Export</button>
          <button className="btn-dark" onClick={() => setIsShareModalOpen(true)}>Share Analysis</button>
        </div>
      </header>

      <div className="dash-content">
        
        {/* Initial Assessment */}
        <div className="initial-assessment card-border">
          <h2 className="section-title">Initial Assessment</h2>
          <div className="assessment-box">
            <textarea 
              className="assessment-input" 
              placeholder="Describe your case or upload case details... (Hint: Include the word 'patent' for alternate dataset)"
              value={assessmentText}
              onChange={(e) => setAssessmentText(e.target.value)}
            ></textarea>
            <div className="assessment-actions">
              <button className="icon-btn-gray"><FileText size={18} /></button>
              <button className="btn-dark" onClick={handleAnalyze} disabled={isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : 'Analyze Case'}
              </button>
            </div>
          </div>
        </div>

        {/* Gradient Banner */}
        <div className="case-banner">
          <div className="case-banner-top">
            <h2 className="case-banner-title">{currentAnalysis.banner.title}</h2>
            <div className="active-analysis-pill">
              <span className="pill-line">ACTIVE</span>
              <span className="pill-line">ANALYSIS</span>
            </div>
          </div>
          <div className="case-banner-meta">
            <span className="meta-item"><MapPin size={16}/> {currentAnalysis.banner.location}</span>
            <span className="meta-item"><Calendar size={16}/> Filed: {currentAnalysis.banner.date}</span>
            <span className="meta-item"><Gavel size={16}/> {currentAnalysis.banner.type}</span>
          </div>
        </div>

        {/* View Tabs & Main Stats row */}
        <div className="view-stats-row">
          <div className="view-tabs-pill">
            <button className={`tab ${viewMode === 'plaintiff' ? 'active' : ''}`} onClick={() => setViewMode('plaintiff')}>Plaintiff View</button>
            <button className={`tab ${viewMode === 'defendant' ? 'active' : ''}`} onClick={() => setViewMode('defendant')}>Defendant View</button>
            <button className={`tab ${viewMode === 'neutral' ? 'active' : ''}`} onClick={() => setViewMode('neutral')}>Neutral Analysis</button>
          </div>
          <div className="main-stats">
            <div className="stat-block text-center mr-6">
              <div className="stat-val">{currentAnalysis.stats.strength}</div>
              <div className="stat-lbl">CASE STRENGTH</div>
            </div>
            <div className="stat-block text-center">
              <div className="stat-val text-danger">{currentAnalysis.stats.risk}</div>
              <div className="stat-lbl text-danger">RISK LEVEL</div>
            </div>
          </div>
        </div>

        {/* Chat / Prompts */}
        <div className="chat-prompt card-dark">
          <p className="text-sm">
            {isAnalyzing ? 'Thinking...' : `Analyze the ${currentAnalysis.banner.type.toLowerCase()} case: ${currentAnalysis.banner.title} regarding the details provided. The dispute involves ${currentAnalysis.stats.summary.split('. ')[0]}.`}
          </p>
          <span className="chat-time mt-3">10:32 AM</span>
        </div>

        <div className="chat-response card-border">
          <div className="response-header">
            <div className="response-title">
              <Cpu size={16}/> 
              <span className="text-xs uppercase">
                {viewMode} ANALYSIS
              </span>
            </div>
            <span className="chat-time text-muted">10:33 AM</span>
          </div>
          <div className="response-body text-sm mt-3">
            {isAnalyzing ? (
              <div className="flex items-center gap-2">
                 <span className="dot"></span>
                 <span className="text-muted">Extracting legal intelligence...</span>
              </div>
            ) : (
              currentAnalysis.views[viewMode]
            )}
          </div>
        </div>

        <div className="summary-metrics-row mt-6">
          <div className="case-summary card-border">
            <div className="card-header-flex">
              <h3 className="card-title text-base">Case Summary</h3>
              <span className="badge-verified">VERIFIED CITE</span>
            </div>
            <p className="text-sm text-muted mt-3 line-height-tall">
              {currentAnalysis.stats.summary}
            </p>
          </div>
          
          <div className="key-metrics-premium card-border">
            <h3 className="card-title text-base mb-4">Key Metrics</h3>
            <div className="premium-metrics-grid">
              
              <div className="metric-cell">
                <div className="metric-icon-wrap bg-safe-alpha">
                  <TrendingUp size={20} className="text-safe" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">AI CONFIDENCE</span>
                  <span className="metric-value">{currentAnalysis.stats.confidence}</span>
                </div>
              </div>

              <div className="metric-cell">
                <div className="metric-icon-wrap bg-danger-alpha">
                  <AlertTriangle size={20} className="text-danger" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">LEGAL RISK</span>
                  <span className="metric-value text-danger">{currentAnalysis.stats.risk}</span>
                </div>
              </div>

              <div className="metric-cell">
                <div className="metric-icon-wrap bg-neutral-alpha">
                  <CheckCircle2 size={20} className="text-muted" />
                </div>
                <div className="metric-info">
                  <span className="metric-label">SETTLEMENT RANGE</span>
                  <span className="metric-value">{currentAnalysis.stats.range}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Strategy Simulator */}
        <div className="strategy-simulator-expanded card-border mt-6">
          <div className="card-header-flex">
            <div>
              <h3 className="card-title mb-1 text-base">Case Strategy Simulator</h3>
              <p className="text-sm text-muted">Test arguments against 2.3M+ precedents</p>
            </div>
            <span className="badge-dark">LIVE SIMULATION</span>
          </div>

          <div className="quick-simulations mt-4">
            <h4 className="text-xs mb-3">QUICK SIMULATIONS</h4>
            <div className="pills-row">
              <button className="sim-pill">Argue force majeure defense based on the July 2024...</button>
              <button className="sim-pill">Emphasize the material changes to specifications a...</button>
              <button className="sim-pill">Calculate damages using expectation vs. reliance i...</button>
            </div>
          </div>

          <div className="simulation-engine mt-4 p-4 rounded bg-gray-50 border border-gray-100">
            <div className="engine-header flex items-center gap-2 mb-2">
              <Flame size={18} className="text-safe"/> <span className="text-xs font-semibold">SIMULATION ENGINE</span>
            </div>
            <div className="engine-body text-sm text-gray-800">
              <p>Welcome to the Case Strategy Simulator. Test different legal arguments and strategies to forecast potential outcomes. I'll analyze each argument against our proprietary database of 2.3M+ case precedents and provide probabilistic outcomes.</p>
              <br/>
              <p>Current Case: TechVenture LLC v. InnovateSoft Corp</p>
              <p>Jurisdiction: Delaware Court of Chancery</p>
              <p>Claim Type: Breach of Contract</p>
            </div>
            <p className="chat-time mt-3 text-xs text-muted">10:36 AM</p>
          </div>

          <div className="simulator-input-area mt-4">
            <input type="text" className="w-full" placeholder="e.g., Argue substantial performance doctrine under UCC § 2-508..." />
            <button className="btn-dark"><Cpu size={16} /> Simulate</button>
          </div>
        </div>

        <div className="disclaimer mt-8 mb-100 no-print">
          AI suggestions are assistive. Final decisions remain with the user. Sovereign Counsel does not provide formal legal advice.
        </div>
      </div>

      {isShareModalOpen && (
        <div className="share-modal-overlay">
          <div className="share-modal card-border">
            <div className="share-modal-header">
              <h3>Share Analysis</h3>
              <button className="icon-btn-gray" onClick={() => setIsShareModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
            
            <p className="text-sm text-muted mt-2 mb-4">Anyone with this link will be able to view the case summary and AI strategy simulations.</p>
            
            <div className="share-url-container">
              <input type="text" readOnly className="share-url-input" value={mockShareUrl} />
              <button className="btn-dark share-copy-btn" onClick={handleCopyLink}>
                <Copy size={16} /> Copy Link
              </button>
            </div>

            <div className="social-divider">
              <span className="text-xs text-muted">OR SHARE VIA</span>
            </div>

            <div className="social-buttons">
              <button className="social-btn" onClick={shareOnTwitter} title="Share on Twitter/X">
                <Globe size={20} />
              </button>
              <button className="social-btn" onClick={shareOnLinkedIn} title="Share on LinkedIn">
                <Briefcase size={20} />
              </button>
              <button className="social-btn" onClick={shareViaEmail} title="Share via Email">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
