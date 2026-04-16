import React from 'react';
import { Outlet } from 'react-router-dom';
import SovereignSidebar from '../components/SovereignSidebar';
import './RootLayout.css';

export default function RootLayout({ userRole, onLogout }) {
  return (
    <div className="RootLayout">
      <SovereignSidebar userRole={userRole} onLogout={onLogout} />
      <div className="page-outlet">
        <Outlet />
      </div>
    </div>
  );
}
