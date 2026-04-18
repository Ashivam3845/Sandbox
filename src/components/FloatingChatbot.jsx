import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Scale, Sparkles, ChevronDown } from 'lucide-react';
import './FloatingChatbot.css';

// Context-aware response engine based on active case
function generateContextResponse(query, activeAnalysis) {
  const q = query.toLowerCase();
  const caseTitle = activeAnalysis?.banner?.title || 'the active case';
  const caseType  = activeAnalysis?.banner?.type  || 'General Litigation';
  const risk      = activeAnalysis?.stats?.risk   || 'Unknown';
  const strength  = activeAnalysis?.stats?.strength || 'Unknown';
  const range     = activeAnalysis?.stats?.range   || 'Undetermined';
  const confidence = activeAnalysis?.stats?.confidence || 'N/A';
  const domain    = activeAnalysis?.banner?.location || 'Unknown jurisdiction';
  const summary   = activeAnalysis?.stats?.summary || '';

  // Risk / strength related
  if (q.includes('risk') || q.includes('danger') || q.includes('threat')) {
    return `For **${caseTitle}**, the current risk level is assessed as **${risk}**. Case strength stands at **${strength}** confidence. ${risk === 'High' ? 'I recommend aggressive early discovery and pre-trial motions to mitigate exposure.' : 'The risk profile is manageable — focus on strengthening precedent citations before trial.'}`;
  }
  // Settlement / damages
  if (q.includes('settl') || q.includes('damag') || q.includes('compens') || q.includes('money')) {
    return `Based on my analysis of **${caseTitle}**, the estimated settlement/damages range is **${range}**. Confidence interval: ${confidence}. In ${caseType} matters, early settlement discussions typically occur after initial motions. Consider whether a structured settlement offer below the midpoint would be accepted.`;
  }
  // Strategy
  if (q.includes('strateg') || q.includes('approach') || q.includes('how to') || q.includes('plan')) {
    return `For **${caseTitle}** (${caseType} in ${domain}): My recommended approach is to focus on early claim construction if this is a patent matter, or establish breach elements through contemporaneous evidence. Case strength: ${strength}. Would you like me to outline specific tactical steps?`;
  }
  // Summary / overview
  if (q.includes('summar') || q.includes('overview') || q.includes('brief') || q.includes('what is') || q.includes('tell me about')) {
    return `**${caseTitle}** — *${caseType}* filed in ${domain}.\n\n${summary.slice(0, 280)}${summary.length > 280 ? '...' : ''}\n\nRisk: ${risk} | Strength: ${strength} | Estimated Range: ${range}.`;
  }
  // Precedents / references
  if (q.includes('precedent') || q.includes('case law') || q.includes('citation') || q.includes('reference')) {
    const refs = activeAnalysis?.references?.map(r => `• ${r.title} (${r.year}) — ${r.match} match`).join('\n') || '• No references loaded for this case.';
    return `Matched precedents for **${caseTitle}**:\n\n${refs}\n\nWould you like a detailed breakdown of any specific precedent?`;
  }
  // Simulator
  if (q.includes('simulat') || q.includes('trial') || q.includes('court') || q.includes('argue')) {
    return `To run a court simulation for **${caseTitle}**, navigate to the **Court Simulator** via the sidebar. You can run the trial as Plaintiff or Defendant, and the AI judge will evaluate your arguments in real time against the case brief. Your linked strategy will also be loaded automatically.`;
  }
  // Confidence
  if (q.includes('confidence') || q.includes('probability') || q.includes('chance') || q.includes('win')) {
    return `For **${caseTitle}**, the AI confidence interval is **${confidence}**. This reflects overall win probability based on case strength (${strength}), jurisdictional precedent matching in ${domain}, and the risk profile (${risk}). An early motion for summary judgment could meaningfully shift this figure.`;
  }
  // Domain / jurisdiction
  if (q.includes('jurisdict') || q.includes('court') || q.includes('where') || q.includes('venue')) {
    return `**${caseTitle}** is assigned to **${domain}**. Jurisdictional strategy matters significantly here — local rules, judge history, and patent/contract precedent in this venue all affect tactical decisions. Shall I analyze venue-specific risks?`;
  }

  // Default fallback
  return `Regarding **${caseTitle}** (${caseType}):\n\nI'm analyzing your query against the case parameters. Current risk: ${risk}, case strength: ${strength}.\n\nYou can ask me about: **risk analysis**, **strategy**, **damages range**, **precedents**, **jurisdiction**, **trial simulation**, or a **case summary**.`;
}

