import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, ArrowRight, X } from 'lucide-react';
import './Pages.css';

export default function NewCasePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [caseData, setCaseData] = useState({
    title: '',
    jurisdiction: 'Select Court...',
    domain: 'Select Domain...',
    role: 'Defendant',
    filingDate: '',
    summary: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = () => {
    // In a real application, submit caseData and uploadedFiles here!
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCaseData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>New Case</h1>
        <p>Intake a new matter and let Sovereign Counsel build your initial analysis.</p>
      </div>

      <div style={{ maxWidth: 720 }}>
        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {['Case Details', 'Documents', 'Review'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: step > i ? 'var(--bg-dark)' : step === i + 1 ? 'var(--bg-dark)' : 'var(--border-light)',
                color: step >= i + 1 ? '#fff' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700
              }}>{i + 1}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: step === i + 1 ? 'var(--text-main)' : 'var(--text-muted)' }}>{s}</span>
              {i < 2 && <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="settings-section">
            <div className="settings-section-title">Case Information</div>
            <div style={{ padding: '24px' }}>
              <div className="form-group">
                <label>Case Title *</label>
                <input 
                  name="title"
                  value={caseData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., TechCorp v. InnovateCo — Patent Dispute 2024" 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Jurisdiction</label>
                  <select name="jurisdiction" value={caseData.jurisdiction} onChange={handleInputChange}>
                    <option>Select Court...</option>
                    <option>N.D. California</option>
                    <option>D. Delaware</option>
                    <option>W.D. Texas</option>
                    <option>Federal Circuit</option>
                    <option>S.D. New York</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Technology Domain</label>
                  <select name="domain" value={caseData.domain} onChange={handleInputChange}>
                    <option>Select Domain...</option>
                    <option>Wireless Charging</option>
                    <option>Semiconductor</option>
                    <option>Software / AI</option>
                    <option>Biotech</option>
                    <option>Telecommunications</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Client Role</label>
                  <select name="role" value={caseData.role} onChange={handleInputChange}>
                    <option>Defendant</option>
                    <option>Plaintiff</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Filing Date</label>
                  <input 
                    type="date" 
                    name="filingDate"
                    value={caseData.filingDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Case Summary</label>
                <textarea 
                  name="summary"
                  value={caseData.summary}
                  onChange={handleInputChange}
                  placeholder="Briefly describe the core dispute, key claims, and any known prior art..." 
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="settings-section">
            <div className="settings-section-title">Upload Case Documents</div>
            <div style={{ padding: '24px' }}>
              <label className="upload-zone" style={{ display: 'block' }}>
                <input type="file" multiple style={{ display: 'none' }} onChange={handleFileUpload} />
                <UploadCloud size={40} style={{ margin: '0 auto 16px', display: 'block', color: 'var(--text-muted)' }} />
                <h4>Drag & drop files here or click to browse</h4>
                <p>Supports PDF, DOCX, TXT — up to 50 MB per file</p>
              </label>

              {uploadedFiles.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <h4 style={{ fontSize: 13, marginBottom: 12 }}>Uploaded Files</h4>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <FileText size={16} style={{ color: 'var(--accent-green)' }} />
                        <span style={{ fontSize: 13, color: 'var(--text-main)' }}>{file.name}</span>
                      </div>
                      <X size={16} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => removeFile(idx)} />
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontSize: 13, marginBottom: 12 }}>Suggested Document Types</h4>
                {['Patent Application / Brief', 'Prior Art References', 'Claim Charts', 'Expert Testimony'].map(doc => (
                  <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                    <FileText size={16} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: 13 }}>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="settings-section">
            <div className="settings-section-title">Review & Submit</div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
                Sovereign Counsel will analyze all inputs and generate an initial case strategy report. This may take 30–90 seconds depending on document size.
              </p>
              {[
                { label: 'Case Title', value: caseData.title || 'None specified' },
                { label: 'Jurisdiction', value: caseData.jurisdiction !== 'Select Court...' ? caseData.jurisdiction : 'None specified' },
                { label: 'Domain', value: caseData.domain !== 'Select Domain...' ? caseData.domain : 'None specified' },
                { label: 'Role', value: caseData.role },
                { label: 'Filing Date', value: caseData.filingDate || 'None specified' },
                { label: 'Documents Uploaded', value: `${uploadedFiles.length} file(s)` },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-submit-row">
          {step > 1 && (
            <button className="btn-sm-outline" onClick={() => setStep(s => s - 1)} style={{ padding: '10px 24px' }}>
              Back
            </button>
          )}
          {step < 3 && (
            <button className="btn-sm-dark" onClick={() => setStep(s => s + 1)} style={{ padding: '10px 24px' }}>
              Continue
            </button>
          )}
          {step === 3 && (
            <button className="btn-sm-dark" style={{ padding: '10px 24px', background: 'var(--accent-green)' }} onClick={handleSubmit}>
              Submit for Analysis
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
