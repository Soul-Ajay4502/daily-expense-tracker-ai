<a href="https://visitcount.itsvg.in">
  <img align="right" src="https://visitcount.itsvg.in/api?id=Soul-Ajay4502&label=Profile%20Views&color=12&icon=8&pretty=false" />
</a>

<div align="center">
  <h1>💸 Daily Expense Tracker</h1>
  <p>A simple and efficient daily expense tracking application built with React, Firebase, and Redux.</p>
</div>

<h2>📄 Project Description</h2>
<p align="justify">
  The <strong>Daily Expense Tracker</strong> helps users efficiently manage and track their day-to-day financial transactions. With intuitive navigation and easy-to-use features, it enables users to add and monitor their income and expenses in real-time.
</p>

<div align="center">
  <h2>🧑‍💻 Tech Stack</h2>
  <img width="500px" src="https://skillicons.dev/icons?i=react,redux,firebase,js,vscode,github" />
</div>

<h2>🚀 Features</h2>
<ul>
  <li>User authentication with Firebase</li>
  <li>Real-time expense tracking</li>
  <li>Income and expense data visualization</li>
  <li>Responsive UI with React and CSS</li>
  <li>Protected routes for secured data access</li>
  <li>Finantial report by AI</li>
</ul>

<h2>⚙️ Installation on local machine</h2>

<h4>Prerequisites</h4>
<ol>
  <li>
    Node.js installed on your local machine.
</li>
</ol>
<h2>🔧 Setup Instructions</h2>
<ol>
  <li>Clone the repository: <code>git clone https://github.com/Soul-Ajay4502/daily-expense-tracker-ai.git</code></li>
  <li>Navigate to the project directory: <code>cd daily-expense-tracker-ai</code></li>
  <li>Install dependencies: <code>npm install || npm i</code></li>
  <li>Start the development server: <code>npm start</code></li>
</ol>

<h2>🔑 Environment Variables</h2>
<p>To run this project, you will need to add the following environment variables in your <code>.env</code> file:</p>
<ul>
  <li><code>REACT_APP_FIREBASE_KEY</code></li>
  <li><code>REACT_APP_HUGGING_FACE_API_KEY</code></li>
  <li><code>REACT_APP_HUGGING_FACE_API_URL</code></li>
</ul>

<h2>🌐 Live Demo</h2>
<p>Check out the live demo of the project(git hub pages) <a href="https://soul-ajay4502.github.io/daily-expense-tracker-ai/" target="_blank">here</a>.</p>

<p>Check out the live demo of the project(firbase hosting) <a href="https://dailyexpensetracker-b5a15.web.app/login" target="_blank">here</a>.</p>

<h2>📂 Project Structure</h2>
<pre>
daily-expense-tracker-ai/
├── .firebaserc
├── .gitignore
├── .env
├── firebase.json
├── package.json
├── package-lock.json
├── README.md
├── public/
│   ├── index.html
│   
└── src/
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── components/
    │   ├── Auth/
    │   │   ├── Login.js
    │   │   └── Signup.js
    │   ├── Dashboard/
    │   │   ├── AiReport.js
    │   │   ├── Dashboard.js
    │   │   ├── openAiReport.js
    │   │   └── Report.js
    │   ├── Expenses/
    │   │   ├── ExpenseForm.js
    │   │   └── ExpenseTable.js
    │   ├── shared/
    │   │   ├── Footer.js
    │   │   ├── Navbar.js
    │   │   └── ProtectedRoute.js
    │   └── ReportTabs.js
    ├── firebase.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    ├── redux/
    │   ├── slices/
    │   │   ├── aiReportSlice.js
    │   │   ├── authSlice.js
    │   │   ├── expenseSlice.js
    │   │   ├── openAiSlice.js
    │   │   └── reportSlice.js
    │   └── store.js
    ├── setupTests.js
    └── utils/
        └── fetchAiResponse.js

</pre>
