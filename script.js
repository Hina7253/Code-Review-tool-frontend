

const BACKEND_URL = 'https://code-review-tool-backend-2.onrender.com/api'; 

// ========================================
// GLOBAL STATE
// ========================================
let backendOnline = false;
let currentAnalysisData = null;
let currentMetricsData = null;
let analysisType = null; // 'issues' or 'metrics'

// ========================================
// BACKEND STATUS CHECK
// ========================================
async function checkBackendStatus() {
    try {
        const response = await fetch(`${BACKEND_URL}/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            backendOnline = true;
            console.log('✅ Backend is online and ready');
        } else {
            throw new Error('Backend not responding');
        }
    } catch (error) {
        backendOnline = false;
        console.log('❌ Backend is offline');
    }
}

// Check backend status on page load
checkBackendStatus();

// ========================================
// ANALYZE CODE FUNCTION
// ========================================
async function analyzeCode() {
    const code = document.getElementById('codeInput').value.trim();
    const resultsDiv = document.getElementById('results');
    const statsDiv = document.getElementById('stats');

    if (!code) {
        resultsDiv.innerHTML = `
            <div class="empty-state">
                <div class="icon">⚠️</div>
                <p style="font-size: 1.1em; font-weight: 600; color: #fbbf24;">No Code Provided</p>
                <p style="color: #94a3b8;">Please enter some Java code to analyze</p>
            </div>
        `;
        return;
    }

    if (!backendOnline) {
        resultsDiv.innerHTML = `
            <div class="error-message">
                <strong style="font-size: 1.2em;">⚠️ Backend Connection Failed</strong><br><br>
                <strong>Steps to resolve:</strong><br>
                1. Open IntelliJ IDEA<br>
                2. Run <code>CodeReviewApplication.java</code><br>
                3. Wait for "Started CodeReviewApplication on port 8080"<br>
                4. Refresh this page and try again
            </div>
        `;
        return;
    }

    resultsDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p style="font-size: 1.1em;">Analyzing code with AI-powered engine...</p></div>';

    try {
        const response = await fetch(`${BACKEND_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        currentAnalysisData = data;
        analysisType = 'issues';
        displayResults(data);
        statsDiv.style.display = 'grid';
        showDownloadButton();
    } catch (error) {
        resultsDiv.innerHTML = `
            <div class="error-message">
                <strong style="font-size: 1.2em;">❌ Analysis Failed</strong><br><br>
                ${error.message}<br><br>
                <strong>Troubleshooting:</strong><br>
                • Ensure backend is running on port 8080<br>
                • Check if your Java code has valid syntax<br>
                • Review browser console for detailed errors
            </div>
        `;
        console.error('Analysis error:', error);
    }
}

// ========================================
// DISPLAY RESULTS FUNCTION
// ========================================
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    let html = '';

    const criticalCount = data.critical?.length || 0;
    const warningCount = data.warning?.length || 0;
    const infoCount = data.info?.length || 0;
    const totalCount = data.totalIssues || 0;

    document.getElementById('criticalCount').textContent = criticalCount;
    document.getElementById('warningCount').textContent = warningCount;
    document.getElementById('infoCount').textContent = infoCount;
    document.getElementById('totalCount').textContent = totalCount;

    if (criticalCount > 0) {
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

    if (warningCount > 0) {
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

    if (infoCount > 0) {
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

    resultsDiv.innerHTML = html;
}

// ========================================
// SHOW METRICS FUNCTION
// ========================================
async function showMetrics() {
    const code = document.getElementById('codeInput').value.trim();
    const resultsDiv = document.getElementById('results');
    const statsDiv = document.getElementById('stats');

    if (!code) {
        resultsDiv.innerHTML = `
            <div class="empty-state">
                <div class="icon">⚠️</div>
                <p style="font-size: 1.1em; font-weight: 600; color: #fbbf24;">No Code Provided</p>
                <p style="color: #94a3b8;">Please enter some Java code to calculate metrics</p>
            </div>
        `;
        return;
    }

    if (!backendOnline) {
        resultsDiv.innerHTML = `
            <div class="error-message">
                <strong style="font-size: 1.2em;">⚠️ Backend Connection Failed</strong><br><br>
                Please start your backend and try again.
            </div>
        `;
        return;
    }

    resultsDiv.innerHTML = '<div class="loading"><div class="spinner"></div><p style="font-size: 1.1em;">Calculating code metrics...</p></div>';
    statsDiv.style.display = 'none';

    try {
        const response = await fetch(`${BACKEND_URL}/metrics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        });

        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }

        const metrics = await response.json();
        
        currentMetricsData = metrics;
        analysisType = 'metrics';
        displayMetrics(metrics);
        showDownloadButton();
    } catch (error) {
        resultsDiv.innerHTML = `
            <div class="error-message">
                <strong style="font-size: 1.2em;">❌ Metrics Calculation Failed</strong><br><br>
                ${error.message}<br><br>
                Make sure backend is running on port 8080.
            </div>
        `;
        console.error('Metrics error:', error);
    }
}

// ========================================
// DISPLAY METRICS FUNCTION
// ========================================
function displayMetrics(metrics) {
    const resultsDiv = document.getElementById('results');
    
    const commentPercent = metrics.commentPercentage || 0;
    const scorePercent = (metrics.qualityScore || 0);
    
    const html = `
        <div class="metrics-dashboard">
            <div style="text-align: center; margin-bottom: 25px;">
                <h3 style="color: #e2e8f0; font-size: 1.5em; margin-bottom: 5px;">📊 Code Metrics Dashboard</h3>
                <p style="color: #94a3b8; font-size: 0.9em;">Comprehensive analysis of your code quality</p>
            </div>

            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-label">📄 Total Lines</div>
                    <div class="metric-value">${metrics.totalLines || 0}</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: 100%;"></div>
                    </div>
                    <div class="metric-subtext">Code: ${metrics.codeLines || 0} | Comments: ${metrics.commentLines || 0} | Blank: ${metrics.blankLines || 0}</div>
                </div>

                <div class="metric-card">
                    <div class="metric-label">🏗️ Structure</div>
                    <div class="metric-value">${metrics.classCount || 0}</div>
                    <div class="metric-subtext">Classes Found</div>
                    <div class="progress-bar-container" style="margin-top: 10px;">
                        <div class="progress-bar" style="width: ${Math.min(metrics.classCount * 20, 100)}%;"></div>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-label">⚙️ Methods</div>
                    <div class="metric-value">${metrics.methodCount || 0}</div>
                    <div class="metric-subtext">Public: ${metrics.publicMethodCount || 0} | Private: ${metrics.privateMethodCount || 0}</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${Math.min(metrics.methodCount * 5, 100)}%;"></div>
                    </div>
                </div>

                <div class="metric-card">
                    <div class="metric-label">💬 Documentation</div>
                    <div class="metric-value">${commentPercent.toFixed(1)}%</div>
                    <div class="metric-subtext">${metrics.commentLines || 0} comment lines</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${Math.min(commentPercent * 3, 100)}%;"></div>
                    </div>
                </div>
            </div>

            <div class="quality-section">
                <h4 style="color: #e2e8f0; font-size: 1.3em; margin-bottom: 15px;">🎯 Code Quality Score</h4>
                <div class="quality-score-circle" style="--score-percent: ${scorePercent}%;">
                    <div class="quality-score-inner">
                        <div style="font-size: 0.9em; color: #94a3b8;">Score</div>
                        <div style="color: #667eea;">${scorePercent}</div>
                        <div style="font-size: 0.4em; color: #94a3b8;">/100</div>
                    </div>
                </div>
                <div class="grade-badge grade-${metrics.qualityGrade || 'F'}">
                    Grade: ${metrics.qualityGrade || 'N/A'}
                </div>
                <p style="color: #94a3b8; margin-top: 15px; font-size: 0.95em;">
                    ${getScoreMessage(scorePercent)}
                </p>
            </div>
        </div>
    `;

    resultsDiv.innerHTML = html;
}

// ========================================
// HELPER FUNCTIONS
// ========================================
function getScoreMessage(score) {
    if (score >= 90) return "🌟 Excellent! Your code follows best practices.";
    if (score >= 80) return "✨ Great job! Minor improvements possible.";
    if (score >= 70) return "👍 Good code. Consider adding more comments.";
    if (score >= 60) return "⚠️ Decent code. Room for improvement.";
    return "🔧 Needs work. Focus on code quality and documentation.";
}

function showDownloadButton() {
    const btn = document.getElementById('downloadPdfBtn');
    btn.classList.add('show');
}

function hideDownloadButton() {
    const btn = document.getElementById('downloadPdfBtn');
    btn.classList.remove('show');
}

function clearAll() {
    document.getElementById('codeInput').value = '';
    document.getElementById('results').innerHTML = `
        <div class="empty-state">
            <div class="icon">🔍</div>
            <p style="font-size: 1.1em; font-weight: 600; margin-bottom: 10px;">Ready to Analyze</p>
            <p>Enter your Java code and click "Analyze Code" to start comprehensive code review</p>
        </div>
    `;
    document.getElementById('stats').style.display = 'none';
    hideDownloadButton();
    currentAnalysisData = null;
    currentMetricsData = null;
    analysisType = null;
}

// ========================================
// PDF GENERATION FUNCTION
// ========================================
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPos = 20;

    // Header with gradient effect (simulated)
    doc.setFillColor(102, 126, 234);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('☕ Java Code Review Report', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.text(`Generated: ${currentDate}`, pageWidth / 2, 30, { align: 'center' });

    yPos = 50;
    doc.setTextColor(0, 0, 0);

    if (analysisType === 'metrics' && currentMetricsData) {
        generateMetricsPDF(doc, pageWidth, pageHeight, yPos);
    } else if (analysisType === 'issues' && currentAnalysisData) {
        generateIssuesPDF(doc, pageWidth, pageHeight, yPos);
    }

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        doc.text('Generated by Java Code Analyzer Pro', pageWidth / 2, pageHeight - 5, { align: 'center' });
    }

    // Save PDF
    const fileName = `code-review-${new Date().getTime()}.pdf`;
    doc.save(fileName);
}

function generateMetricsPDF(doc, pageWidth, pageHeight, yPos) {
    const metrics = currentMetricsData;
    
    // Metrics Summary
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('📊 Code Metrics Summary', 20, yPos);
    yPos += 10;

    doc.setDrawColor(102, 126, 234);
    doc.setLineWidth(0.5);
    doc.rect(15, yPos, pageWidth - 30, 80);
    yPos += 10;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    
    doc.text(`Total Lines: ${metrics.totalLines || 0}`, 25, yPos);
    doc.text(`Classes: ${metrics.classCount || 0}`, pageWidth / 2 + 10, yPos);
    yPos += 8;
    
    doc.text(`Code Lines: ${metrics.codeLines || 0}`, 25, yPos);
    doc.text(`Methods: ${metrics.methodCount || 0}`, pageWidth / 2 + 10, yPos);
    yPos += 8;
    
    doc.text(`Comment Lines: ${metrics.commentLines || 0}`, 25, yPos);
    doc.text(`Public Methods: ${metrics.publicMethodCount || 0}`, pageWidth / 2 + 10, yPos);
    yPos += 8;
    
    doc.text(`Blank Lines: ${metrics.blankLines || 0}`, 25, yPos);
    doc.text(`Private Methods: ${metrics.privateMethodCount || 0}`, pageWidth / 2 + 10, yPos);
    yPos += 8;
    
    doc.text(`Comment Percentage: ${(metrics.commentPercentage || 0).toFixed(1)}%`, 25, yPos);
    yPos += 15;

    // Quality Score
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('🎯 Quality Assessment', 20, yPos);
    yPos += 10;

    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos, pageWidth - 30, 35, 'F');
    yPos += 10;

    doc.setFontSize(14);
    doc.setTextColor(102, 126, 234);
    doc.text(`Quality Score: ${metrics.qualityScore || 0}/100`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    doc.setFontSize(18);
    const gradeColors = {
        'A': [46, 204, 113],
        'B': [52, 152, 219],
        'C': [243, 156, 18],
        'D': [230, 126, 34],
        'F': [231, 76, 60]
    };
    const grade = metrics.qualityGrade || 'F';
    doc.setTextColor(...(gradeColors[grade] || [0, 0, 0]));
    doc.text(`Grade: ${grade}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(getScoreMessage(metrics.qualityScore || 0), pageWidth / 2, yPos, { align: 'center' });
}

function generateIssuesPDF(doc, pageWidth, pageHeight, yPos) {
    const data = currentAnalysisData;
    
    // Summary
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('🔍 Code Analysis Results', 20, yPos);
    yPos += 10;

    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos, pageWidth - 30, 25, 'F');
    yPos += 8;

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    const criticalCount = data.critical?.length || 0;
    const warningCount = data.warning?.length || 0;
    const infoCount = data.info?.length || 0;
    const totalIssues = criticalCount + warningCount + infoCount;

    doc.text(`Total Issues Found: ${totalIssues}`, 25, yPos);
    yPos += 7;
    doc.setTextColor(220, 38, 38);
    doc.text(`🔴 Critical: ${criticalCount}`, 25, yPos);
    doc.setTextColor(245, 158, 11);
    doc.text(`⚠️  Warnings: ${warningCount}`, pageWidth / 3 + 10, yPos);
    doc.setTextColor(59, 130, 246);
    doc.text(`ℹ️  Info: ${infoCount}`, 2 * pageWidth / 3 + 10, yPos);
    yPos += 15;

    doc.setTextColor(0, 0, 0);

    // Critical Issues
    if (criticalCount > 0) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(220, 38, 38);
        doc.text('🔴 Critical Issues', 20, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(0, 0, 0);

        data.critical.slice(0, 5).forEach((issue, index) => {
            if (yPos > pageHeight - 30) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`${index + 1}. Line ${issue.lineNumber || 'N/A'}:`, 25, yPos);
            yPos += 5;
            const lines = doc.splitTextToSize(issue.description, pageWidth - 50);
            doc.text(lines, 30, yPos);
            yPos += lines.length * 5 + 3;
        });
    }
}