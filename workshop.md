# OpenVerse Campus Helper – Workshop Guide

Build a **simple AI-powered campus helper web app** using:

- HTML, CSS, JavaScript  
- Firebase Firestore (database)  
- Gemini API (AI answers)  
- Google Sheets (publish to web – read-only embed)  
- Google Maps (embed – no Maps API key needed)  
- Optional: Google Drive link for a syllabus PDF

This guide is for **absolute beginners** – first-year level.  
We write everything **step by step**.

---

## ⚠️ Important Security Notice

**🔒 API Keys and Credentials:**

- All API keys and credentials should ONLY exist in `env.js` and `.env` files
- These files are automatically excluded from Git via `.gitignore`
- NEVER commit actual API keys to GitHub or share them publicly
- This workshop guide uses placeholder values (e.g., `your_api_key_here`)
- Replace placeholders with your actual keys only in `env.js` and `.env` files
- Always use `.env.example` and `env.example.js` as templates for sharing

**If you accidentally expose keys:**
1. Immediately revoke/delete the exposed keys from their respective platforms
2. Generate new keys
3. Update only your local `env.js` and `.env` files
4. Never commit these files to version control

---

## 0. What we are building

**OpenVerse Campus Helper** – a small web app where:

1. Students **ask campus-related questions**  
2. Gemini AI returns an answer  
3. You can **save answers into FAQ** (Firestore database)  
4. A **Campus FAQ list** shows all saved Q&A  
5. A **Google Sheet** is embedded to show a public FAQ board or summary  
6. A **Google Maps** iframe shows the college location  
7. Optionally, a **Google Drive link** opens important docs (e.g., syllabus)

The final UI has these sections:

- Title + Description  
- Ask Question → AI Answer  
- Button: "Save to FAQ"  
- List: "Campus FAQ"  
- "Public FAQ Sheet" (Google Sheet embed)  
- "Important Documents" (Google Drive link)  
- "Campus Location" (Google Maps embed)

---

## 1. Project Setup

1. Create a new folder on your computer, e.g.:

   ```text
   openverse-campus-helper
   ```

2. Inside it, create these files:

   ```text
   openverse-campus-helper/
   ├── index.html
   ├── style.css
   ├── script.js
   ├── config.js
   ├── env.js
   ├── env.example.js
   ├── .env
   ├── .env.example
   └── .gitignore
   ```

3. Create a `.gitignore` file with this content:

   ```gitignore
   # Environment variables with sensitive keys
   .env
   env.js

   # Node modules (if using npm in future)
   node_modules/

   # OS files
   .DS_Store
   Thumbs.db

   # Editor files
   .vscode/
   .idea/
   *.swp
   *.swo

   # Logs
   *.log
   npm-debug.log*
   ```

   This ensures your `.env` file with real API keys will never be committed to Git.

4. Open the folder in VS Code (or any editor).

5. Use Live Server extension in VS Code (or manually open `index.html` in your browser).

### File Structure Explanation:

- **index.html** - Main HTML page with the UI
- **style.css** - Styling for the application
- **script.js** - Main JavaScript logic
- **config.js** - Configuration loader for environment variables
- **env.js** - JavaScript file with your actual API keys (DO NOT share publicly)
- **env.example.js** - Template JavaScript file (safe to share)
- **.env** - Environment variables in text format (for reference/Vercel)
- **.env.example** - Template for environment variables (safe to share)
- **.gitignore** - Tells Git which files to ignore (protects your `env.js` and `.env` files)

**Why both `.env` and `env.js`?**
- `.env` is used for deployment platforms like Vercel
- `env.js` is used for local development (browsers can import JS files)
- Both contain the same values, just in different formats

---

## 2. Create Environment Configuration Files

For local development, we'll use JavaScript files to store configuration (since browsers can't directly read `.env` files). For deployment, we'll use the `.env` format.

### 2.1. Create env.example.js (Template File)

Create a file named `env.example.js` with the following content:

