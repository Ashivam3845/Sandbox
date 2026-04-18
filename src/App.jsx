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
import { breachDataset, patentDataset } from './data/mockAnalysisData.jsx';
import { INITIAL_STRATEGIES } from './data/mockStrategiesData';

// Build a synthetic analysis dataset for cases that don't have a full dataset
function buildSyntheticDataset(c) {
  return {
    id: c.id,
    banner: {
      title: c.title,
      location: c.court,
      date: c.date,
      type: c.verdict !== 'Pending' ? 'Patent Litigation' : 'Active Dispute'
    },
    stats: {
      strength: `${c.confidence}%`,
      risk: c.confidence >= 80 ? 'High' : c.confidence >= 65 ? 'Medium' : 'Low',
      confidence: `${c.confidence}%`,
      range: c.confidence >= 80 ? '$3.0M - $6.5M' : '$0.5M - $2.0M',
      summary: c.ratioDecidendi || c.matchReason || 'Case context is being loaded from the Judion intelligence engine.'
    },
    views: {
      plaintiff: <p>{c.ratioDecidendi || 'Plaintiff analysis pending — full case brief not loaded.'}</p>,
      defendant:  <p>{c.infringementRisk || 'Defendant analysis pending.'}</p>,
      neutral:    <p>{c.defenseStrategy || 'Neutral assessment pending for this matter.'}</p>
    },
    references: [
      {
        title: `${c.title} — Primary Reference`,
        year: c.date ? c.date.slice(-4) : '2024',
        match: `${c.confidence}%`,
        desc: c.matchReason || 'Direct precedent match from the Judion intelligence engine.',
        caseDetails: c.ratioDecidendi || 'Detailed case brief not available.',
        plaintiffRemarks: 'Aligned with plaintiff legal theory in relevant jurisdiction.',
        defendantRemarks: 'Defense must distinguish on technical and procedural facts.',
        finalVerdict: c.verdict
      }
    ],
    facts: [
      { title: 'Jurisdiction Match', match: `${c.confidence}%` },
      { title: 'Claim Overlap', match: `${Math.max(50, c.confidence - 10)}%` }
    ],
    legal: [
      { title: '35 U.S.C. § 271(a)', desc: 'Standard infringement framework applicable to this matter.' }
    ],
    depth: { scanned: '1,200', verified: '42', jurisdictions: '1' },
    activeStrategy: null
  };
}

