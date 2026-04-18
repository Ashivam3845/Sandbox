import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Send, Bot, BarChart2, ShieldCheck, Zap, Paperclip, FileText, X, CheckCircle, Scale } from 'lucide-react';
import './Pages.css';
import './ChatIntake.css';

const MOCK_ASSESSMENT_RESPONSE = {
  jurisdiction: "Pending Match",
  domain: "Pending Scope",
  probability: "73%",
  recommendedAction: "Immediate Claim Construction Invalidity Matrix",
  summary: "Initial analysis indicates significant overlapping elements with previously executed matters. Prior art references could serve as strong invalidation parameters if structured via a Markman defense early in discovery."
};

const VALID_DOMAINS = [
  "Patent Infringement",
  "Patent Validation",
  "Patent Licensing",
  "Patent Interference",
  "M&A Antitrust",
  "Employment Law"
];

const DOMAIN_CHIPS = ["Patent Infringement", "Patent Validation", "Patent Interference", "M&A Antitrust"];

const PHASE_STEPS = [
  { key: "awaiting_title",   label: "Case Title" },
  { key: "awaiting_domain",  label: "Domain" },
  { key: "awaiting_summary", label: "Summary" },
  { key: "computing",        label: "Analysis" },
  { key: "complete",         label: "Complete" },
];

function getPhaseIndex(phase) {
  const map = {
    awaiting_title: 0,
    awaiting_domain: 1,
    awaiting_summary: 2,
    computing: 3,
    complete: 4,
    strategy_computing: 4,
    strategy_complete: 4,
  };
  return map[phase] ?? 0;
}