```js
// env.example.js - Environment configuration template
// Copy this file to env.js and fill in your actual values

export const ENV = {
  // Firebase Configuration
  FIREBASE_API_KEY: "your_firebase_api_key_here",
  FIREBASE_AUTH_DOMAIN: "your_project_id.firebaseapp.com",
  FIREBASE_PROJECT_ID: "your_project_id",
  FIREBASE_STORAGE_BUCKET: "your_project_id.firebasestorage.app",
  FIREBASE_MESSAGING_SENDER_ID: "your_sender_id",
  FIREBASE_APP_ID: "your_app_id",
  FIREBASE_MEASUREMENT_ID: "your_measurement_id",

  // Gemini API Configuration
  GEMINI_API_KEY: "your_gemini_api_key_here",
  GEMINI_MODEL: "gemini-2.5-flash",

  // Google Sheets Configuration
  GOOGLE_SHEET_PUB_URL: "your_google_sheet_publish_url_here",

  // Google Apps Script Configuration
  APPS_SCRIPT_URL: "your_apps_script_web_app_url_here",

  // Google Drive Configuration (Optional)
  GOOGLE_DRIVE_SYLLABUS_LINK: "your_google_drive_link_here"
};
```

This file serves as a template showing what environment variables are needed.

### 2.2. Create env.js (Your Actual Keys for Local Development)

Create a file named `env.js` and copy the content from `env.example.js`. Then fill in your actual values:

```js
// env.js - Environment configuration
// DO NOT commit this file to Git

export const ENV = {
  // Firebase Configuration
  FIREBASE_API_KEY: "AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  FIREBASE_AUTH_DOMAIN: "your-project.firebaseapp.com",
  FIREBASE_PROJECT_ID: "your-project-id",
  FIREBASE_STORAGE_BUCKET: "your-project.firebasestorage.app",
  FIREBASE_MESSAGING_SENDER_ID: "123456789",
  FIREBASE_APP_ID: "1:123456789:web:abcdef123456",
  FIREBASE_MEASUREMENT_ID: "G-XXXXXXXXXX",

  // Gemini API Configuration
  GEMINI_API_KEY: "AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  GEMINI_MODEL: "gemini-2.5-flash",

  // Google Sheets Configuration
  GOOGLE_SHEET_PUB_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-.../pubhtml",

  // Google Apps Script Configuration
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycby.../exec",

  // Google Drive Configuration (Optional)
  GOOGLE_DRIVE_SYLLABUS_LINK: "https://drive.google.com/file/d/YOUR_FILE_ID/view"
};
```

### 2.3. Create .env.example (For Deployment Reference)

Create a file named `.env.example` with the following content:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Google Sheets Configuration
GOOGLE_SHEET_PUB_URL=your_google_sheet_publish_url_here

# Google Apps Script Configuration
APPS_SCRIPT_URL=your_apps_script_web_app_url_here

# Google Drive Configuration (Optional)
GOOGLE_DRIVE_SYLLABUS_LINK=your_google_drive_link_here
```

### 2.3. Create .env.example (For Deployment Reference)

Create a file named `.env.example` with the following content:

```env
# Firebase Configuration
FIREBASE_API_KEY=AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXX
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Gemini API Configuration
GEMINI_API_KEY=AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GEMINI_MODEL=gemini-2.5-flash

# Google Sheets Configuration
GOOGLE_SHEET_PUB_URL=https://docs.google.com/spreadsheets/d/e/2PACX-.../pubhtml

# Google Apps Script Configuration
APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycby.../exec

# Google Drive Configuration (Optional)
GOOGLE_DRIVE_SYLLABUS_LINK=https://drive.google.com/file/d/YOUR_FILE_ID/view
```

⚠️ **Important**: 
- Never commit the `.env` file to GitHub or share it publicly
- Only share `.env.example` as a template
- We'll fill in the actual values as we progress through the workshop

---

## 3. Create config.js (Configuration Loader)

Create a file named `config.js` with the following code:

```js
// config.js - Environment configuration loader
// This file loads environment variables from env.js

import { ENV } from './env.js';

export async function loadConfig() {
  // Simply return the ENV object from env.js
  return ENV;
}

// Export individual config getters for convenience
export function getFirebaseConfig(config) {
  return {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
    measurementId: config.FIREBASE_MEASUREMENT_ID
  };
}

export function getGeminiConfig(config) {
  return {
    apiKey: config.GEMINI_API_KEY,
    model: config.GEMINI_MODEL || 'gemini-2.5-flash'
  };
}

export function getGoogleSheetsUrl(config) {
  return config.GOOGLE_SHEET_PUB_URL;
}

export function getAppsScriptUrl(config) {
  return config.APPS_SCRIPT_URL;
}

