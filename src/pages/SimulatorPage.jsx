import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Send, Scale, UserCircle, Gavel, FileText, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';
import './SimulatorPage.css';
import './Pages.css';

export default function SimulatorPage() {
  const { activeAnalysis } = useOutletContext();
  const [phase, setPhase] = useState('setup'); // 'setup', 'trial', 'verdict'
  const [side, setSide] = useState(null); // 'plaintiff', 'defendant'
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfChatRef = useRef(null);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleStartTrial = (selectedSide) => {
    setSide(selectedSide);
    setPhase('trial');
    
    // Initial Judge message
    const roleMap = selectedSide === 'plaintiff' ? 'Counsel for the Plaintiff' : 'Counsel for the Defense';
    setMessages([
      { role: 'judge', text: `The Court is now in session regarding the matter of ${activeAnalysis.banner.title}. ${roleMap}, you may present your opening statement.` }
    ]);
  };

  const simulateAIResponse = (userText) => {
    setIsTyping(true);
    setTimeout(() => {
      let botResponse = '';
      let botRole = 'counsel';
      
      // Basic randomized AI response generation for prototype
      const r = Math.random();
      if (r < 0.3) {
        botRole = 'judge';
        botResponse = "Order in the court. Counsel, please stick to the precedent established in the case metadata.";
      } else if (r < 0.6) {
        botRole = 'counsel';
        botResponse = `Objection! The argument regarding "${userText.slice(0, 20)}..." ignores the key facts highlighted in our semantic mapping.`;
      } else {
        botRole = 'counsel';
        botResponse = "Your Honor, opposing counsel's assertions lack verifiable citations. We submit that the risk vectors clearly favor our interpretation.";
      }

      setMessages(prev => [...prev, { role: botRole, text: botResponse }]);
      setIsTyping(false);
    }, 1800);
  };

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    
    setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
    
    const submittedText = inputValue;
    setInputValue('');
    simulateAIResponse(submittedText);
  };

  const handleEndTrial = () => {
    setPhase('verdict');
  };

  const handleRestart = () => {
    setPhase('setup');
    setSide(null);
    setMessages([]);
  };

  if (phase === 'setup') {
    return (
      <div className="page-wrapper animate-fade-in Simulator-Setup">
        <div className="page-header">
          <h1>Virtual Court Simulator</h1>
          <p>Test your arguments against the Sovereign AI in a live adversarial environment regarding: <strong>{activeAnalysis.banner.title}</strong></p>
        </div>

        <div className="setup-container">
          <h2 className="setup-title">Choose Your Counsel Assignment</h2>
          <div className="side-cards">
            
            <div className="side-card player-card" onClick={() => handleStartTrial('plaintiff')}>
              <div className="side-card-header plaintiff-header">
                <img src="/images/plaintiff_icon.png" alt="Plaintiff Role" className="role-icon-img" />
                <h3>Plaintiff</h3>
              </div>
              <div className="side-card-body">
                <p>Argue affirmatively for the damages and complaints mapped in the case brief.</p>
                <button className="btn-glass w-full mt-4 flex items-center justify-center gap-2">
                  Select Plaintiff <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="side-card player-card" onClick={() => handleStartTrial('defendant')}>
              <div className="side-card-header defendant-header">
                <img src="/images/defendant_icon.png" alt="Defendant Role" className="role-icon-img" />
                <h3>Defendant</h3>
              </div>
              <div className="side-card-body">
                <p>Construct a defensive perimeter, citing invalidity clauses and mitigating damages.</p>
                <button className="btn-glass w-full mt-4 flex items-center justify-center gap-2">
                  Select Defendant <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (phase === 'verdict') {
    return (
      <div className="page-wrapper animate-fade-in Simulator-Verdict">
        <div className="page-header">
          <h1>Trial Adjourned</h1>
          <p>The AI Judge has modeled the final probabilistic outcomes based on your arguments.</p>
        </div>
        
        <div className="verdict-container card-border">
          <div className="verdict-header">
             <Gavel size={32} style={{color: 'var(--judion-gold)'}} />
             <h2>Final Judgment Simulation</h2>
          </div>
          
          <div className="verdict-stats">
            <div className="verdict-stat-box">
              <span className="v-label">ARGUMENT STRENGTH</span>
              <span className="v-val">74%</span>
            </div>
            <div className="verdict-stat-box">
              <span className="v-label">ESTIMATED VERDICT</span>
              <span className="v-val text-safe">Favorable</span>
            </div>
            <div className="verdict-stat-box">
              <span className="v-label">ADVERSARIAL RISK</span>
              <span className="v-val text-danger">Moderate</span>
            </div>
          </div>

          <div className="verdict-analysis">
            <h3><CheckCircle size={18} className="text-safe" /> Strategic Suggestion For Real Trial</h3>
            <p className="mt-3">Based on the simulation, your strongest angle was leveraging the semantic inconsistencies in opposing counsel's definitions. However, the Judge penalized your lack of cited precedent. The best outcome going forward is to file an early motion for partial summary judgment to establish the underlying factual constraints before proceeding to discovery.</p>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="btn-sm-dark" onClick={handleRestart}>Conduct Another Trial Sequence</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper animate-fade-in Simulator-Trial-Grid">
      {/* Left Sidebar HUD */}
      <div className="trial-sidebar">
         <div className="trial-hud">
            <span className="trial-badge">ACTIVE TRIAL</span>
            <h2 className="mt-4 text-2xl font-bold" style={{ color: 'white' }}>{activeAnalysis.banner.title}</h2>
            
            <div className="hud-side-info mt-6">
               <img src={`/images/${side}_icon.png`} alt={side} className="hud-side-icon" />
               <div>
                 <p className="text-xs text-muted font-bold uppercase mb-1">You are acting as</p>
                 <p className="font-bold text-md" style={{ color: 'white' }}>{side === 'plaintiff' ? 'Counsel for Plaintiff' : 'Counsel for Defense'}</p>
               </div>
            </div>
            
            <div className="hud-instructions mt-8">
               <h4 className="text-sm font-bold uppercase mb-2" style={{ color: 'var(--judion-gold)' }}>Courtroom Guidelines</h4>
               <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
                 Present your arguments clearly. The AI Judge will mediate the trial, while opposing counsel will counter your claims based on their defined logic. Click below when you are ready to rest your case and calculate the final verdict.
               </p>
            </div>
         </div>
         
         <button className="btn-danger w-full mt-auto" onClick={handleEndTrial}>
           <AlertTriangle size={18} /> End Trial & Calculate Verdict
         </button>
      </div>

      {/* Right Main Chat */}
      <div className="trial-main-chat">
        <div className="court-chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`court-msg-wrapper ${msg.role}`}>
              {msg.role === 'judge' && (
                <div className="court-actor-label"><Gavel size={14}/> The Hon. Matrix Judge</div>
              )}
              {msg.role === 'counsel' && (
                <div className="court-actor-label"><UserCircle size={14}/> Opposing Counsel</div>
              )}
              <div className={`court-msg ${msg.role}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="court-msg-wrapper counsel">
               <div className="court-actor-label"><UserCircle size={14}/> Opposing Counsel (Typing...)</div>
               <div className="court-msg counsel typing">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
               </div>
            </div>
          )}
          <div ref={endOfChatRef} />
        </div>

        <div className="court-input-area">
          <textarea 
            className="court-textarea" 
            placeholder="State your argument to the court..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={isTyping}
          ></textarea>
          <button 
            className="court-send-btn" 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
          >
             <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
