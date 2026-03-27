# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
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



Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
