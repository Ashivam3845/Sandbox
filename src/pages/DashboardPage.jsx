import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import MainDashboard from '../components/MainDashboard';
import ReferencePanel from '../components/ReferencePanel';

export default function DashboardPage() {
  const { activeAnalysis } = useOutletContext();
  const [currentAnalysis, setCurrentAnalysis] = useState(activeAnalysis);

  useEffect(() => {
    // If global activeAnalysis updates, sync the local state representation.
    setCurrentAnalysis(activeAnalysis); 
  }, [activeAnalysis]);

  return (
    <div className="DashboardGrid">
      <MainDashboard currentAnalysis={currentAnalysis} setCurrentAnalysis={setCurrentAnalysis} />
      <ReferencePanel currentAnalysis={currentAnalysis} />
    </div>
  );
}
