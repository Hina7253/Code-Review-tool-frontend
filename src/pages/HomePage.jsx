import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const BACKEND_URL = 'http://localhost:8080/api';

function HomePage({ onLogout }) {
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPdfBtn, setShowPdfBtn] = useState(false);
  const [analysisType, setAnalysisType] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert('Please enter some code first!');
      return;
    }

    setLoading(true);
    setResults(null);
    setMetrics(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BACKEND_URL}/analyze`, 
        { code },
        { headers: { 'Authorization': `Bearer ${token}` }}
      );

      setResults(response.data);
      setAnalysisType('issues');
      setShowPdfBtn(true);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const showMetrics = async () => {
    if (!code.trim()) {
      alert('Please enter some code first!');
      return;
    }

    setLoading(true);
    setResults(null);
    setMetrics(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BACKEND_URL}/metrics`,
        { code },
        { headers: { 'Authorization': `Bearer ${token}` }}
      );

      setMetrics(response.data);
      setAnalysisType('metrics');
      setShowPdfBtn(true);
    } catch (error) {
      console.error('Metrics error:', error);
      alert('Metrics calculation failed. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setCode('');
    setResults(null);
    setMetrics(null);
    setShowPdfBtn(false);
    setAnalysisType(null);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(102, 126, 234);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('☕ Java Code Review Report', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 30, { align: 'center' });

    let yPos = 50;
    doc.setTextColor(0, 0, 0);

    if (analysisType === 'metrics' && metrics) {
      doc.setFontSize(16);
      doc.text('📊 Code Metrics Summary', 20, yPos);
      yPos += 15;

      doc.setFontSize(11);
      doc.text(`Total Lines: ${metrics.totalLines || 0}`, 25, yPos);
      yPos += 8;
      doc.text(`Code Lines: ${metrics.codeLines || 0}`, 25, yPos);
      yPos += 8;
      doc.text(`Classes: ${metrics.classCount || 0}`, 25, yPos);
      yPos += 8;
      doc.text(`Methods: ${metrics.methodCount || 0}`, 25, yPos);
      yPos += 8;
      doc.text(`Quality Score: ${metrics.qualityScore || 0}/100`, 25, yPos);
      yPos += 8;
      doc.text(`Grade: ${metrics.qualityGrade || 'N/A'}`, 25, yPos);
    }

    const fileName = `code-review-${Date.now()}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>☕ Java Code Analyzer Pro</h1>
        <p>AI-Powered Static Code Analysis • Real-Time Feedback</p>
        
        {user && (
          <div className="header-actions">
            <span className="user-info">👤 {user.username}</span>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="content">
        {/* Code Input Section */}
        <div className="section">
          <div className="section-title">
            <span>📝</span>
            <span>Source Code Editor</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your Java code here...

public class Example {
    public void riskyMethod() {
        String value = null;
        System.out.println(value.length());
    }
}"
          />
          <div className="button-group">
            <button className="analyze-btn" onClick={analyzeCode} disabled={loading}>
              <span style={{ position: 'relative', zIndex: 1 }}>
                {loading ? '⏳ Analyzing...' : '🔍 Analyze Code'}
              </span>
            </button>
            <button 
              className="analyze-btn" 
              onClick={showMetrics} 
              disabled={loading}
              style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                {loading ? '⏳ Calculating...' : '📊 Show Metrics'}
              </span>
            </button>
            <button className="clear-btn" onClick={clearAll}>
              <span style={{ position: 'relative', zIndex: 1 }}>🗑️ Clear All</span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="section">
          <div className="section-title">
            <span>📊</span>
            <span>Analysis Results</span>
          </div>
          <div className="results-container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
                <div className="spinner"></div>
                <p>Analyzing your code...</p>
              </div>
            ) : results ? (
              <div>
                {/* Display Issues */}
                {results.critical && results.critical.length > 0 && (
                  <div className="issue-category">
                    <div className="category-header critical">🔴 Critical Issues</div>
                    {results.critical.map((issue, idx) => (
                      <div className="issue-item" key={idx}>
                        <div className="issue-line">Line {issue.lineNumber || 'N/A'}</div>
                        <div className="issue-description">{issue.description}</div>
                        <div className="issue-suggestion">💡 {issue.suggestion}</div>
                      </div>
                    ))}
                  </div>
                )}
                {results.warning && results.warning.length > 0 && (
                  <div className="issue-category">
                    <div className="category-header warning">⚠️ Warnings</div>
                    {results.warning.map((issue, idx) => (
                      <div className="issue-item" key={idx}>
                        <div className="issue-line">Line {issue.lineNumber || 'N/A'}</div>
                        <div className="issue-description">{issue.description}</div>
                        <div className="issue-suggestion">💡 {issue.suggestion}</div>
                      </div>
                    ))}
                  </div>
                )}
                {results.info && results.info.length > 0 && (
                  <div className="issue-category">
                    <div className="category-header info">ℹ️ Suggestions</div>
                    {results.info.map((issue, idx) => (
                      <div className="issue-item" key={idx}>
                        <div className="issue-line">Line {issue.lineNumber || 'N/A'}</div>
                        <div className="issue-description">{issue.description}</div>
                        <div className="issue-suggestion">💡 {issue.suggestion}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : metrics ? (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <h3 style={{ color: '#e2e8f0', fontSize: '1.5em', marginBottom: '5px' }}>
                    📊 Code Metrics Dashboard
                  </h3>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{ 
                    background: 'rgba(30, 41, 59, 0.6)', 
                    padding: '20px', 
                    borderRadius: '15px',
                    border: '2px solid rgba(120, 119, 198, 0.3)'
                  }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.9em', marginBottom: '10px' }}>
                      📄 TOTAL LINES
                    </div>
                    <div style={{ 
                      fontSize: '2.5em', 
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {metrics.totalLines || 0}
                    </div>
                  </div>
                  
                  <div style={{ 
                    background: 'rgba(30, 41, 59, 0.6)', 
                    padding: '20px', 
                    borderRadius: '15px',
                    border: '2px solid rgba(120, 119, 198, 0.3)'
                  }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.9em', marginBottom: '10px' }}>
                      🏗️ CLASSES
                    </div>
                    <div style={{ 
                      fontSize: '2.5em', 
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {metrics.classCount || 0}
                    </div>
                  </div>

                  <div style={{ 
                    background: 'rgba(30, 41, 59, 0.6)', 
                    padding: '20px', 
                    borderRadius: '15px',
                    border: '2px solid rgba(120, 119, 198, 0.3)'
                  }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.9em', marginBottom: '10px' }}>
                      ⚙️ METHODS
                    </div>
                    <div style={{ 
                      fontSize: '2.5em', 
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {metrics.methodCount || 0}
                    </div>
                  </div>

                  <div style={{ 
                    background: 'rgba(30, 41, 59, 0.6)', 
                    padding: '20px', 
                    borderRadius: '15px',
                    border: '2px solid rgba(120, 119, 198, 0.3)'
                  }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.9em', marginBottom: '10px' }}>
                      🎯 QUALITY SCORE
                    </div>
                    <div style={{ 
                      fontSize: '2.5em', 
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {metrics.qualityScore || 0}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.9em', marginTop: '5px' }}>
                      Grade: {metrics.qualityGrade || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="icon">🔍</div>
                <p style={{ fontSize: '1.1em', fontWeight: 600, marginBottom: '10px' }}>
                  Ready to Analyze
                </p>
                <p>Enter your Java code and click "Analyze Code" to start</p>
              </div>
            )}
          </div>

          {results && (
            <div className="stats">
              <div className="stat-box">
                <div className="stat-number">{results.critical?.length || 0}</div>
                <div className="stat-label">Critical</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{results.warning?.length || 0}</div>
                <div className="stat-label">Warnings</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{results.info?.length || 0}</div>
                <div className="stat-label">Suggestions</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{results.totalIssues || 0}</div>
                <div className="stat-label">Total Issues</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPdfBtn && (
        <button className="download-pdf-btn" onClick={downloadPDF}>
          📥 Download PDF Report
        </button>
      )}
    </div>
  );
}

export default HomePage;