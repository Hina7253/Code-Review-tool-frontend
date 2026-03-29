import React from 'react';

const ResultsDisplay = ({ data, stats }) => {
  if (!data) {
    return (
      <div className="empty-state">
        <div className="icon">🔍</div>
        <p style={{ fontSize: '1.1em', fontWeight: '600', marginBottom: '10px' }}>
          Ready to Analyze
        </p>
        <p>Enter your Java code and click "Analyze Code" to start comprehensive code review</p>
      </div>
    );
  }

  let html = '';

  if (stats.critical > 0) {
    html += '<div class="issue-category"><div class="category-header critical">🔴 Critical Issues</div>';
    data.critical.forEach(issue => {
      html += `<div class="issue-item">
        <div class="issue-line">Line ${issue.lineNumber || 'N/A'}</div>
        <div class="issue-description">${issue.description}</div>
        <div class="issue-suggestion">💡 ${issue.suggestion}</div>
      </div>`;
    });
    html += '</div>';
  }

  if (stats.warning > 0) {
    html += '<div class="issue-category"><div class="category-header warning">⚠️ Warnings</div>';
    data.warning.forEach(issue => {
      html += `<div class="issue-item">
        <div class="issue-line">Line ${issue.lineNumber || 'N/A'}</div>
        <div class="issue-description">${issue.description}</div>
        <div class="issue-suggestion">💡 ${issue.suggestion}</div>
      </div>`;
    });
    html += '</div>';
  }

  if (stats.info > 0) {
    html += '<div class="issue-category"><div class="category-header info">ℹ️ Suggestions</div>';
    data.info.forEach(issue => {
      html += `<div class="issue-item">
        <div class="issue-line">Line ${issue.lineNumber || 'N/A'}</div>
        <div class="issue-description">${issue.description}</div>
        <div class="issue-suggestion">💡 ${issue.suggestion}</div>
      </div>`;
    });
    html += '</div>';
  }

  if (html === '') {
    html = `
      <div class="empty-state">
        <div class="icon" style="color: #2ecc71;">✅</div>
        <p style="font-size: 1.3em; font-weight: 700; color: #2ecc71; margin-bottom: 10px;">Perfect Code!</p>
        <p style="color: #94a3b8;">No issues detected. Your code follows best practices.</p>
      </div>
    `;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ResultsDisplay;