import React from 'react';

const MetricsDashboard = ({ data }) => {
  if (!data) {
    return (
      <div className="empty-state">
        <div className="icon">📊</div>
        <p style={{ fontSize: '1.1em', fontWeight: '600', marginBottom: '10px' }}>
          No Metrics Available
        </p>
        <p>Click "Show Metrics" to analyze your code quality</p>
      </div>
    );
  }

  const commentPercent = data.commentPercentage || 0;
  const scorePercent = data.qualityScore || 0;

  const getScoreMessage = (score) => {
    if (score >= 90) return "🌟 Excellent! Your code follows best practices.";
    if (score >= 80) return "✨ Great job! Minor improvements possible.";
    if (score >= 70) return "👍 Good code. Consider adding more comments.";
    if (score >= 60) return "⚠️ Decent code. Room for improvement.";
    return "🔧 Needs work. Focus on code quality and documentation.";
  };

  return (
    <div className="metrics-dashboard">
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3 style={{ color: '#e2e8f0', fontSize: '1.5em', marginBottom: '5px' }}>
          📊 Code Metrics Dashboard
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9em' }}>
          Comprehensive analysis of your code quality
        </p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">📄 Total Lines</div>
          <div className="metric-value">{data.totalLines || 0}</div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '100%' }}></div>
          </div>
          <div className="metric-subtext">
            Code: {data.codeLines || 0} | Comments: {data.commentLines || 0} | Blank: {data.blankLines || 0}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">🏗️ Structure</div>
          <div className="metric-value">{data.classCount || 0}</div>
          <div className="metric-subtext">Classes Found</div>
          <div className="progress-bar-container" style={{ marginTop: '10px' }}>
            <div className="progress-bar" style={{ width: `${Math.min(data.classCount * 20, 100)}%` }}></div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">⚙️ Methods</div>
          <div className="metric-value">{data.methodCount || 0}</div>
          <div className="metric-subtext">
            Public: {data.publicMethodCount || 0} | Private: {data.privateMethodCount || 0}
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${Math.min(data.methodCount * 5, 100)}%` }}></div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">💬 Documentation</div>
          <div className="metric-value">{commentPercent.toFixed(1)}%</div>
          <div className="metric-subtext">{data.commentLines || 0} comment lines</div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${Math.min(commentPercent * 3, 100)}%` }}></div>
          </div>
        </div>
      </div>

      <div className="quality-section">
        <h4 style={{ color: '#e2e8f0', fontSize: '1.3em', marginBottom: '15px' }}>
          🎯 Code Quality Score
        </h4>
        <div className="quality-score-circle" style={{ '--score-percent': `${scorePercent}%` }}>
          <div className="quality-score-inner">
            <div style={{ fontSize: '0.9em', color: '#94a3b8' }}>Score</div>
            <div style={{ color: '#667eea' }}>{scorePercent}</div>
            <div style={{ fontSize: '0.4em', color: '#94a3b8' }}>/100</div>
          </div>
        </div>
        <div className={`grade-badge grade-${data.qualityGrade || 'F'}`}>
          Grade: {data.qualityGrade || 'N/A'}
        </div>
        <p style={{ color: '#94a3b8', marginTop: '15px', fontSize: '0.95em' }}>
          {getScoreMessage(scorePercent)}
        </p>
      </div>
    </div>
  );
};

export default MetricsDashboard;