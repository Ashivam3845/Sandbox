import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import './Pages.css';

const researchItems = [
  { id: 1, title: 'Alice Corp. v. CLS Bank International', citation: '573 U.S. 208 (2014)', summary: 'Established the two-step framework for software/patent eligibility under § 101. Frequently cited in AI and software patent challenges.', tags: ['§ 101', 'Software', 'Supreme Court'], relevance: 92 },
  { id: 2, title: 'Phillips v. AWH Corp.', citation: '415 F.3d 1303 (Fed. Cir. 2005)', summary: 'Defined the hierarchy of evidence in patent claim construction: intrinsic evidence (claims, specification, prosecution history) prevails over extrinsic sources.', tags: ['Claim Construction', 'Federal Circuit'], relevance: 88 },
  { id: 3, title: 'KSR International Co. v. Teleflex Inc.', citation: '550 U.S. 398 (2007)', summary: 'Expanded the standard for obviousness in patent prosecution beyond rigid "TSM" test, allowing courts to use common-sense reasoning.', tags: ['Obviousness', '§ 103', 'Supreme Court'], relevance: 81 },
  { id: 4, title: 'Markman v. Westview Instruments', citation: '517 U.S. 370 (1996)', summary: 'Established that claim construction is a question of law for judges, not fact for juries. Foundation of the "Markman Hearing" procedure.', tags: ['Claim Construction', 'Markman Hearing'], relevance: 79 },
  { id: 5, title: 'eBay Inc. v. MercExchange, LLC', citation: '547 U.S. 388 (2006)', summary: 'Patent holders must satisfy the traditional four-factor test for permanent injunctive relief; no automatic injunctions for patent wins.', tags: ['Injunction', 'Remedies', 'Supreme Court'], relevance: 74 },
];

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const filtered = researchItems.filter(r =>
    !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Research</h1>
        <p>Explore the Sovereign Counsel legal database for relevant statutes, rulings and citations.</p>
      </div>

      <div className="search-bar-large">
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            placeholder="Search cases, statutes, codes (e.g. UCC 2-204, § 101, Markman...)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ paddingLeft: 44 }}
          />
        </div>
        <button className="btn-sm-dark" style={{ padding: '14px 24px' }}>Search</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map(r => (
          <div key={r.id} className="page-card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  {r.tags.map(t => <span key={t} className="card-tag tag-saved">{t}</span>)}
                </div>
                <h3>{r.title}</h3>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{r.citation}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', fontWeight: 700 }}>Relevance</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: r.relevance > 85 ? 'var(--accent-green)' : 'var(--text-main)' }}>{r.relevance}%</div>
              </div>
            </div>
            <p className="text-sm" style={{ lineHeight: 1.6 }}>{r.summary}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <button className="btn-sm-dark">Add to Case</button>
              <button className="btn-sm-outline" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                View Full <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