export function getGoogleDriveLink(config) {
  return config.GOOGLE_DRIVE_SYLLABUS_LINK;
}
```

This file will:
- Import configuration from `env.js`
- Provide helper functions to get specific configurations

**Why this approach?**
- Browsers cannot directly read `.env` files due to security restrictions
- JavaScript files (`env.js`) can be imported using ES6 modules
- This works seamlessly with Live Server and local development
- For deployment, we'll use environment variables on the platform

---

## 4. HTML – index.html

Paste this code into `index.html`:

🔴 **Important**: There are a few placeholders like `YOUR_GOOGLE_SHEET_PUB_URL` and `YOUR_GOOGLE_DRIVE_SYLLABUS_LINK` – we will fill them later in the guide.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>OpenVerse Campus Helper</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="container">
    <h1>OpenVerse Campus Helper</h1>
    <p>Ask any campus related query and get AI-powered answers using Google Gemini.</p>

    <!-- Ask Question Form -->
    <form id="question-form">
      <label for="question">Your question</label>
      <textarea
        id="question"
        required
        placeholder="Example: What is the exam pattern for Sem 5 BBA?"></textarea>
      <button type="submit" id="ask-btn">Ask AI</button>
    </form>

    <!-- AI Answer Section -->
    <section id="answer-section" class="card hidden">
      <h2>AI Answer</h2>
      <p id="answer-text"></p>
      <button id="save-faq-btn">Save to FAQ</button>
    </section>

    <!-- FAQ List from Firestore -->
    <section id="faq-section" class="card">
      <h2>Campus FAQ</h2>
      <ul id="faq-list"></ul>
    </section>

    <!-- Google Sheet Embed (Publish to Web) -->
    <section id="sheet-section" class="card">
      <h2>Public FAQ Sheet</h2>
      <p>This is a read-only Google Sheet embedded into the website.</p>
      <iframe
        id="faq-sheet"
        src="YOUR_GOOGLE_SHEET_PUB_URL"
        width="100%"
        height="300"
        loading="lazy">
      </iframe>
    </section>

    <!-- Google Drive Link (Optional important document) -->
    <section id="docs-section" class="card">
      <h2>Important Documents</h2>
      <ul>
        <li>
          <a
            id="syllabus-link"
            href="YOUR_GOOGLE_DRIVE_SYLLABUS_LINK"
            target="_blank">
            View BBA Syllabus (Google Drive)
          </a>
        </li>
      </ul>
    </section>

    <!-- Campus Location using Google Maps Embed -->
    <section id="campus-map" class="card">
      <h2>Campus Location</h2>
      <p>Find Bharati Vidyapeeth DMS, Kharghar on Google Maps:</p>
      <div class="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.743128776081!2d73.05629587609653!3d19.031037453380783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3004632ef29%3A0xe747324bfb1a6836!2sBharati%20Vidyapeeth%20Department%20of%20Management%20Studies%20(Off%20Campus)!5e0!3m2!1sen!2sin!4v1765267101832!5m2!1sen!2sin"
          width="100%"
          height="300"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </section>

    <!-- Main Script -->
    <script type="module" src="script.js"></script>
  </main>
</body>
</html>
```

We'll connect this to Firebase and Gemini in the next steps.

---

## 5. CSS – style.css

Make the UI look modern but simple.

Paste this into `style.css`:

```css
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #0f172a;       /* dark background */
  color: #e5e7eb;            /* light text */
  margin: 0;
}

.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #020617;
  border-radius: 12px;
  border: 1px solid #1f2937;
}

h1, h2 {
  margin-bottom: 0.5rem;
}

p {
  margin-top: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

label {
  font-size: 0.9rem;
  color: #9ca3af;
}

textarea {
  min-height: 80px;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #4b5563;
  background: #020617;
  color: #e5e7eb;
  resize: vertical;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: #22c55e;
  color: #020617;
  font-weight: 600;
  align-self: flex-start;
  transition: transform 0.1s ease, box-shadow 0.1s ease, opacity 0.2s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.35);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.card {
  padding: 1rem;
  border-radius: 8px;
  background: #030712;
  border: 1px solid #1f2937;
  margin-bottom: 1.5rem;
}

.hidden {
  display: none;
}

#faq-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

#faq-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #1f2937;
}

#faq-list li:last-child {
  border-bottom: none;
}

.map-wrapper {
  border-radius: 12px;
  overflow: hidden;
  margin-top: 0.5rem;
}
```

