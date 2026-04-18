import React, { useState, useRef, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Send, Scale, UserCircle, Gavel, FileText, ChevronRight, CheckCircle, AlertTriangle, BookOpen, Flame, ShieldCheck, ArrowRight } from 'lucide-react';
import './SimulatorPage.css';
import './Pages.css';

// ─────────────────────────────────────────────────────
// Strategy Preview panel (linked from NewCase)
// ─────────────────────────────────────────────────────
function StrategyPreviewCard({ strategy, onLaunchTrial }) {
  return (
    <div className="strat-preview-card animate-fade-in">
      <div className="strat-preview-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Flame size={18} style={{ color: 'var(--judion-gold)' }} />
          <span style={{ fontFamily: 'var(--font-header)', fontSize: 12, letterSpacing: '1px', color: 'var(--judion-gold)', textTransform: 'uppercase' }}>
            Linked Strategy Dossier
          </span>
        </div>
        <span className="badge-dark" style={{ background: 'rgba(207,178,134,0.15)', color: 'var(--judion-gold)', border: '1px solid rgba(207,178,134,0.3)' }}>
          AI COMPUTED
        </span>
      </div>

      <h3 className="strat-preview-title">{strategy.title}</h3>

      <div className="strat-preview-synopsis">
        <ShieldCheck size={13} style={{ color: 'var(--judion-gold)', flexShrink: 0 }} />
        <p>{strategy.details.synopsis}</p>
      </div>

      <div className="strat-preview-steps">
        <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          Tactical Execution Pathway
        </span>
        <ol className="strat-steps-list">
          {strategy.details.steps.map((step, i) => (
            <li key={i} className="strat-step-item">
              <div className="strat-step-num">{i + 1}</div>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="strat-preview-footer">
        <div className="strat-prob-chip">
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.7px' }}>Success Probability</span>
          <span style={{ fontSize: 26, fontFamily: 'var(--font-header)', fontWeight: 700, color: 'var(--judion-gold)', lineHeight: 1 }}>{strategy.details.probability}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <button className="btn-glass" style={{ justifyContent: 'center' }} onClick={() => onLaunchTrial('plaintiff')}>
            ⚖️ Proceed as Plaintiff <ChevronRight size={14} />
          </button>
          <button className="btn-glass" style={{ justifyContent: 'center', opacity: 0.85 }} onClick={() => onLaunchTrial('defendant')}>
            🛡️ Proceed as Defendant <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────
// Main Simulator
// ─────────────────────────────────────────────────────
export default function SimulatorPage() {
  const { activeAnalysis } = useOutletContext();
  const navigate = useNavigate();
  const [phase, setPhase] = useState('setup'); // 'setup', 'strategy_review', 'trial', 'verdict'
  const [side, setSide] = useState(null);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfChatRef = useRef(null);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const hasLinkedStrategy = activeAnalysis?.activeStrategy != null;

  const handleStartTrial = (selectedSide) => {
    setSide(selectedSide);
    setPhase('trial');
    const roleMap = selectedSide === 'plaintiff' ? 'Counsel for the Plaintiff' : 'Counsel for the Defense';
    setMessages([
      { role: 'judge', text: `The Court is now in session regarding the matter of "${activeAnalysis.banner.title}". ${roleMap}, you may present your opening statement.` }
    ]);
  };

  const simulateAIResponse = (userText) => {
    setIsTyping(true);
    setTimeout(() => {
      let botResponse = '';
      let botRole = 'counsel';
      const r = Math.random();
      if (r < 0.3) {
        botRole = 'judge';
        botResponse = "Order in the court. Counsel, please stick to the precedent established in the case metadata.";
      } else if (r < 0.6) {
        botRole = 'counsel';
        botResponse = `Objection! The argument regarding "${userText.slice(0, 24)}..." ignores the key facts highlighted in our semantic mapping.`;
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

  const handleEndTrial = () => setPhase('verdict');
  const handleRestart = () => { setPhase('setup'); setSide(null); setMessages([]); };

  // ── Setup Screen ───────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="page-wrapper animate-fade-in Simulator-Setup">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Scale size={20} style={{ color: 'var(--judion-gold)' }} />
            <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 24, letterSpacing: '0.4px' }}>Virtual Court Simulator</h1>
          </div>
          <p>Test your arguments against the Sovereign AI in a live adversarial environment regarding: <strong>{activeAnalysis?.banner?.title || 'No Case Loaded'}</strong></p>
        </div>

        {/* If active strategy exists, show it first */}
        {hasLinkedStrategy ? (
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <BookOpen size={15} style={{ color: 'var(--judion-brown)' }} />
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)' }}>
                Strategy Attached — Review Before Trial
              </span>
            </div>
            <StrategyPreviewCard strategy={activeAnalysis.activeStrategy} onLaunchTrial={handleStartTrial} />
          </div>
        ) : (
          /* No strategy: pick side directly */
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
        )}
      </div>
    );
  }

  // ── Verdict Screen ─────────────────────────────────
  if (phase === 'verdict') {
    return (
      <div className="page-wrapper animate-fade-in Simulator-Verdict">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Gavel size={20} style={{ color: 'var(--judion-gold)' }} />
            <h1 style={{ fontFamily: 'var(--font-header)', fontSize: 24, letterSpacing: '0.4px' }}>Trial Adjourned</h1>
          </div>
          <p>The AI Judge has modeled the final probabilistic outcomes based on your arguments.</p>
        </div>

        <div className="verdict-container card-border">
          <div className="verdict-header">
            <Gavel size={32} style={{ color: 'var(--judion-gold)' }} />
            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: 20, letterSpacing: '0.4px' }}>Final Judgment Simulation</h2>
          </div>

          <div className="verdict-stats">
            <div className="verdict-stat-box">
              <span className="v-label">Argument Strength</span>
              <span className="v-val">74%</span>
            </div>
            <div className="verdict-stat-box">
              <span className="v-label">Estimated Verdict</span>
              <span className="v-val text-safe">Favorable</span>
            </div>
            <div className="verdict-stat-box">
              <span className="v-label">Adversarial Risk</span>
              <span className="v-val text-danger">Moderate</span>
            </div>
          </div>

          <div className="verdict-analysis">
            <h3><CheckCircle size={17} className="text-safe" style={{ display: 'inline', marginRight: 8 }} />Strategic Suggestion For Real Trial</h3>
            <p className="mt-3">Based on the simulation, your strongest angle was leveraging the semantic inconsistencies in opposing counsel's definitions. However, the Judge penalized your lack of cited precedent. The best outcome going forward is to file an early motion for partial summary judgment to establish the underlying factual constraints before proceeding to discovery.</p>
            {activeAnalysis?.activeStrategy && (
              <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(207,178,134,0.07)', border: '1px solid rgba(207,178,134,0.25)', borderRadius: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--judion-gold-dark)' }}>Aligned with Strategy: </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>{activeAnalysis.activeStrategy.title}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button className="btn-sm-outline" onClick={() => navigate('/strategies')}>
              View Strategies <ArrowRight size={14} style={{ display: 'inline' }} />
            </button>
            <button className="btn-sm-dark" onClick={handleRestart}>Conduct Another Trial</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Trial Screen ───────────────────────────────────
  return (
    <div className="page-wrapper animate-fade-in Simulator-Trial-Grid">
      {/* Left HUD */}
      <div className="trial-sidebar">
        <div className="trial-hud">
          <span className="trial-badge">ACTIVE TRIAL</span>
          <h2 className="mt-4 text-2xl font-bold" style={{ color: 'white', fontFamily: 'var(--font-header)', fontSize: 18, lineHeight: 1.3 }}>
            {activeAnalysis.banner.title}
          </h2>

          <div className="hud-side-info mt-6">
            <img src={`/images/${side}_icon.png`} alt={side} className="hud-side-icon" />
            <div>
              <p className="text-xs text-muted font-bold uppercase mb-1">You are acting as</p>
              <p className="font-bold text-md" style={{ color: 'white' }}>{side === 'plaintiff' ? 'Counsel for Plaintiff' : 'Counsel for Defense'}</p>
            </div>
          </div>

          {/* Strategy reminder */}
          {activeAnalysis?.activeStrategy && (
            <div className="hud-strategy-chip mt-6">
              <Flame size={13} style={{ color: 'var(--judion-gold)', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.7px', color: 'var(--judion-gold)', display: 'block', marginBottom: 2 }}>Active Strategy</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{activeAnalysis.activeStrategy.title}</span>
              </div>
            </div>
          )}

          <div className="hud-instructions mt-6">
            <h4 className="text-sm font-bold uppercase mb-2" style={{ color: 'var(--judion-gold)' }}>Courtroom Guidelines</h4>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>
              Present your arguments clearly. The AI Judge will mediate the trial, while opposing counsel will counter your claims. Click End Trial when ready.
            </p>
          </div>
        </div>

        <button className="btn-danger w-full mt-auto" onClick={handleEndTrial}>
          <AlertTriangle size={16} /> End Trial & Calculate Verdict
        </button>
      </div>

      {/* Right Chat */}
      <div className="trial-main-chat">
        <div className="court-chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`court-msg-wrapper ${msg.role}`}>
              {msg.role === 'judge' && (
                <div className="court-actor-label"><Gavel size={13} /> The Hon. Matrix Judge</div>
              )}
              {msg.role === 'counsel' && (
                <div className="court-actor-label"><UserCircle size={13} /> Opposing Counsel</div>
              )}
              <div className={`court-msg ${msg.role}`}>{msg.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="court-msg-wrapper counsel">
              <div className="court-actor-label"><UserCircle size={13} /> Opposing Counsel (Typing...)</div>
              <div className="court-msg counsel typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}
          <div ref={endOfChatRef} />
        </div>

        <div className="court-input-area">
          <textarea
            className="court-textarea"
            placeholder="State your argument to the court... (Enter to submit, Shift+Enter for new line)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            disabled={isTyping}
          />
          <button className="court-send-btn" onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
