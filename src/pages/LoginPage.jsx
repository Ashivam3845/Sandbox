import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, ArrowRight, User } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage({ setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@judion.com' && password === 'admin') {
      setUserRole('admin');
      navigate('/admin');
    } else if (email === 'user@judion.com' && password === 'user') {
      setUserRole('user');
      navigate('/');
    } else {
      setError('Invalid identity credentials. Access denied.');
    }
  };

  return (
    <div className="judion-login-layout">
      {/* Brand Side */}
      <div className="judion-brand-panel">
        <div className="brand-content">
          <div className="judion-logo-wrapper">
            <svg width="84" height="84" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--judion-gold)' }}>
              {/* Top horizontal bar */}
              <rect x="18" y="15" width="64" height="5" fill="currentColor" />
              {/* Three vertical pillars */}
              <rect x="30" y="20" width="10" height="65" fill="currentColor" />
              <rect x="45" y="20" width="10" height="65" fill="currentColor" />
              <rect x="60" y="20" width="10" height="65" fill="currentColor" />
              {/* Bottom J Hook Base */}
              <rect x="15" y="80" width="15" height="5" fill="currentColor" />
              {/* Bottom J Hook Ascender */}
              <rect x="15" y="65" width="5" height="20" fill="currentColor" />
            </svg>
          </div>
          <h1 className="judion-name font-serif">Judion</h1>
          <h2 className="judion-tagline">Your Legal Thinking partner</h2>
          <div className="judion-divider"></div>
          <p className="judion-usp">
            "An explainable AI legal co-pilot that turns complex cases into transparent, multi-perspective insights with confidence-backed decisions— while keeping the human in control."
          </p>
        </div>
      </div>

      {/* Auth Side */}
      <div className="judion-auth-panel">
        <div className="auth-box">
           <h3 className="auth-title">System Access</h3>
           <p className="auth-subtitle">Welcome back. Please establish your credentials.</p>

           {error && (
             <div className="auth-error-alert animate-shake">
               <AlertCircle size={16} />
               <span>{error}</span>
             </div>
           )}

           <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label>OPERATIVE ID</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="operator@judion.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group mb-8">
                <label>SECURITY CLASSIFICATION</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="auth-submit-btn"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>Authenticate</span>
                <ArrowRight size={18} className={`btn-arrow ${isHovered ? 'sliding' : ''}`} />
              </button>
           </form>
           
           <div className="auth-footer">
             <p>Platform telemetry is strictly monitored.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
