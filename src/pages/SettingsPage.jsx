import React, { useState } from 'react';
import './Pages.css';

export default function SettingsPage() {
  const [toggles, setToggles] = useState({
    aiSuggestions: true,
    emailDigest: false,
    autoSave: true,
    vectorGraph: true,
    twoFactor: false,
  });

  const toggle = key => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your Sovereign Counsel workspace preferences and account settings.</p>
      </div>

      <div style={{ maxWidth: 680 }}>

        <div className="settings-section">
          <div className="settings-section-title">Account</div>
          <div className="settings-row">
            <div className="settings-label">
              <h4>Firm Name</h4>
              <p>Your firm's display name across the platform</p>
            </div>
            <input defaultValue="Pinnacle Legal Partners LLP" style={{ padding: '8px 12px', border: '1px solid var(--border-light)', borderRadius: 4, fontFamily: 'var(--font-ui)', fontSize: 13, width: 240 }} />
          </div>
          <div className="settings-row">
            <div className="settings-label">
              <h4>Subscription Tier</h4>
              <p>Current plan active for this workspace</p>
            </div>
            <span style={{ background: 'var(--bg-dark)', color: '#fff', padding: '4px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>Premium</span>
          </div>
          <div className="settings-row">
            <div className="settings-label">
              <h4>Default Jurisdiction</h4>
              <p>Set as the default for new case intakes</p>
            </div>
            <select style={{ padding: '8px 12px', border: '1px solid var(--border-light)', borderRadius: 4, fontFamily: 'var(--font-ui)', fontSize: 13 }}>
              <option>D. Delaware</option>
              <option>N.D. California</option>
              <option>W.D. Texas</option>
              <option>Federal Circuit</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-section-title">AI Preferences</div>
          {[
            { key: 'aiSuggestions', label: 'AI Case Suggestions', desc: 'Enable real-time AI recommendations in the Reference Panel' },
            { key: 'vectorGraph', label: 'Vector Semantic Graph', desc: 'Show semantic similarity graph in the reference panel' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="settings-row">
              <div className="settings-label">
                <h4>{label}</h4>
                <p>{desc}</p>
              </div>
              <div className={`toggle ${toggles[key] ? '' : 'off'}`} onClick={() => toggle(key)} />
            </div>
          ))}
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Notifications</div>
          {[
            { key: 'emailDigest', label: 'Weekly Email Summary', desc: 'Receive a digest of case updates and new precedents' },
            { key: 'autoSave', label: 'Auto-save Strategies', desc: 'Automatically save AI-generated defense strategies' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="settings-row">
              <div className="settings-label">
                <h4>{label}</h4>
                <p>{desc}</p>
              </div>
              <div className={`toggle ${toggles[key] ? '' : 'off'}`} onClick={() => toggle(key)} />
            </div>
          ))}
        </div>

        <div className="settings-section">
          <div className="settings-section-title">Security</div>
          <div className="settings-row">
            <div className="settings-label">
              <h4>Two-Factor Authentication</h4>
              <p>Require 2FA for all logins to this workspace</p>
            </div>
            <div className={`toggle ${toggles.twoFactor ? '' : 'off'}`} onClick={() => toggle('twoFactor')} />
          </div>
          <div className="settings-row">
            <div className="settings-label">
              <h4>Change Password</h4>
              <p>Update your account credentials</p>
            </div>
            <button className="btn-sm-outline">Update Password</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button className="btn-sm-outline" style={{ padding: '10px 24px' }}>Discard</button>
          <button className="btn-sm-dark" style={{ padding: '10px 24px' }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