export default function NewCasePage() {
  const navigate = useNavigate();
  const { setCases, setActiveAnalysis, setStrategies } = useOutletContext();

  const [messages, setMessages] = useState([
    { role: 'ai', type: 'text', content: "Welcome to Judion Co-Pilot Initial Assessment. I am prepared to begin constructing your legal thesis. To initialize the matrices, please provide a working Case Title for this matter." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [phase, setPhase] = useState("awaiting_title");
  const [isTyping, setIsTyping] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const [caseTitle, setCaseTitle] = useState("");
  const [caseDomain, setCaseDomain] = useState("");
  const [caseSummary, setCaseSummary] = useState("");

  const endOfChatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, phase]);

  const handleSendDomainChip = (chipText) => {
    const userMsg = { role: 'user', type: 'text', content: chipText, attachmentObj: null };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      progressConversation(chipText);
    }, 1500);
  };

  const handleSend = () => {
    if ((!inputValue.trim() && !attachment) || isTyping) return;

    const userTxt = inputValue.trim();
    const userMsg = {
      role: 'user',
      type: 'text',
      content: userTxt || "Attached Document",
      attachmentObj: attachment ? attachment.name : null
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setAttachment(null);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      progressConversation(userTxt || "Attached Document");
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const progressConversation = (lastInput) => {
    if (phase === "awaiting_title") {
      setCaseTitle(lastInput);
      setMessages(prev => [...prev, {
        role: 'ai', type: 'text',
        content: `Title sequence locked. What primary jurisdictional domain does this dispute primarily fall under? Please select or enter one of our verified matrix parameters (e.g., ${VALID_DOMAINS.join(', ')}).`
      }]);
      setPhase("awaiting_domain");
    }
    else if (phase === "awaiting_domain") {
      const match = VALID_DOMAINS.find(d => d.toLowerCase() === lastInput.trim().toLowerCase());
      if (match) {
        setCaseDomain(match);
        setMessages(prev => [...prev, {
          role: 'ai', type: 'text',
          content: "Domain parameters confirmed. Finally, please provide a brief summary of the exact legal complaint, known facts, or critical prior constraints."
        }]);
        setPhase("awaiting_summary");
      } else {
        setMessages(prev => [...prev, {
          role: 'ai', type: 'text',
          content: `Unrecognized domain parameter. The Matrix heavily prioritizes intellectual property. Please select or enter EXACTLY one of the following:\n${VALID_DOMAINS.join(", ")}`
        }]);
      }
    }
    else if (phase === "awaiting_summary") {
      setCaseSummary(lastInput);
      setMessages(prev => [...prev, {
        role: 'ai', type: 'text',
        content: "Processing context structure against Sovereign datasets. Please wait..."
      }]);
      setPhase("computing");
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'ai', type: 'assessment', content: "Assessment generation absolute." }]);
        setPhase("complete");
      }, 3000);
    }
  };

  const handleFinalize = () => {
    const idStr = `c-${Date.now()}`;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const generatedStrategy = {
      id: idStr + '-strat',
      title: `AI Extracted: ${caseTitle || 'Tactical Pathway'}`,
      tags: [caseDomain || 'General', 'Automated Strategy'],
      summary: `Aggressive pursuit algorithm mapping ${caseSummary.slice(0, 40)}...`,
      saved: dateStr,
      risk: 'High',
      details: {
        synopsis: `Based on your constraint mapping, executing an overwhelming discovery timeline forces an asymmetric burden on opposing counsel regarding ${caseDomain}.`,
        steps: [
          'Simulate preemptive depositions utilizing AI-generated interrogatories.',
          'File early protective orders regarding sensitive constraints.',
          'Establish a defensive parameter restricting outside counsel data lakes.'
        ],
        precedents: ['Algorithmic Synthetic Precedent 1', 'Sovereign Case Model Beta'],
        probability: MOCK_ASSESSMENT_RESPONSE.probability
      }
    };

    const synthesizedDataset = {
      id: idStr,
      banner: {
        title: caseTitle || 'Untitled Action',
        location: 'Pending Assignment',
        date: dateStr,
        type: caseDomain || 'General Litigation'
      },
      stats: {
        strength: '81%',
        risk: 'High',
        confidence: MOCK_ASSESSMENT_RESPONSE.probability,
        range: '$1.0M - $3.5M',
        summary: caseSummary || 'Pending structural intake parameters.'
      },
      views: {
        plaintiff: (
          <>
            <p>Based on our proprietary Judion mapping algorithm, we have parsed your initial constraints:</p>
            <blockquote style={{ borderLeft: '3px solid var(--judion-gold)', padding: '10px 16px', background: 'rgba(255,255,255,0.02)', marginTop: 12 }}><i>"{caseSummary}"</i></blockquote>
            <p className="mt-4">Applying these constraints against the <strong>{caseDomain}</strong> matrix, we flag a highly asymmetrical risk vector favoring aggressive discovery.</p>
          </>
        ),
        defendant: (<p>Insufficient adversarial data. We require opposing counsel depositions or initial interrogatory returns to compute a defense matrix.</p>),
        neutral: (<p>Algorithmic probability leans towards active discovery. Settlement feasibility ranges dynamically pending initial motion hearings.</p>)
      },
      references: [
        { title: 'Dynamic Precedent Mapping', year: '2024', match: '99%', desc: 'Algorithmic synthetic precedent matched to your intake variables.', caseDetails: 'N/A', plaintiffRemarks: 'N/A', defendantRemarks: 'N/A', finalVerdict: 'Pending' }
      ],
      facts: [{ title: 'Intake Parameter Verified', match: '99%' }],
      legal: [{ title: 'Judion AI General Rule 1.1', desc: 'Proprietary algorithmic rule binding.' }],
      depth: { scanned: '8,401', verified: '1', jurisdictions: '1' },
      activeStrategy: generatedStrategy
    };

    setStrategies(prev => [generatedStrategy, ...prev]);
    setCases(prev => [{
      id: idStr,
      title: caseTitle || 'Untitled Action',
      court: 'Judion AI Matrix',
      date: dateStr,
      verdict: 'Pending',
      status: 'active',
      confidence: 81,
      datasetContext: synthesizedDataset
    }, ...prev]);
    setActiveAnalysis(synthesizedDataset);
    navigate('/');
  };

  const isLocked = ["complete", "computing", "strategy_computing", "strategy_complete"].includes(phase);
  const phaseIdx = getPhaseIndex(phase);

  return (
    <div className="page-wrapper animate-fade-in" style={{ paddingTop: 32, paddingBottom: 0, height: '100vh', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page Header */}
      <div style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <Scale size={20} style={{ color: 'var(--judion-gold)' }} />
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 22, letterSpacing: '0.4px', color: 'var(--text-main)' }}>
            Construct New Legal Matrix
          </h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          Your interactive Judion Co-Pilot will autonomously assess variable risk metrics through this terminal.
        </p>
      </div>

      {/* Two-column split */}
      <div className="new-case-split">

        {/* Left Info Panel */}
        <div className="new-case-info-panel">
          {/* Hero Image */}
          <div className="hero-image-card">
            <img src="/images/new_case_hero.png" alt="Legal AI Matrix" />
            <div className="hero-image-overlay">
              <h3>Judion Intelligence Engine</h3>
              <p>Patent & IP Litigation Matrix v4.2</p>
            </div>
          </div>

          {/* Steps Guide */}
          <div className="info-steps-card">
            <h4>Intake Protocol</h4>
            {[
              { num: 1, title: "Case Title", desc: "Provide a working title for the matter" },
              { num: 2, title: "Select Domain", desc: "Choose from our verified patent domains" },
              { num: 3, title: "Case Summary", desc: "Describe key facts & legal complaint" },
              { num: 4, title: "AI Assessment", desc: "Receive Sovereign AI analysis payload" },
            ].map((step, i) => (
              <div key={i} className="info-step-row">
                <div className="info-step-num" style={phaseIdx > i ? { background: 'var(--judion-brown)' } : phaseIdx === i ? { background: 'var(--judion-gold)', color: 'var(--judion-brown)' } : {}}>
                  {phaseIdx > i ? <CheckCircle size={13} /> : step.num}
                </div>
                <div className="info-step-text">
                  <strong>{step.title}</strong>
                  <span>{step.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Valid Domains Reference */}
          <div className="info-steps-card" style={{ paddingTop: 18 }}>
            <h4>Accepted Domains</h4>
            <div className="domain-tag-grid">
              {VALID_DOMAINS.map(d => (
                <span
                  key={d}
                  className="domain-tag"
                  onClick={() => phase === "awaiting_domain" && handleSendDomainChip(d)}
                  style={{ cursor: phase === "awaiting_domain" ? 'pointer' : 'default' }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Chat Interface */}
        <div className="chat-intake-wrapper">
          {/* Header */}
          <div className="chat-intake-header">
            <div className="chat-intake-header-icon">
              <Zap size={20} />
            </div>
            <div className="chat-intake-header-text">
              <h2>Judion Interrogative Protocol</h2>
              <p>
                <span className="header-status-dot" />
                Live Tracking Active · Secure Encrypted Module
              </p>
            </div>
          </div>

          {/* Phase Progress */}
          <div className="phase-progress-bar">
            {PHASE_STEPS.map((step, i) => (
              <React.Fragment key={step.key}>
                <div className={`phase-step ${phaseIdx > i ? 'done' : phaseIdx === i ? 'active' : ''}`}>
                  <div className="phase-step-dot">{phaseIdx > i ? '✓' : i + 1}</div>
                  <span>{step.label}</span>
                </div>
                {i < PHASE_STEPS.length - 1 && (
                  <div className={`phase-step-line ${phaseIdx > i ? 'done' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Chat Window */}
          <div className="chat-window">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble-wrapper ${msg.role} animate-fade-in`}>
                {msg.type === 'text' ? (
                  <div className={`chat-bubble ${msg.role}`}>
                    {msg.role === 'ai' && <Bot size={13} style={{ color: 'var(--judion-gold)', marginBottom: 7 }} />}
                    {msg.attachmentObj && (
                      <div className="chat-bubble-attachment">
                        <FileText size={13} />
                        <span>{msg.attachmentObj}</span>
                      </div>
                    )}
                    {msg.content !== "Attached Document" && (
                      <span style={{ whiteSpace: 'pre-line' }}>{msg.content}</span>
                    )}
                  </div>
                ) : (
                  /* Assessment Card */
                  <div className="chat-bubble ai" style={{ maxWidth: '90%', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <ShieldCheck size={15} style={{ color: 'var(--judion-gold)' }} />
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mapping Complete</span>
                    </div>

                    <div className="chat-assessment-panel">
                      <div className="assessment-header">
                        <BarChart2 size={22} style={{ color: 'var(--judion-slate)' }} />
                        <h3 className="assessment-title">Global Analysis Payload</h3>
                        <span className="assessment-tag">Preliminary Vector</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Projected Outcome</label>
                          <div style={{ fontSize: 34, fontFamily: 'var(--font-header)', fontWeight: 700, color: 'var(--judion-brown)', lineHeight: 1 }}>{MOCK_ASSESSMENT_RESPONSE.probability}</div>
                        </div>
                        <div>
                          <label style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Recommended Strike</label>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.4 }}>{MOCK_ASSESSMENT_RESPONSE.recommendedAction}</div>
                        </div>
                      </div>

                      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
                        {caseSummary || MOCK_ASSESSMENT_RESPONSE.summary}
                      </p>

                      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                        <button className="btn-sm-dark w-full" style={{ padding: '13px', fontSize: 14, letterSpacing: 0.3 }} onClick={handleFinalize}>
                          ⚡ Transmute into Working Case
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="chat-bubble-wrapper ai animate-fade-in">
                <div className="chat-bubble ai chat-typing-indicator">
                  <Bot size={12} style={{ color: 'var(--judion-gold)', marginRight: 4 }} />
                  <div className="chat-typing-dot" />
                  <div className="chat-typing-dot" />
                  <div className="chat-typing-dot" />
                </div>
              </div>
            )}
            <div ref={endOfChatRef} />
          </div>

          {/* Domain Quick-chips (shown only during domain phase) */}
          {phase === "awaiting_domain" && (
            <div className="domain-chip-bar animate-fade-in">
              {DOMAIN_CHIPS.map(d => (
                <button key={d} className="domain-chip" onClick={() => handleSendDomainChip(d)}>
                  {d}
                </button>
              ))}
            </div>
          )}

          {/* Input Row */}
          <div className="chat-input-area">
            {attachment && (
              <div className="chat-attachment-preview">
                <FileText size={13} style={{ color: 'var(--judion-brown)' }} />
                <span>{attachment.name}</span>
                <button onClick={() => setAttachment(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  <X size={13} />
                </button>
              </div>
            )}

            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(e) => setAttachment(e.target.files[0])}
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            />

            <button
              className="chat-attach-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLocked}
              title="Attach Document"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              className="chat-input-field"
              placeholder={isLocked ? "Terminal Locked..." : phase === "awaiting_domain" ? "Or type exact domain name..." : "Input parameters to Judion Co-Pilot..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLocked}
            />
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={(!inputValue.trim() && !attachment) || isLocked}
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
