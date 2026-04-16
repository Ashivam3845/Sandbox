import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import CaseCard from './CaseCard';
import './Sidebar.css';

export default function Sidebar({ cases, activeCaseId, onSelectCase }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="Sidebar">
      <div className="sidebar-header">
        <h2 className="brand-title">Precedent Retrieval</h2>
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search rulings, keywords..." 
            className="search-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters-container">
          <select className="filter-dropdown">
            <option>All Courts</option>
            <option>N.D. California</option>
            <option>D. Delaware</option>
            <option>W.D. Texas</option>
            <option>Federal Circuit</option>
          </select>
          <select className="filter-dropdown">
            <option>Any Year</option>
            <option>Last 5 Years</option>
            <option>Last 10 Years</option>
          </select>
        </div>
      </div>
      
      <div className="case-list">
        {cases.map(c => (
          <CaseCard 
            key={c.id} 
            data={c} 
            isActive={c.id === activeCaseId} 
            onClick={() => onSelectCase(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
