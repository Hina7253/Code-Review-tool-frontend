# ☕ Java Code Analyzer Pro

> AI-Powered Static Code Analysis Tool for Java with Real-Time Feedback & Code Quality Metrics

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://javacodereview.netlify.app)
[![Backend](https://img.shields.io/badge/backend-render-blue)](https://your-backend.onrender.com)


## 🌟 Features
### 📊 Code Analysis
- Static code analysis for Java
- Detects bugs, vulnerabilities, and code smells
- Real-time feedback
- Severity levels: **Critical, Warning, Info**
- Line-by-line issue detection

### 📈 Code Metrics Dashboard
- Total lines, code lines, comments, blank lines
- Class & method count
- Comment coverage percentage
- Quality score (0–100) with grades (A–F)
- Visual progress indicators

 ### 📄 PDF Report Generation
 - Downloadable professional PDF reports
- Color-coded issues
- Metrics summary
- Supports large files (multi-page)

 ### 📁 Multi-File Analysis (Coming Soon)
 - Multiple `.java` files upload
 - ZIP project upload
 - File-wise & project-level scores

 ## 🚀 Live Demo
 - **Frontend:** https://javacodereview.netlify.app  
- **Backend:** https://your-backend.onrender.com

  ---
 ## 🛠️ Tech Stack
 ### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive UI
- jsPDF for report generation

 ### Backend
- Java 17
- Spring Boot 3.2
- JavaParser
- Maven

 ### Deployment
- Frontend: Netlify  
- Backend: Render  
- Version Control: Git & GitHub

  ## 📦 API Endpoints

### Health Check
GET /api/health
### Analyze Code

POST /api/analyze
### Get Code Metrics

POST /api/metrics

---

## 🎯 Code Quality Checks

The analyzer performs multiple levels of quality checks to improve code reliability and maintainability.

### 🔴 Critical Issues
- Potential **Null Pointer Exceptions**
- **Empty catch blocks** that hide errors
- **Resource leaks** (unclosed files, streams, etc.)

### ⚠️ Warnings
- **Naming convention** violations
- **High method complexity**
- Missing or improper **access modifiers**

### ℹ️ Suggestions
- Missing **JavaDoc comments**
- Usage of **magic numbers**
- Use of `System.out.println` instead of logging frameworks

---

## 📊 Quality Score Logic

The overall code quality score (0–100) is calculated based on the following weighted factors:

| Factor | Weight |
|------|--------|
| Code Issues | 50% |
| Comment Coverage | 20% |
| Method Complexity | 15% |
| Encapsulation | 10% |
| JavaDoc | 5% |

---

## 🚀 Deployment

### Backend Deployment (Render)
- **Build Command:** `mvn clean install`
- **Start Command:** `java -jar target/*.jar`
- **Java Version:** 17

### Frontend Deployment (Netlify)
- Upload the `frontend` folder
- Update the backend API URL in `script.js`
- Deploy the project

---

## 📝 Future Enhancements
- Multi-file code analysis
- ZIP file upload support
- Monaco code editor integration
- GitHub repository integration
- AI-powered code suggestions
- Dark / Light theme toggle

---

## 🐛 Known Issues
- Render free tier causes cold start delays
- Large files may result in timeouts
- Best experience on modern browsers (Chrome, Firefox, Edge)

---


## 👤 Author

**Hina Kumari**  
- GitHub: https://github.com/Hina7253  
- LinkedIn: https://www.linkedin.com/in/hina-569635334/

---

## ⭐ Support
If this project helped you, please give it a ⭐ on GitHub!