---

## 6. Set up Firebase (Firestore)

We will use Firebase Firestore to store our FAQ entries.

### 6.1. Create Firebase project

1. Go to: https://console.firebase.google.com
2. Click **Add project**.
3. Enter a project name, e.g. `openverse-campus-helper`.
4. Disable Google Analytics for now (optional).
5. Click **Create project**.

### 6.2. Add a Web App

1. In your Firebase project, go to **Build → Realtime Database / Firestore** or **Project Overview**.
2. On the main dashboard, click **"</>"** (Web app icon).
3. Give it a nickname, e.g. `web-app`.
4. Choose **Use Firebase Hosting?** – You can skip for now.
5. Copy the Firebase config object shown – it will look like:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

6. You will paste this into `script.js` in the next step.
7. **Do not share your actual keys publicly in GitHub without care.**  
   (For workshop/demo, it's acceptable.)

### 6.3. Enable Firestore

1. In Firebase console, go to **Build → Firestore Database**.
2. Click **Create database**.
3. Start in **Test Mode** (for workshop) – this allows reads/writes without strict security.
4. Choose location and create.

---

## 7. Get a Gemini API Key

We will use Google Gemini API to generate AI answers.

1. Go to: https://aistudio.google.com (or Google AI Studio).
2. Sign in with your Google account.
3. Go to **API Keys** section.
4. Click **Create API key** (for Gemini).
5. Copy the key. It will look like:  
   `AIza...something...`
6. We will store this in `script.js` as `GEMINI_API_KEY`.

---

## 8. Set up Google Sheet (Publish to Web)

This is read-only integration – we won't write data into Sheet, just display it.

1. Open https://docs.google.com/spreadsheets
2. Create a new sheet, name it: **OpenVerse Public FAQ**.
3. Add some dummy rows like:

   | Question | Answer |
   |----------|--------|
   | What is exam pattern for Sem 5? | 3 theory + 1 internal ... |
   | What is passing criteria? | 40% overall ... |

4. Go to **File → Share → Publish to web**.
5. Choose:
   - **Entire Document** or specific sheet
   - Format: **Web page**
6. Click **Publish**.
7. Copy the `pubhtml` URL – something like:

   ```text
   https://docs.google.com/spreadsheets/d/e/2PACX-.../pubhtml
   ```

8. Paste this into `index.html`:

```html
<iframe
  id="faq-sheet"
  src="YOUR_GOOGLE_SHEET_PUB_URL"
  width="100%"
  height="300"
  loading="lazy">
</iframe>
```

Replace `YOUR_GOOGLE_SHEET_PUB_URL` with your actual link.

---

## 9. Optional: Google Drive document link

If you have a syllabus or important document:

1. Upload a PDF to Google Drive.
2. Right-click → **Get link**.
3. Set access to: **Anyone with the link (Viewer)**.
4. Copy the link.
5. Replace `YOUR_GOOGLE_DRIVE_SYLLABUS_LINK` in `index.html`:

```html
<a
  id="syllabus-link"
  href="YOUR_GOOGLE_DRIVE_SYLLABUS_LINK"
  target="_blank">
  View BBA Syllabus (Google Drive)
</a>
```

This simply opens the file – no API, no code.

---

## 10. Update env.js file with your keys

Now that you have obtained all the necessary keys and URLs, update your `env.js` file:

1. Open `env.js` file
2. Replace all placeholder values with actual keys from previous steps:
   - Firebase configuration from Section 6.2
   - Gemini API key from Section 7
   - Google Sheet URL from Section 8
   - Google Drive link from Section 9 (if applicable)

3. Also update `.env` file with the same values (for deployment later)

Your `env.js` file should now have all real values (no `YOUR_XXX` placeholders).

**Example of completed env.js:**

```js
export const ENV = {
  FIREBASE_API_KEY: "your_actual_firebase_api_key",
  FIREBASE_AUTH_DOMAIN: "your-project.firebaseapp.com",
  FIREBASE_PROJECT_ID: "your-project-id",
  // ... rest of your actual values
  GEMINI_API_KEY: "your_actual_gemini_api_key",
  GEMINI_MODEL: "gemini-2.5-flash",
  // ... etc
};
```

⚠️ **Security Note**: The above example shows placeholder format only. Replace with your actual keys from previous steps. Never share your actual API keys in documentation or commit them to version control.

---

## 11. JavaScript – script.js

Now we connect everything using the environment variables from `.env` file:

- Load configuration from `.env`
- Initialize Firebase
- Connect Firestore
- Call Gemini API
- Save FAQ
- Show FAQ list in real time

Paste this into `script.js`:

```js
// 1. Import Firebase modules and config loader
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { 
  loadConfig, 
  getFirebaseConfig, 
  getGeminiConfig, 
  getGoogleSheetsUrl,
  getAppsScriptUrl,
  getGoogleDriveLink
} from './config.js';

// 2. Load configuration and initialize app
let config;
let db;
let GEMINI_API_KEY;
let GEMINI_MODEL;
let APPS_SCRIPT_URL;

async function initialize() {
  try {
    // Load environment variables
    config = await loadConfig();
    
    // Initialize Firebase
    const firebaseConfig = getFirebaseConfig(config);
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    
    // Set Gemini config
    const geminiConfig = getGeminiConfig(config);
    GEMINI_API_KEY = geminiConfig.apiKey;
    GEMINI_MODEL = geminiConfig.model;
    
    // Set Apps Script URL
    APPS_SCRIPT_URL = getAppsScriptUrl(config);
    
    // Set Google Sheets URL
    const sheetUrl = getGoogleSheetsUrl(config);
    if (sheetUrl && sheetUrl !== 'YOUR_GOOGLE_SHEET_PUB_URL') {
      document.getElementById("faq-sheet").src = sheetUrl;
    }
    
    // Set Google Drive link
    const driveLink = getGoogleDriveLink(config);
    if (driveLink && driveLink !== 'YOUR_GOOGLE_DRIVE_SYLLABUS_LINK') {
      document.getElementById("syllabus-link").href = driveLink;
    }
    
    // Initialize the app after config is loaded
    setupEventListeners();
    startFaqListener();
    
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    alert('Failed to load configuration. Please check if .env file exists and is properly formatted.');
  }
}

// 3. DOM elements
const form = document.getElementById("question-form");
const questionInput = document.getElementById("question");
const askBtn = document.getElementById("ask-btn");
const answerSection = document.getElementById("answer-section");
const answerText = document.getElementById("answer-text");
const saveFaqBtn = document.getElementById("save-faq-btn");
const faqList = document.getElementById("faq-list");
const saveGoogleBtn = document.getElementById("save-google-btn");

// Temporary state
let lastQuestion = "";
let lastAnswer = "";

// 4. Function to ask Gemini model

async function askGemini(question) {
  // Ensure model name has 'models/' prefix for API URL
  const modelName = GEMINI_MODEL.startsWith('models/') ? GEMINI_MODEL : `models/${GEMINI_MODEL}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: `You are a helpful assistant for students of Bharati Vidyapeeth DMS Navi Mumbai. 
Answer this campus related question clearly in 3 to 6 lines: "${question}". 
If the question is not related to campus, still answer but keep it short.`
          }
        ]
      }
    ]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Gemini API Error Response:", errorText);
    throw new Error(`Gemini API error: ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No answer generated.";
  return text;
}

// 5. Setup event listeners
function setupEventListeners() {
  form.addEventListener("submit", handleQuestionSubmit);
  saveFaqBtn.addEventListener("click", handleSaveToFirestore);
  saveGoogleBtn.addEventListener("click", handleSaveToGoogle);
}

// 6. Handle form submit
async function handleQuestionSubmit(e) {
  e.preventDefault();
  const question = questionInput.value.trim();
  if (!question) return;

  askBtn.disabled = true;
  askBtn.textContent = "Asking AI...";

  try {
    const answer = await askGemini(question);
    lastQuestion = question;
    lastAnswer = answer;

    answerText.textContent = answer;
    answerSection.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    alert("Something went wrong while talking to AI.");
  } finally {
    askBtn.disabled = false;
    askBtn.textContent = "Ask AI";
  }
}

// 7. Handle save to Firestore
async function handleSaveToFirestore() {
  if (!lastQuestion || !lastAnswer) return;

  saveFaqBtn.disabled = true;
  saveFaqBtn.textContent = "Saving...";

  try {
    await addDoc(collection(db, "faqs"), {
      question: lastQuestion,
      answer: lastAnswer,
      createdAt: serverTimestamp(),
      createdBy: "anonymous"
    });
    alert("Saved to FAQ");
  } catch (err) {
    console.error(err);
    alert("Could not save FAQ.");
  } finally {
    saveFaqBtn.disabled = false;
    saveFaqBtn.textContent = "Save to FAQ";
  }
}

// 8. Real-time FAQ listener
function startFaqListener() {
  const faqsRef = collection(db, "faqs");
  const faqsQuery = query(faqsRef, orderBy("createdAt", "desc"));

  onSnapshot(faqsQuery, (snapshot) => {
    faqList.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>Q:</strong> ${data.question}<br/>
        <strong>A:</strong> ${data.answer}
      `;

      faqList.appendChild(li);
    });
  });
}

