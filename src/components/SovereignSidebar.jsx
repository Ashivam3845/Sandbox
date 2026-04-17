import React from 'react';
import { NavLink } from 'react-router-dom';
import { Plus, History, Bookmark, Settings, UserCircle, Database, LayoutDashboard, FilePlus, Activity, Map, LogOut, ChevronLeft, ChevronRight, Scale } from 'lucide-react';
import './SovereignSidebar.css';

export default function SovereignSidebar({ userRole, onLogout }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className={`SovereignSidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <div className="sidebar-header-row">
          <NavLink to="/" className="sidebar-brand-link">
            <div className="sidebar-brand">
              <svg width="32" height="32" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px', color: 'var(--judion-brown)'}}>
                {/* Top horizontal bar */}
                <rect x="15" y="20" width="70" height="6" fill="currentColor" />
                {/* Three vertical pillars */}
                <rect x="30" y="26" width="8" height="74" fill="currentColor" />
                <rect x="46" y="26" width="8" height="74" fill="currentColor" />
                <rect x="62" y="26" width="8" height="74" fill="currentColor" />
                {/* Bottom J Hook Base */}
                <rect x="15" y="94" width="23" height="6" fill="currentColor" />
                {/* Bottom J Hook Ascender */}
                <rect x="15" y="74" width="6" height="26" fill="currentColor" />
              </svg>
            <div>
              {!isCollapsed && <h1 style={{color: 'var(--text-main)', fontSize: '18px'}}>Judion</h1>}
            </div>
          </div>
          </NavLink>
          <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <NavLink to="/new-case" className="new-case-btn" title="New Case">
          <Plus size={16} /> {!isCollapsed && <span>New Case</span>}
        </NavLink>

        <nav className="sidebar-nav">
          <NavLink to="/history" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} title="Case History">
            <History size={18} /> {!isCollapsed && <span>Case History</span>}
          </NavLink>
          <NavLink to="/strategies" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} title="Saved Strategies">
            <Bookmark size={18} /> {!isCollapsed && <span>Saved Strategies</span>}
          </NavLink>
          <NavLink to="/simulator" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} title="Court Simulator">
            <Scale size={18} /> {!isCollapsed && <span>Court Simulator</span>}
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} title="Settings">
            <Settings size={18} /> {!isCollapsed && <span>Settings</span>}
          </NavLink>
          {userRole === 'admin' && (
            <NavLink to="/admin" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`} title="Admin Panel">
              <Database size={18} /> {!isCollapsed && <span>Admin Panel</span>}
            </NavLink>
          )}
        </nav>
      </div>

      <div className="sidebar-bottom p-4 border-t border-light mt-auto">
        <div className="user-profile flex items-center justify-between">
          <NavLink to="/profile" className="flex items-center gap-3" style={{ textDecoration: 'none', flex: 1, minWidth: 0, justifyContent: isCollapsed ? 'center' : 'flex-start' }} title="Profile">
            <UserCircle size={36} style={{ color: 'var(--judion-brown)' }} className="avatar" />
            {!isCollapsed && (
              <div className="user-info flex flex-col" style={{ overflow: 'hidden' }}>
                <span className="user-name text-sm font-bold text-main" style={{ color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {userRole === 'admin' ? 'Administrator' : 'Judion User'}
                </span>
                <span className="user-tier text-xs" style={{ color: 'var(--judion-gold)' }}>Profile Settings</span>
              </div>
            )}
          </NavLink>
          {!isCollapsed && (
          <button 
             onClick={onLogout} 
             title="Secure Logout"
             style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--judion-slate)' }}
             onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-red)'}
             onMouseLeave={(e) => e.currentTarget.style.color = 'var(--judion-slate)'}
          >
            <LogOut size={20} />
          </button>
          )}
        </div>
      </div>
    </div>
  );
}
