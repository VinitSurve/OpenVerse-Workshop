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
      li.innerHTML = `<strong>Q:</strong> ${data.question}<br/><strong>A:</strong> ${data.answer}`;
      faqList.appendChild(li);
    });
  });
}

// 9. Handle save to Google Sheets via Apps Script
async function handleSaveToGoogle() {
  if (!lastQuestion || !lastAnswer) {
    alert("No answer to save yet.");
    return;
  }

  saveGoogleBtn.disabled = true;
  saveGoogleBtn.textContent = "Saving...";

  try {
    // Build URL-encoded body (NO custom headers)
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