// 9. Handle save to Google Sheets via Apps Script (Optional)
async function handleSaveToGoogle() {
  if (!lastQuestion || !lastAnswer) {
    alert("No answer to save yet.");
    return;
  }

  saveGoogleBtn.disabled = true;
  saveGoogleBtn.textContent = "Saving...";

  try {
    const params = new URLSearchParams();
    params.append("question", lastQuestion);
    params.append("answer", lastAnswer);
    params.append("user", "anonymous");

    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      body: params
      // DO NOT set headers manually here
    });

    const text = await res.text();
    let data;

    // If your Apps Script returns JSON, parse it
    try {
      data = JSON.parse(text);
    } catch {
      data = { success: true }; // fallback if you just return "OK"
    }

    if (!data.success && data.error) {
      console.error(data.error);
      alert("Failed to save to Google Sheets and Drive");
    } else {
      alert("Saved to Google Sheets and Google Drive");
      console.log(data);
    }
  } catch (err) {
    console.error(err);
    alert("Error while saving to Google");
  } finally {
    saveGoogleBtn.disabled = false;
    saveGoogleBtn.textContent = "Save to Google";
  }
}

// Initialize the app when the page loads
initialize();
```

### What's different from the basic approach?

Instead of hardcoding API keys directly in `script.js`, we:

1. ✅ Store all configuration in `env.js` file (for local dev)
2. ✅ Load configuration dynamically using `config.js`
3. ✅ Initialize the app only after config is loaded
4. ✅ Can easily change API keys without editing JavaScript code
5. ✅ Keep sensitive keys separate from code
6. ✅ Use `env.example.js` and `.env.example` as templates
7. ✅ Auto-prefix model name with `models/` for API compatibility
8. ✅ Enhanced error logging for easier debugging

### Key Features:

- **Security**: Keys are in separate files that are gitignored
- **Flexibility**: Easy to switch between development and production configs
- **Maintainability**: All configuration in one place
- **Sharing**: Share template files instead of real keys
- **Error Handling**: Better error messages for debugging
- **Model Compatibility**: Automatically handles model name formatting

---

## 12. Run and Test

1. Open `index.html` with Live Server or just double-click.

2. In the browser:
   - Type a campus-related question.
   - Click **Ask AI**.
   - You should see an AI answer.
   - Click **Save to FAQ**.
   - Check **Firestore → faqs collection** should have a new document.
   - FAQ list on the page should show your Q & A.

3. Scroll down:
   - Check if **Public FAQ Sheet** is visible (iframe loads your Google Sheet).
   - **View BBA Syllabus** link should open Google Drive file (if configured).
   - **Campus Location** map should load properly.

### If something breaks:

- Open **DevTools → Console** and read errors.

**Common issues:**

- Wrong Firebase config → check `projectId`, `apiKey`.
- Gemini key invalid → check key, enable Gemini API for your project.
- Firestore in locked mode → for workshop, use test mode.

---

## 13. Git Setup and Version Control

Now that your project is working, let's put it under version control using Git and push it to GitHub.

### 13.1. Install Git

**Windows:**
1. Download Git from: https://git-scm.com/download/win
2. Run the installer
3. Keep default settings and click "Next" through the installation
4. Verify installation:
   ```bash
   git --version
   ```

**Mac:**
```bash
# Using Homebrew
brew install git