// Suggested quick questions based on case
function getSuggestions(activeAnalysis) {
  const type = activeAnalysis?.banner?.type || '';
  const isPatent = type.toLowerCase().includes('patent');
  return isPatent
    ? ['What is the risk level?', 'Summarize the case', 'Key precedents', 'Recommended strategy', 'Run trial simulation']
    : ['What is the risk level?', 'Summarize the case', 'Settlement range', 'Recommended strategy', 'Case precedents'];
}

export default function FloatingChatbot({ activeAnalysis }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your contextual case assistant. Ask me anything about the active case.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  // Reset chat when active case changes
  useEffect(() => {
    if (activeAnalysis?.banner?.title) {
      setMessages([{
        role: 'bot',
        text: `Case loaded: **${activeAnalysis.banner.title}**\n\nI'm ready to assist with this ${activeAnalysis.banner.type || 'matter'}. What would you like to know?`
      }]);
      setShowSuggestions(true);
    }
  }, [activeAnalysis?.id]);

  useEffect(() => {
    if (isOpen) endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInputVal('');
    setIsTyping(true);
    setShowSuggestions(false);

    setTimeout(() => {
      const response = generateContextResponse(text, activeAnalysis);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 900 + Math.random() * 600);
  };

  const suggestions = getSuggestions(activeAnalysis);

  return (
    <div className="FloatingChatbot-container">
      {isOpen && (
        <div className="FloatingChatbot-window animate-fade-in">
          {/* Header */}
          <div className="chat-window-header">
            <div className="header-left">
              <div className="header-bot-icon">
                <Bot size={16} />
              </div>
              <div>
                <div className="header-title">Case Assistant AI</div>
                <div className="header-case-name">
                  {activeAnalysis?.banner?.title
                    ? activeAnalysis.banner.title.length > 32
                      ? activeAnalysis.banner.title.slice(0, 32) + '…'
                      : activeAnalysis.banner.title
                    : 'No case loaded'}
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn"><X size={16} /></button>
          </div>

          {/* Body */}
          <div className="chat-window-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.role === 'bot' && (
                  <div className="bot-avatar"><Bot size={12} /></div>
                )}
                <div className="msg-bubble" style={{ whiteSpace: 'pre-line' }}>
                  {msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-msg bot">
                <div className="bot-avatar"><Bot size={12} /></div>
                <div className="msg-bubble typing">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              </div>
            )}

            {/* Quick suggestions */}
            {showSuggestions && !isTyping && (
              <div className="chat-suggestions animate-fade-in">
                <div className="suggestions-label">
                  <Sparkles size={11} /> Quick questions
                </div>
                <div className="suggestions-grid">
                  {suggestions.map((s, i) => (
                    <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!showSuggestions && !isTyping && messages.length > 1 && (
              <button
                className="show-suggestions-btn"
                onClick={() => setShowSuggestions(true)}
              >
                <Sparkles size={11} /> Show quick questions
              </button>
            )}

            <div ref={endOfMessagesRef} />
          </div>

          {/* Footer */}
          <div className="chat-window-footer">
            <Scale size={14} style={{ color: 'var(--judion-gold)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Ask about this case..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(inputVal)}
            />
            <button disabled={!inputVal.trim() || isTyping} onClick={() => sendMessage(inputVal)}>
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      <button className={`chatbot-trigger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} fill="none" strokeWidth={1.5} />}
        {!isOpen && activeAnalysis && (
          <div className="chatbot-trigger-pulse" />
        )}
      </button>
    </div>
  );
}
