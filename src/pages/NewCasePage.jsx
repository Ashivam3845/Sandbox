import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, FileText, BarChart2, ShieldCheck, Zap } from 'lucide-react';
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
  const [messages, setMessages] = useState([
    { role: 'ai', type: 'text', content: "Welcome to Judion Co-Pilot Initial Assessment. I am prepared to begin constructing your legal thesis. To initialize the matrices, please provide a working Case Title for this matter." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [phase, setPhase] = useState("awaiting_title");
  const [isTyping, setIsTyping] = useState(false);
  
  const endOfChatRef = useRef(null);

  useEffect(() => {
    if (endOfChatRef.current) {
      endOfChatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    // Push User message
    const userMsg = { role: 'user', type: 'text', content: inputValue.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulated AI response lag
    setTimeout(() => {
      setIsTyping(false);
      progressConversation();
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const progressConversation = () => {
    if (phase === "awaiting_title") {
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: "Title sequence locked. What primary jurisdictional domain does this dispute primarily fall under? (e.g., Patent Infringement, M&A Antitrust, Employment Law)" }]);
      setPhase("awaiting_domain");
    } 
    else if (phase === "awaiting_domain") {
      setMessages(prev => [...prev, { role: 'ai', type: 'text', content: "Domain parameters confirmed. Finally, please provide a brief summary of the exact legal complaint, known facts, or critical prior constraints." }]);
      setPhase("awaiting_summary");
    }
    else if (phase === "awaiting_summary") {
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
                  {msg.content}
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
                       {MOCK_ASSESSMENT_RESPONSE.summary}
                     </p>
                     
                     <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                        <button className="btn-sm-dark w-full" style={{ padding: '12px', fontSize: 14 }}>Transmute into Working Case</button>
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

        <div className="chat-input-area">
          <input 
            type="text" 
            className="chat-input-field" 
            placeholder={phase === "complete" || phase === "computing" ? "Terminal Locked..." : "Input parameters to Judion Co-Pilot..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={phase === "complete" || phase === "computing"}
          />
          <button 
            className="chat-send-btn" 
            onClick={handleSend}
            disabled={!inputValue.trim() || phase === "complete" || phase === "computing"}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
