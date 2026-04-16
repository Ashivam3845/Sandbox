import React from 'react';
import { NavLink } from 'react-router-dom';
import { Plus, History, Bookmark, Settings, UserCircle, Database, LayoutDashboard, FilePlus, Activity, Map, LogOut } from 'lucide-react';
import './SovereignSidebar.css';

export default function SovereignSidebar({ userRole, onLogout }) {
  return (
    <div className="SovereignSidebar">
      <div className="sidebar-top">
        <NavLink to="/" className="sidebar-brand-link">
          <div className="sidebar-brand">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px', color: 'var(--judion-brown)'}}>
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
            <div>
              <h1 style={{color: 'var(--text-main)', fontSize: '18px'}}>Judion</h1>
            </div>
          </div>
        </NavLink>

        <NavLink to="/new-case" className="new-case-btn">
          <Plus size={16} /> New Case
        </NavLink>

        <nav className="sidebar-nav">
          <NavLink to="/history" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <History size={18} /> Case History
          </NavLink>
          <NavLink to="/strategies" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <Bookmark size={18} /> Saved Strategies
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <Settings size={18} /> Settings
          </NavLink>
          {userRole === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Database size={18} /> Admin Panel
            </NavLink>
          )}
        </nav>
      </div>

      <div className="sidebar-bottom p-4 border-t border-light mt-auto">
        <div className="user-profile flex items-center justify-between">
          <NavLink to="/profile" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <UserCircle size={36} style={{ color: 'var(--judion-brown)' }} className="avatar" />
            <div className="user-info flex flex-col">
              <span className="user-name text-sm font-bold text-main" style={{ color: 'var(--text-main)' }}>
                {userRole === 'admin' ? 'Administrator' : 'Judion User'}
              </span>
              <span className="user-tier text-xs" style={{ color: 'var(--judion-gold)' }}>Profile Settings</span>
            </div>
          </NavLink>
          <button 
             onClick={onLogout} 
             title="Secure Logout"
             style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--judion-slate)' }}
             onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
             onMouseLeave={(e) => e.currentTarget.style.color = 'var(--judion-slate)'}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
