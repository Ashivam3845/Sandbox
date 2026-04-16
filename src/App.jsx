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

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
        
        <Route path="/" element={
          <ProtectedRoute userRole={userRole}>
            <RootLayout userRole={userRole} onLogout={handleLogout} />
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