# Or download from: https://git-scm.com/download/mac
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install git
```

### 13.2. Configure Git with Your GitHub Credentials

Set up your identity (use your GitHub email and username):

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global --list
```

**Example:**
```bash
git config --global user.name "Vinit Surve"
git config --global user.email "vinit@example.com"
```

### 13.3. Initialize Git Repository

Navigate to your project folder and initialize Git:

```bash
# Navigate to your project folder
cd path/to/openverse-campus-helper

# Initialize Git repository
git init
```

This creates a `.git` folder that tracks all your changes.

### 13.4. Stage and Commit Your Files

**Important:** Before committing, make sure `.env` file is in `.gitignore`!

```bash
# Check what files will be tracked
git status

# Stage all files (except .env which is gitignored)
git add .

# Check staged files (verify .env is NOT listed)
git status

# Create your first commit
git commit -m "Initial commit: OpenVerse Campus Helper"
```

### 13.5. Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `OpenVerse-Campus-Helper` (or any name you prefer)
3. Description: "AI-powered campus helper using Gemini API and Firebase"
4. Choose **Public** or **Private**
5. **DO NOT** check "Initialize with README" (we already have one)
6. Click **Create repository**

### 13.6. Connect Local Repository to GitHub

Copy the commands shown on GitHub, or use these:

