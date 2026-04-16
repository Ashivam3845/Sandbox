import React, { useState } from 'react';
import MainDashboard from '../components/MainDashboard';
import ReferencePanel from '../components/ReferencePanel';
import { breachDataset } from '../data/mockAnalysisData';

export default function DashboardPage() {
  const [currentAnalysis, setCurrentAnalysis] = useState(breachDataset);

  return (
    <div className="DashboardGrid">
      <MainDashboard currentAnalysis={currentAnalysis} setCurrentAnalysis={setCurrentAnalysis} />
      <ReferencePanel currentAnalysis={currentAnalysis} />
    </div>
  );
}
