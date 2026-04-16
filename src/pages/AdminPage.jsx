import React, { useState } from 'react';
import { Database, Users, ShieldAlert, Cpu, RefreshCw, Activity } from 'lucide-react';
import './AdminPage.css';
import './Pages.css';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('data');
  const [notification, setNotification] = useState("");

  const triggerAction = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  return (
    <div className="AdminPage page-container fade-in">
      {notification && (
        <div style={{
          position: 'fixed', top: 24, right: 48, background: 'var(--judion-brown)', color: 'var(--judion-gold)',
          padding: '12px 24px', borderRadius: '8px', zIndex: 1000, boxShadow: 'var(--shadow-md)',
          fontWeight: 'bold', fontSize: '14px', border: '1px solid var(--judion-gold)'
        }} className="animate-fade-in">
          {notification}
        </div>
      )}
      <div className="dash-header mb-8">
        <div>
          <h1 className="text-xl font-header tracking-tight">System Administration</h1>
          <p className="text-muted text-sm mt-1">Supervise Knowledge Bases, User Access, and Telemetry</p>
        </div>
        <div className="dash-actions" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '24px' }}>
          <div className="flex gap-2">
             <button className={activeTab === 'data' ? "btn-primary" : "btn-secondary"} onClick={() => setActiveTab('data')} style={activeTab === 'data' ? { background: 'var(--judion-brown)', color: 'var(--judion-gold)' } : {}}>
                <Database size={16}/> Data Models
             </button>
             <button className={activeTab === 'users' ? "btn-primary" : "btn-secondary"} onClick={() => setActiveTab('users')} style={activeTab === 'users' ? { background: 'var(--judion-brown)', color: 'var(--judion-gold)' } : {}}>
                <Users size={16}/> Personnel
             </button>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-secondary" onClick={() => triggerAction("Matrix topology synced successfully.")}>
              <RefreshCw size={14} /> Update Matrix
            </button>
            <button className="btn-secondary" onClick={() => triggerAction("Legal agents queued for training epoch.")}>
              <Cpu size={14} /> Train Agents
            </button>
            <button className="btn-primary" style={{ background: 'var(--judion-slate)', color: '#fff' }} onClick={() => triggerAction("Configuration payload saved.")}>
              <Activity size={14} /> System Config
            </button>
          </div>
        </div>
      </div>

      <div className="admin-grid">
        {activeTab === 'data' && (
          <div className="admin-panel card-border">
            <h2 className="panel-title flex items-center gap-2 mb-4"><Database size={18}/> Legal Paradigm Datasets</h2>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>DATASET ID</th>
                    <th>PARADIGM TYPE</th>
                    <th>NODE VOLUME</th>
                    <th>LAST SYNC</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>MOD-B902</code></td>
                    <td>Breach of Contract</td>
                    <td>2,847 nodes</td>
                    <td>Today, 08:00 AM</td>
                    <td><span className="status-badge sync">SYNCED</span></td>
                    <td className="actions-cell">
                      <button className="link-btn" onClick={() => triggerAction("Configuring MOD-B902")}>Configure</button> | 
                      <button className="link-btn" style={{color: 'var(--accent-red)'}} onClick={() => triggerAction("Suspended MOD-B902")}>Suspend</button>
                    </td>
                  </tr>
                  <tr>
                    <td><code>MOD-P144</code></td>
                    <td>Patent Infringement</td>
                    <td>5,102 nodes</td>
                    <td>Yesterday, 14:30 PM</td>
                    <td><span className="status-badge sync">SYNCED</span></td>
                    <td><button className="link-btn">Configure</button></td>
                  </tr>
                  <tr>
                    <td><code>MOD-M991</code></td>
                    <td>M&A Antitrust</td>
                    <td>1,211 nodes</td>
                    <td>Never</td>
                    <td><span className="status-badge error">OFFLINE</span></td>
                    <td><button className="link-btn">Diagnose</button></td>
                  </tr>
                  <tr>
                    <td><code>MOD-E300</code></td>
                    <td>Employment Law</td>
                    <td>8,401 nodes</td>
                    <td>Oct 10, 09:12 AM</td>
                    <td><span className="status-badge sync">SYNCED</span></td>
                    <td><button className="link-btn">Configure</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary" style={{fontSize: '12px', padding: '8px 16px', background: 'var(--judion-brown)', color: 'var(--judion-gold)'}} onClick={() => triggerAction("Data engine rebuilt operation executing...")}><Cpu size={14}/> Trigger Engine Rebuild</button>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-panel card-border">
            <h2 className="panel-title flex items-center gap-2 mb-4"><ShieldAlert size={18}/> Authorized Personnel</h2>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>USER EMAIL</th>
                    <th>ROLE</th>
                    <th>CLEARANCE</th>
                    <th>LAST LOGIN</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>admin@judion.com</td>
                    <td>System Admin</td>
                    <td><span className="status-badge sync">LEVEL 5</span></td>
                    <td>Active Now</td>
                    <td><button className="link-btn text-muted" disabled>Locked</button></td>
                  </tr>
                  <tr>
                    <td>partner_smith@judion.com</td>
                    <td>Senior Partner</td>
                    <td><span className="status-badge">LEVEL 4</span></td>
                    <td>2 hours ago</td>
                    <td><button className="link-btn" onClick={() => triggerAction("Access revoked for Senior Partner.")}>Revoke</button></td>
                  </tr>
                  <tr>
                    <td>associate_j@judion.com</td>
                    <td>Associate</td>
                    <td><span className="status-badge">LEVEL 2</span></td>
                    <td>1 day ago</td>
                    <td><button className="link-btn" onClick={() => triggerAction("Access revoked for Associate.")}>Revoke</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button className="btn-secondary" style={{fontSize: '12px', padding: '8px 16px'}} onClick={() => triggerAction("Provisioning wizard launched.")}><Users size={14}/> Provision New Operative</button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
