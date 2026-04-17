import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import './FloatingChatbot.css';

export default function FloatingChatbot({ activeAnalysis }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your contextual case assistant. Ask me anything about the active case.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (activeAnalysis?.banner?.title) {
        setMessages([
          { role: 'bot', text: `Hello! I am ready to assist you with "${activeAnalysis.banner.title}". What would you like to know?` }
        ]);
    }
  }, [activeAnalysis]);

  useEffect(() => {
    if (isOpen) {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg = { role: 'user', text: inputVal };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
       const botMsg = { 
           role: 'bot', 
           text: `Based on the active case details (${activeAnalysis?.banner?.title || 'Unknown Case'}), I've analyzed your query. The current risk level is considered ${activeAnalysis?.stats?.risk || 'uncalculated'}. Let me know if you need specific strategy recommendations.` 
       };
       setMessages(prev => [...prev, botMsg]);
       setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="FloatingChatbot-container">
      {isOpen && (
        <div className="FloatingChatbot-window animate-fade-in">
          <div className="chat-window-header">
            <div className="header-title">
              <Bot size={18} />
              <span>Case Assistant AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn"><X size={18} /></button>
          </div>
          <div className="chat-window-body">
            {messages.map((msg, i) => (
               <div key={i} className={`chat-msg ${msg.role}`}>
                 <div className="msg-bubble">{msg.text}</div>
               </div>
            ))}
            {isTyping && (
               <div className="chat-msg bot">
                 <div className="msg-bubble typing">
                   <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                 </div>
               </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
          <div className="chat-window-footer">
            <input 
              type="text" 
              placeholder="Ask about this case..." 
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button disabled={!inputVal.trim() || isTyping} onClick={handleSend}><Send size={16} /></button>
          </div>
        </div>
      )}

      <button className={`chatbot-trigger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={26} /> : <MessageSquare size={26} fill="none" strokeWidth={1.5} />}
      </button>
    </div>
  );
}