```bash
# Add remote repository (replace with YOUR GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/OpenVerse-Campus-Helper.git

# Verify remote was added
git remote -v

# Rename branch to main (if it's master)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/VinitSurve/OpenVerse-Campus-Helper.git
git branch -M main
git push -u origin main
```

You may be prompted to authenticate. Follow the GitHub authentication process.

### 13.7. Basic Git Commands Reference

**Daily Git Workflow:**

```bash
# Check status of your files
git status

# Stage specific file
git add filename.js

# Stage all changed files
git add .

# Commit with message
git commit -m "Add new feature"

# Push to GitHub
git push

# Pull latest changes from GitHub
git pull

# View commit history
git log

# View simplified commit history
git log --oneline
```

**Branching:**

```bash
# Create a new branch
git branch feature-name

# Switch to a branch
git checkout feature-name

# Create and switch to new branch (shortcut)
git checkout -b feature-name

# List all branches
git branch

# Merge branch into current branch
git merge feature-name

# Delete a branch
git branch -d feature-name
```

### 13.8. Important Git Best Practices

✅ **DO:**
- Commit frequently with meaningful messages
- Write clear commit messages describing what changed
- Use `.gitignore` to exclude sensitive files
- Pull before you push to avoid conflicts
- Create branches for new features

❌ **DON'T:**
- Commit sensitive data (API keys, passwords)
- Use vague commit messages like "fix" or "update"
- Force push to main branch (`git push -f`)
- Commit large binary files
- Work directly on main branch for big features

### 13.9. Verify Your Repository

After pushing, verify on GitHub:

1. Go to your repository URL: `https://github.com/YOUR_USERNAME/OpenVerse-Campus-Helper`
2. Check that all files are present EXCEPT `.env`
3. Verify `.env.example` is there (this is safe to share)
4. Check that your README.md displays correctly

---

## 14. Deploy to Vercel

Now let's deploy your project to the web using Vercel (free hosting for static sites).

### 14.1. Why Vercel?

- ✅ Free hosting for static websites
- ✅ Automatic HTTPS
- ✅ Fast global CDN
- ✅ Easy GitHub integration
- ✅ Automatic deployments on push
- ✅ Custom domain support

### 14.2. Prerequisites

Before deploying, make sure:
- ✅ Your code is pushed to GitHub
- ✅ `.env` file is NOT in the repository
- ✅ Your project works locally

### 14.3. Sign Up for Vercel

1. Go to: https://vercel.com/signup
2. Click **Continue with GitHub**
3. Authorize Vercel to access your GitHub account
4. Complete the sign-up process

### 14.4. Import Your Project

**Method 1: Via Vercel Dashboard**

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Find your `OpenVerse-Campus-Helper` repository
4. Click **Import**
5. Configure project:
   - **Project Name**: `openverse-campus-helper` (or keep default)
   - **Framework Preset**: Select **Other** or **Vanilla**
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (no build needed)
   - **Output Directory**: Leave empty

