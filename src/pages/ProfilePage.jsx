import React, { useState } from 'react';
import { User, Shield, Key, Save, Briefcase, Mail, CheckCircle2 } from 'lucide-react';
import './ProfilePage.css';
import './Pages.css';

export default function ProfilePage({ userRole }) {
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userRole === 'admin' ? 'System Administrator' : 'Standard Operative',
    email: userRole === 'admin' ? 'admin@judion.com' : 'user@judion.com',
    firm: 'Sovereign Partners LLC',
    role: userRole === 'admin' ? 'Level 5 Supervisor' : 'Associate Attorney'
  });
  const [securityAction, setSecurityAction] = useState("");

  const handleSecurity = (msg) => {
    setSecurityAction(msg);
    setTimeout(() => setSecurityAction(""), 4000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="page-wrapper animate-fade-in relative">
      {securityAction && (
        <div style={{
          position: 'absolute', top: 24, left: 48, background: 'var(--judion-brown)', color: 'var(--judion-gold)',
          padding: '12px 24px', borderRadius: '8px', zIndex: 1000, boxShadow: 'var(--shadow-md)',
          fontWeight: 'bold', fontSize: '14px', border: '1px solid var(--judion-gold)'
        }} className="animate-fade-in">
          {securityAction}
        </div>
      )}
      <div className="profile-container">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>Operative Dossier</h1>
          <p>Manage your Judion intelligence clearance parameters and contact arrays.</p>
        </div>

        <div className="profile-grid">
          {/* Main Content Profile Card */}
          <div className="profile-panel">
            <div className="profile-header-strip">
              <div className="profile-avatar-wrapper">
                <div className="profile-avatar">
                  <User size={40} />
                </div>
              </div>
            </div>
            
            <div className="profile-details">
              <h2 className="profile-name">{formData.fullName}</h2>
              <div className="profile-role">
                <Shield size={16} style={{ color: userRole === 'admin' ? 'var(--accent-red)' : 'var(--judion-slate)' }} />
                <span>{formData.role}</span>
              </div>
            </div>

            <div className="profile-body">
              <h3 className="profile-section-title">Identity Parameters</h3>
              <form onSubmit={handleSave}>
                <div className="profile-form-grid">
                  <div className="premium-input-group">
                    <label>FULL DESIGNATION</label>
                    <div className="premium-input-wrapper">
                      <input 
                        type="text" 
                        className="premium-input"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      />
                      <User size={18} className="premium-icon" />
                    </div>
                  </div>
                  
                  <div className="premium-input-group">
                    <label>COMMUNICATION VECTOR</label>
                    <div className="premium-input-wrapper">
                      <input 
                        type="email" 
                        className="premium-input"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <Mail size={18} className="premium-icon" />
                    </div>
                  </div>

                  <div className="premium-input-group">
                    <label>FIRM / ORGANIZATION</label>
                    <div className="premium-input-wrapper">
                      <input 
                        type="text" 
                        className="premium-input"
                        value={formData.firm}
                        onChange={(e) => setFormData({...formData, firm: e.target.value})}
                      />
                      <Briefcase size={18} className="premium-icon" />
                    </div>
                  </div>

                  <div className="premium-input-group">
                    <label>OPERATIVE CLEARANCE</label>
                    <div className="premium-input-wrapper">
                      <input 
                        type="text" 
                        className="premium-input"
                        value={userRole === 'admin' ? 'SECURE TIER' : 'STANDARD TIER'}
                        disabled
                      />
                      <Shield size={18} className="premium-icon" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button type="submit" className="btn-save-profile">
                    <Save size={18}/> UPDATE DOSSIER
                  </button>
                  {isSaved && (
                    <span className="flex items-center gap-2 text-sm font-bold animate-fade-in" style={{ color: 'var(--judion-gold)', marginTop: '32px' }}>
                      <CheckCircle2 size={18} /> Information synchronized successfully
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Security Right Rail */}
          <div className="security-sidebar">
            <div className="security-module">
              <h3><Key size={18} style={{color: 'var(--judion-slate)'}} /> Protocol Encryption</h3>
              <p>Ensure your security footprint remains dynamic. Your last cryptographic rotation occurred 42 days ago.</p>
              <button className="btn-outline" onClick={() => handleSecurity("Cryptographic rotation initiated successfully.")}>
                Rotate Credentials
              </button>
            </div>

            <div className="security-module security-danger">
              <h3><Shield size={18} /> Self-Destruct Sequence</h3>
              <p>Initiate a total structural wipe of your personal Judion matrix connections. This action cannot be rescinded.</p>
              <button className="btn-danger" onClick={() => handleSecurity("Scrub protocol initialized. Logging out in 10s...")}>
                Scrub Protocol
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
