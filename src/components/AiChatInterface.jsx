import React, { useState, useRef } from 'react';
import { Paperclip, Send, File as FileIcon, Loader2, ArrowLeft } from 'lucide-react';
import TrustScoreBadge from './TrustScoreBadge';
import { mockCases } from '../data/mockData';
import './AiChatInterface.css';

export default function AiChatInterface({ onSelectCase, hidden }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! Please upload your current patent brief or main case document, and I will summarize it and retrieve relevant precedents.",
      cases: []
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [stagedFiles, setStagedFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  const simulateBotResponse = (files, query) => {
    setIsTyping(true);

    // Delayed bot response simulation
    setTimeout(() => {
      if (files.length > 0) {
        // If files were uploaded, do the full pipeline
        const botId = Date.now();
        setMessages(prev => [
          ...prev,
          {
            id: botId,
            sender: 'bot',
            text: `I have analyzed "${files[0].name}".\n\n**Case Summary:**\n• Technology: Wireless charging apparatus utilizing magnetic resonance.\n• Core Claim: Structural configuration of secondary shielding coils.\n• Novelty constraint: Indirection of magnetic flux paths to reduce thermal leakage.\n\nHere are the top top matching precedents tailored to your defense:`,
            cases: mockCases
          }
        ]);
      } else {
        // Just text
        const botId = Date.now();
        setMessages(prev => [
          ...prev,
          {
            id: botId,
            sender: 'bot',
            text: `I've analyzed your query regarding "${query}". Here are the top matching precedent cases:`,
            cases: mockCases
          }
        ]);
      }
      setIsTyping(false);
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  const handleSend = () => {
    if (!inputVal.trim() && stagedFiles.length === 0) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputVal,
      files: [...stagedFiles]
    };

    setMessages(prev => [...prev, newMsg]);
    simulateBotResponse(stagedFiles, inputVal);
    
    setInputVal('');
    setStagedFiles([]);
    
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setStagedFiles(prev => [...prev, ...files.map(f => ({ name: f.name }))]);
    e.target.value = null; // reset input
  };

  if (hidden) return null;

  return (
    <div className="AiChatInterface">
      <div className="chat-header">
        <h2>Legal Intelligence Chat</h2>
        <p>Analyze documents and discover precedents</p>
      </div>

      <div className="chat-feed">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            <div className="message-bubble">
              {msg.files && msg.files.map((f, i) => (
                <div key={i} className="uploaded-file-pill mb-2">
                  <FileIcon size={14} className="file-icon-sm" />
                  <span>{f.name}</span>
                </div>
              ))}
              
              <div className="message-text">
                {msg.text.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
              </div>

              {msg.cases && msg.cases.length > 0 && (
                <div className="mini-cards-container">
                  {msg.cases.map(c => (
                    <div key={c.id} className="chat-mini-card" onClick={() => onSelectCase(c.id)}>
                      <div className="mini-card-main">
                        <span className="mini-card-title">{c.title}</span>
                        <TrustScoreBadge score={c.score} reason={c.matchReason} />
                      </div>
                      <div className="mini-card-meta">
                        {c.jurisdiction} • {c.verdict}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-message bot">
            <div className="message-bubble typing-indicator">
              <Loader2 className="spinner" size={16} /> Analyzing...
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="chat-input-area">
        {stagedFiles.length > 0 && (
          <div className="staged-files">
            {stagedFiles.map((f, i) => (
              <span key={i} className="file-pill">
                <FileIcon size={14} /> {f.name}
              </span>
            ))}
          </div>
        )}
        <div className="input-row">
          <label className="icon-btn" title="Attach Document">
            <input type="file" multiple onChange={handleFileUpload} style={{display: 'none'}} />
            <Paperclip size={20} />
          </label>
          <input 
            type="text" 
            placeholder="Summarize a document or type your case scenario..." 
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="chat-input"
          />
          <button className="icon-btn primary" onClick={handleSend} disabled={!inputVal.trim() && stagedFiles.length === 0}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
