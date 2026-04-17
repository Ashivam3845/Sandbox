import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Send, Bot, BarChart2, ShieldCheck, Zap, Paperclip, FileText, X } from 'lucide-react';
import './Pages.css';
import './ChatIntake.css';

const MOCK_ASSESSMENT_RESPONSE = {
  jurisdiction: "Pending Match",
  domain: "Pending Scope",
  probability: "73%",
  recommendedAction: "Immediate Claim Construction Invalidity Matrix",
  summary: "Initial analysis indicates significant overlapping elements with previously executed matters. Prior art references could serve as strong invalidation parameters if structured via a Markman defense early in discovery."
};

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

  // Storing input variables for extraction
  const [caseTitle, setCaseTitle] = useState("");
  const [caseDomain, setCaseDomain] = useState("");
  const [caseSummary, setCaseSummary] = useState("");
  
  const endOfChatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if ((!inputValue.trim() && !attachment) || isTyping) return;

    const userTxt = inputValue.trim();
    // Push User message
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

    // Simulated AI response lag
    setTimeout(() => {
      setIsTyping(false);
      progressConversation(userTxt || "Attached Document");
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const progressConversation = (lastInput) => {
    if (phase === "awaiting_title") {
      setCaseTitle(lastInput);
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: "Title sequence locked. What primary jurisdictional domain does this dispute primarily fall under? (e.g., Patent Infringement, M&A Antitrust, Employment Law)" }]);
      setPhase("awaiting_domain");
    } 
    else if (phase === "awaiting_domain") {
      setCaseDomain(lastInput);
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: "Domain parameters confirmed. Finally, please provide a brief summary of the exact legal complaint, known facts, or critical prior constraints." }]);
      setPhase("awaiting_summary");
    }
    else if (phase === "awaiting_summary") {
      setCaseSummary(lastInput);
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: "Processing context structure against Sovereign datasets. Please wait..." }]);
      setPhase("computing");
      
      // Simulate heavy AI processing lag generating the final Payload
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { role: 'ai', type: 'assessment', content: "Assessment generation absolute." }]);
        setPhase("complete");
      }, 3000);
    }
  };

  const handleComputeStrategy = () => {
    setMessages(prev => [...prev, { role: 'ai', type: 'text', content: "Synthesizing adversarial maneuvers and prior art..." }]);
    setPhase("strategy_computing");
    setIsTyping(true);
    
    setTimeout(() => {
       setIsTyping(false);
       setMessages(prev => [...prev, { role: 'ai', type: 'strategy_decision', content: "Strategy execution matrix computed." }]);
       setPhase("strategy_complete");
    }, 2500);
  };

  const handleFinalize = (saveStrategy) => {
    // Generate UUID string and timestamp
    const idStr = `c-${Date.now()}`;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Synthesize the massive payload so DashboardPage can parse it flawlessly!
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
      facts: [
        { title: 'Intake Parameter Verified', match: '99%' }
      ],
      legal: [
        { title: 'Judion AI General Rule 1.1', desc: 'Proprietary algorithmic rule binding.' }
      ],
      depth: { scanned: '8,401', verified: '1', jurisdictions: '1' }
    };

    let generatedStrategy = null;
    
    if (saveStrategy) {
      generatedStrategy = {
        id: idStr + '-strat',
        title: `AI Extracted: ${caseTitle || 'Tactical Pathway'}`,
        tags: [caseDomain || 'General', 'Automated Strategy'],
        summary: `Aggressive pursuit algorithm mapping ${caseSummary.slice(0, 30)}...`,
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
      
      setStrategies(prev => [generatedStrategy, ...prev]);
      synthesizedDataset.activeStrategy = generatedStrategy;
    }

    const newHistoryRow = {
      id: idStr,
      title: caseTitle || 'Untitled Action',
      court: 'Judion AI Matrix',
      date: dateStr,
      verdict: 'Pending',
      status: 'active',
      confidence: 81,
      datasetContext: synthesizedDataset
    };

    // Override the application globals!
    setCases(prev => [newHistoryRow, ...prev]);
    setActiveAnalysis(synthesizedDataset);
    
    // Transport user home
    navigate('/');
  };

  return (
    <div className="page-wrapper animate-fade-in flex flex-col h-full">
      <div className="page-header" style={{ marginBottom: 16 }}>
        <h1>Construct New Legal Matrix</h1>
        <p>Your interactive Judion Co-Pilot will autonomously assess variable risk metrics directly through this terminal.</p>
      </div>

      <div className="chat-intake-wrapper">
        <div className="chat-intake-header">
          <div className="chat-intake-header-icon">
            <Zap size={22} />
          </div>
          <div className="chat-intake-header-text">
            <h2>Judion Interrogative Protocol</h2>
            <p>Active Live Tracking 🟢 Secure Module</p>
          </div>
        </div>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble-wrapper ${msg.role} animate-fade-in`}>
              {msg.type === 'text' ? (
                <div className={`chat-bubble ${msg.role}`}>
                  {msg.role === 'ai' && <Bot size={14} style={{ color: 'var(--judion-gold)', marginBottom: 8 }} />}
                  {msg.attachmentObj && (
                     <div className="chat-bubble-attachment">
                        <FileText size={14} />
                        <span>{msg.attachmentObj}</span>
                     </div>
                  )}
                  {msg.content !== "Attached Document" && msg.content}
                </div>
              ) : (
                <div className="chat-bubble ai" style={{ maxWidth: '85%', width: '100%' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                     <ShieldCheck size={16} style={{ color: 'var(--judion-gold)' }} />
                     <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>MAPPING COMPLETE</span>
                   </div>
                   
                   <div className="chat-assessment-panel">
                     <div className="assessment-header">
                       <BarChart2 size={24} style={{ color: 'var(--judion-slate)' }} />
                       <h3 className="assessment-title">Global Analysis Payload</h3>
                       <span className="assessment-tag">PRELIMINARY VECTOR</span>
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                           <label style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 1 }}>PROJECTED OUTCOME PROBABILITY</label>
                           <div style={{ fontSize: 32, fontFamily: 'var(--font-header)', fontWeight: 700, color: 'var(--judion-brown)' }}>{MOCK_ASSESSMENT_RESPONSE.probability}</div>
                        </div>
                        <div>
                           <label style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 1 }}>RECOMMENDED STRIKE</label>
                           <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)', marginTop: 4 }}>{MOCK_ASSESSMENT_RESPONSE.recommendedAction}</div>
                        </div>
                     </div>
                     <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, borderTop: '1px solid var(--border-light)', paddingTop: 16 }}>
                       {caseSummary || MOCK_ASSESSMENT_RESPONSE.summary}
                     </p>
                     
                     <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                        <button className="btn-sm-dark w-full" style={{ padding: '12px', fontSize: 14 }} onClick={() => handleFinalize(true)}>
                          Transmute into Working Case
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
                <div className="chat-typing-dot"></div>
                <div className="chat-typing-dot"></div>
                <div className="chat-typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={endOfChatRef} />
        </div>

        <div className="chat-input-area" style={{ position: 'relative' }}>
          {attachment && (
            <div className="chat-attachment-preview">
              <FileText size={14} style={{ color: 'var(--judion-brown)' }} />
              <span>{attachment.name}</span>
              <button 
                onClick={() => setAttachment(null)} 
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={14} />
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
            disabled={phase === "complete" || phase === "computing" || phase === "strategy_computing" || phase === "strategy_complete"}
            title="Attach Document"
          >
            <Paperclip size={20} />
          </button>

          <input 
            type="text" 
            className="chat-input-field" 
            placeholder={(phase === "complete" || phase === "computing" || phase === "strategy_computing" || phase === "strategy_complete") ? "Terminal Locked..." : "Input parameters to Judion Co-Pilot..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={phase === "complete" || phase === "computing" || phase === "strategy_computing" || phase === "strategy_complete"}
          />
          <button 
            className="chat-send-btn" 
            onClick={handleSend}
            disabled={(!inputValue.trim() && !attachment) || phase === "complete" || phase === "computing" || phase === "strategy_computing" || phase === "strategy_complete"}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