**Method 2: Via Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project
cd path/to/openverse-campus-helper

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Choose your account
# - Link to existing project? No
# - What's your project's name? openverse-campus-helper
# - In which directory is your code located? ./
```

### 14.5. Configure Environment Variables on Vercel

⚠️ **Important:** Since `.env` is not pushed to GitHub, you need to add environment variables directly in Vercel.

1. Go to your project on Vercel dashboard
2. Click **Settings** tab
3. Click **Environment Variables** in the sidebar
4. Add each variable from your `.env` file:

**Add these variables one by one:**

| Name | Value |
|------|-------|
| `FIREBASE_API_KEY` | Your Firebase API key |
| `FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
| `FIREBASE_PROJECT_ID` | your-project-id |
| `FIREBASE_STORAGE_BUCKET` | your-project.firebasestorage.app |
| `FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
| `FIREBASE_APP_ID` | Your app ID |
| `FIREBASE_MEASUREMENT_ID` | Your measurement ID |
| `GEMINI_API_KEY` | Your Gemini API key |
| `GEMINI_MODEL` | gemini-2.5-flash |
| `GOOGLE_SHEET_PUB_URL` | Your Google Sheet URL |
| `APPS_SCRIPT_URL` | Your Apps Script URL |
| `GOOGLE_DRIVE_SYLLABUS_LINK` | Your Drive link |

**For each variable:**
- Click **Add**
- Enter **Name** (e.g., `FIREBASE_API_KEY`)
- Enter **Value** (paste the actual value)
- Select **Production**, **Preview**, and **Development**
- Click **Save**

### 14.6. Deploy

After adding environment variables:

1. Go back to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Check **Use existing Build Cache**: No
4. Click **Redeploy**

Your site will be built and deployed in ~30 seconds!

### 14.7. Access Your Live Site

Once deployment is complete:

1. You'll see: **Your project is ready!**
2. Click **Visit** to see your live site
3. Your URL will be: `https://openverse-campus-helper.vercel.app`
4. Share this URL with anyone!

### 14.8. Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes to your code
# Stage and commit
git add .
git commit -m "Update UI styling"

# Push to GitHub
git push

# Vercel automatically detects the push and deploys!
```

Check deployment status at: https://vercel.com/dashboard

### 14.9. Custom Domain (Optional)

Want a custom domain like `campus-helper.yourdomain.com`?

1. Go to your project on Vercel
2. Click **Settings** → **Domains**
3. Enter your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

### 14.10. Vercel CLI Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# List all deployments
vercel ls

# View logs
vercel logs

# Remove a deployment
vercel rm deployment-url
```

### 14.11. Troubleshooting Vercel Deployment

**Issue: Site shows errors**
- Check Vercel logs in the dashboard
- Verify all environment variables are set correctly
- Make sure `.env` format is correct (no quotes around values)

**Issue: .env file not loading**
- Vercel doesn't use `.env` files directly
- You must add environment variables in Vercel dashboard
- Update `config.js` if needed to handle Vercel environment

**Issue: CORS errors**
- Firebase/Gemini APIs might need CORS configuration
- Check Firebase security rules
- Verify API keys are enabled for your domain

**Issue: 404 errors**
- Make sure `index.html` is in the root directory
- Check Vercel project settings for correct root directory

### 14.12. Alternative: Modify config.js for Vercel

If environment variables don't load from `.env` on Vercel, update `config.js`:

```js
export async function loadConfig() {
  // Check if running on Vercel (production)
  if (typeof process !== 'undefined' && process.env) {
    // Use Vercel environment variables
    return {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      // ... add all other variables
    };
  }
  
  // Otherwise, load from .env file (local development)
  try {
    const response = await fetch('.env');
    const text = await response.text();
    // ... rest of parsing logic
  } catch (error) {
    console.error('Error loading .env file:', error);
    throw new Error('Failed to load configuration.');
  }
}
```

### 14.13. Vercel Best Practices

✅ **DO:**
- Always add environment variables in Vercel dashboard
- Test locally before deploying
- Use meaningful deployment messages
- Monitor deployment logs
- Enable automatic deployments from GitHub

❌ **DON'T:**
- Don't commit `.env` to GitHub
- Don't skip adding environment variables
- Don't use development API keys in production
- Don't ignore deployment errors

---

## Summary

You've built a complete AI-powered campus helper with:

✅ **HTML/CSS/JavaScript** frontend  
✅ **Firebase Firestore** for storing FAQs  
✅ **Gemini API** for AI-powered answers  
✅ **Google Sheets** embed for public FAQ display  
✅ **Google Maps** embed for campus location  
✅ **Google Drive** link for important documents  

This workshop covers real-world integrations without complex authentication or backend servers – perfect for beginners!

---

**Good luck with your workshop! 🚀**