// Pull the full rich mockData details per ID
const mockDataDetails = {
  1: {
    ratioDecidendi: 'The court determined that the defendant\'s continuous energy transfer method constituted direct infringement of the \'915 patent. Specifically, the inclusion of an intermediary magnetic resonance coupling apparatus did not exempt the system from the original claim scope, focusing on the result achieved rather than structural variance.',
    infringementRisk: 'Opposing counsel is likely to argue that our secondary coil configuration functions identically to the infringing devices in Apple v. Samsung. They will focus on the court\'s broad interpretation of "continuous inductive field", applying the doctrine of equivalents to capture our revised layout.',
    defenseStrategy: 'We must distinguish our shielding methodology from the prior art referenced in the Apple verdict. By citing the modified magnetic flux paths in our latest iteration (see Claim 7), we can argue structural uniqueness. Furthermore, we should emphasize US Patent 6,112,014 as an exclusionary prior art not considered in this earlier ruling.',
    matchReason: 'High match on Claim 4 language and inductive charging constraints.'
  },
  2: {
    ratioDecidendi: 'The patents asserted by WiTricity were invalidated under 35 U.S.C. § 101, as the claims were directed toward the natural phenomenon of electromagnetic resonance without adding an inventive concept sufficient to transform the nature of the claim into a patent-eligible application.',
    infringementRisk: 'While the patent was invalidated, plaintiff may use the geometric claim limits established here to argue that our device falls into a pre-existing patentable category if re-examined based on different physical parameters.',
    defenseStrategy: 'Rely heavily on this precedent for an invalidity counter-claim. If their patent rests on standard resonance frequencies (10-15 MHz), we can use the WiTricity ruling to invalidate their claims outright.',
    matchReason: 'Similar technology domain (inductive EV charging) but different scale.'
  },
  3: {
    ratioDecidendi: 'The court found no infringement because the defendant\'s system operated via directed RF energy transmission, which fell outside the literal scope of the plaintiff\'s claims requiring "near-field magnetic coupling."',
    infringementRisk: 'Minor risk. Opposing counsel might attempt to blur the lines between near-field and far-field definitions established in this case, but the technical divergence is significant.',
    defenseStrategy: 'If they attempt to interpret "proximity" broadly, use the Powercast decision to firmly delineate the technical boundaries of RF versus inductive paradigms, keeping our product well within the safe harbor.',
    matchReason: 'RF-based wireless charging, differs from our inductive scope.'
  },
  4: {
    ratioDecidendi: 'Patent claims pertaining to wireless data transmission via frequency-division multiplexing were held to be non-obvious over prior art under 35 U.S.C. § 103 given the specific combination of encoding standards. Case is pending final ruling.',
    infringementRisk: 'High risk that opposing counsel will leverage the broad claim drafting language to encompass our OFDM implementation without adequate claim construction narrowing.',
    defenseStrategy: 'Pursue an aggressive Markman hearing strategy to narrow "wireless transmission" to exclude OFDM-based protocols which have independent patent lineage. File an IPR based on 3GPP Release 8 documentation as primary prior art.',
    matchReason: 'Wireless patent dispute with overlapping claim scope in frequency management.'
  },
  5: {
    ratioDecidendi: 'The Federal Circuit is reviewing claim 12 of the Spectrum Labs patent relating to dynamic spectrum allocation. The appeal centers on whether the PTAB applied the correct obviousness standard under KSR.',
    infringementRisk: 'If Spectrum Labs prevails on appeal, the broadened claim scope could encompass our dynamic channel allocation methodology. Medium to high risk depending on how the Federal Circuit construes the claim terms.',
    defenseStrategy: 'File amicus brief supporting the narrower claim construction. Simultaneously prepare an IPR petition targeting the base claim for invalidity on grounds of anticipation by DynaTech\'s own 2019 whitepaper.',
    matchReason: 'Federal Circuit appeal, overlapping spectrum allocation technology domain.'
  }
};

// Build INITIAL_CASES with datasetContext attached to every case
const INITIAL_CASES = [
  { id: 1, title: 'Apple Inc. v. Samsung Electronics Co.', court: 'N.D. California', date: 'Dec 14, 2012', verdict: 'Infringement Found', status: 'active', confidence: 85 },
  { id: 2, title: 'WiTricity Corp. v. Momentum Dynamics', court: 'D. Delaware', date: 'Apr 03, 2019', verdict: 'Patent Invalidated', status: 'closed', confidence: 72 },
  { id: 3, title: 'Energous Corp. v. Powercast Corp.', court: 'W.D. Texas', date: 'Aug 21, 2021', verdict: 'No Infringement', status: 'closed', confidence: 64 },
  { id: 4, title: 'TechCorp v. InnovateCo — Wireless Patent', court: 'D. Delaware', date: 'Jan 08, 2024', verdict: 'Pending', status: 'active', confidence: 90 },
  { id: 5, title: 'Spectrum Labs v. DynaTech International', court: 'Federal Circuit', date: 'Mar 15, 2023', verdict: 'Appeal Filed', status: 'active', confidence: 77 }
].map(c => ({
  ...c,
  datasetContext: buildSyntheticDataset({ ...c, ...mockDataDetails[c.id] })
}));

// Protected route wrapper
function ProtectedRoute({ userRole, children }) {
  if (!userRole) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ userRole, children }) {
  if (userRole !== 'admin') return <Navigate to="/" replace />;
  return children;
}

function App() {
  const [userRole, setUserRole] = useState(null);
  const [globalCases, setGlobalCases] = useState(INITIAL_CASES);
  const [activeAnalysis, setActiveAnalysis] = useState(breachDataset);
  const [globalStrategies, setGlobalStrategies] = useState(INITIAL_STRATEGIES);

  const handleLogout = () => setUserRole(null);

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
