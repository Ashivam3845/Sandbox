import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import DashboardPage from './pages/DashboardPage';
import NewCasePage from './pages/NewCasePage';
import CaseHistoryPage from './pages/CaseHistoryPage';
import SavedStrategiesPage from './pages/SavedStrategiesPage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ResearchPage from './pages/ResearchPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import SimulatorPage from './pages/SimulatorPage';
import { breachDataset } from './data/mockAnalysisData';
import { INITIAL_STRATEGIES } from './data/mockStrategiesData';

const INITIAL_CASES = [
  { id: 1, title: 'Apple Inc. v. Samsung Electronics Co.', court: 'N.D. California', date: 'Dec 14, 2012', verdict: 'Infringement Found', status: 'active', confidence: 85 },
  { id: 2, title: 'WiTricity Corp. v. Momentum Dynamics', court: 'D. Delaware', date: 'Apr 03, 2019', verdict: 'Patent Invalidated', status: 'closed', confidence: 72 },
  { id: 3, title: 'Energous Corp. v. Powercast Corp.', court: 'W.D. Texas', date: 'Aug 21, 2021', verdict: 'No Infringement', status: 'closed', confidence: 64 },
  { id: 4, title: 'TechCorp v. InnovateCo — Wireless Patent', court: 'D. Delaware', date: 'Jan 08, 2024', verdict: 'Pending', status: 'active', confidence: 90 },
  { id: 5, title: 'Spectrum Labs v. DynaTech International', court: 'Federal Circuit', date: 'Mar 15, 2023', verdict: 'Appeal Filed', status: 'active', confidence: 77 }
];

// Simple protected route wrapper
function ProtectedRoute({ userRole, children }) {
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Admin-only wrapper
function AdminRoute({ userRole, children }) {
  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  const [userRole, setUserRole] = useState(null);
  const [globalCases, setGlobalCases] = useState(INITIAL_CASES);
  const [activeAnalysis, setActiveAnalysis] = useState(breachDataset);
  const [globalStrategies, setGlobalStrategies] = useState(INITIAL_STRATEGIES);

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
        
        <Route path="/" element={
          <ProtectedRoute userRole={userRole}>
            <RootLayout 
               userRole={userRole} 
               onLogout={handleLogout}
               cases={globalCases}
               setCases={setGlobalCases}
               activeAnalysis={activeAnalysis}
               setActiveAnalysis={setActiveAnalysis}
               strategies={globalStrategies}
               setStrategies={setGlobalStrategies}
            />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="new-case" element={<NewCasePage />} />
          <Route path="history" element={<CaseHistoryPage />} />
          <Route path="strategies" element={<SavedStrategiesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage userRole={userRole} />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="admin" element={
            <AdminRoute userRole={userRole}>
              <AdminPage />
            </AdminRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
