import React from 'react';
import { Outlet } from 'react-router-dom';
import SovereignSidebar from '../components/SovereignSidebar';
import FloatingChatbot from '../components/FloatingChatbot';
import './RootLayout.css';

export default function RootLayout({ userRole, onLogout, cases, setCases, activeAnalysis, setActiveAnalysis, strategies, setStrategies }) {
  return (
    <div className="RootLayout">
      <SovereignSidebar userRole={userRole} onLogout={onLogout} />
      <div className="page-outlet">
        <Outlet context={{ cases, setCases, activeAnalysis, setActiveAnalysis, strategies, setStrategies }} />
      </div>
      <FloatingChatbot activeAnalysis={activeAnalysis} />
    </div>
  );
}
